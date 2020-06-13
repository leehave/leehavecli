import fs from "fs";
import webpack from "webpack";
import webpackMerge from "webpack-merge";
import gulp from "gulp";
import { Signale } from "signale";
import JSZip from "jszip";
import execa from "execa";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import getWebpackConfig from "./config/webpackConfig";
import getGulpConfig from "./config/gulpConfig";
import { getProjectPath, fileTree, FileInfo, getCustomConfig } from "./utils";
// eslint-disable-next-line
const { name } = require(getProjectPath('package.json'));

const write = (dir, code) => {
  fs.writeSync(fs.openSync(dir, 'w'), code);
};

const showErrors = (errors) => {
  console.error('lee cli: ');
  errors.forEach(element => {
    console.error(` ${element}`);
  });
  process.exit(2); 
};

// build umd

const umdBuild = async ({mode, path, outDir, outZip, libraryName, analyzer }, barActive) => {
  libraryName = libraryName || name;

  const entryKey = mode === 'umd-zip' ? 'index' : libraryName;
  const entryFiles = path.split(',').map((p) => getProjectPath(p));

  const analyzerConfig = analyzer && {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true
      })
    ]
  };

  const { banner } = getCustomConfig();
  const bannerConfig = banner && {
    plugins: [
      new webpack.BannerPlugin(banner),
    ]
  };

  const umdTask = (type) => {
    return new Promise((resolve,reject) => {
      const config = webpackMerge(
        getWebpackConfig(type),
        {
          entry: {
            [entryKey]: entryFiles,
          },
          output: {
            path: getProjectPath(outDir),
            library: libraryName
          }
        },
        analyzerConfig,
        bannerConfig,
      );

      return webpack(config).run((err, stats) => {
        return err ? reject(err) : resolve(stats)
      })
    })
  };

  barActive.process('building...');

  if(mode === 'umd-zip'){
    await umdTask('umd-zip');
    const jsZip = new JSZip();
    const list: FileInfo[] = [];
    fileTree(list, outDir);
    jsZip.file(`${outDir}/manifest.json`,`{
      "id": "${libraryName}",
      "name": "${libraryName}",
      "description": "",
      "propsSchema": {

      }
    }`);

    list.forEach(({ filePath }) => {
      jsZip.file(filePath, fs.readFileSync(filePath));
    });

    jsZip.folder(outDir).generateAsync({ type: 'nodebuffer' }).then((content) => {
      write(`${outZip}/${libraryName}.zip`, content);
    });
  } else {
    await umdTask(mode)
  }

  barActive.success('Compiled successfully!');
};


const buildLibray = async ({ mode, path, ext, outFile, outDir, copyFiles, buildCss }, barActive) => {
  const args = [
    require.resolve('@babel/cli/bin/babel'),
    path,
    '--extensions', ext,
    '--ignore', '**/*.d.ts',
    '--config-file', require.resolve(`./config/babelConfig/${mode}`),
  ];

  if(copyFiles) {
    args.push('--copy-files');
  }

  if(outDir) {
    args.push('--out-dir', outDir);
  }

  if(outFile) {
    args.push('--out-file', outFile);
  }

  barActive.process('building...')

  const { stderr, exitCode } = await execa('node', args);
  if(exitCode !== 0) {
    process.stderr.write(stderr);
    process.exit(0);
  } else {
    if(buildCss) {
      barActive.process('building css file');
      if(mode !== 'native') {
        getGulpConfig(path, outDir, () => {
          barActive.success('Compiled successfully');
        })(gulp);
      }
      return;
    }
    barActive.success('Compiled successfully!');
  }
};

export default async (options) => {
  const { mode, path, outFile, outDir, outZip } = options;
  const errors = [];
  if(!mode) {
    errors.push('--mode require define');
  }

  if(!path) {
    errors.push('--path require define');
  }

  if(!outDir && !outFile) {
    if(!outDir) {
      errors.push('--out-dir require foldername');
    }
    if(!outFile) {
      errors.push('--out-file require filename');
    }
  }
  errors.length && showErrors(errors);

  const barActive = new Signale({
    scope: 'Leecli',
    interactive: true,
    types: {
      process: {
        badge: '*',
        color: 'yellow',
        label: `build ${mode}`,
      },
      success: {
        label: `build ${mode}`,
      }
    }
  });
  if(mode.indexOf('umd') >= 0){
    umdBuild(options, barActive);
    return;
  }
  buildLibray(options, barActive);
}