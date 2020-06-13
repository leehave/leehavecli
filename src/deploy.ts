import webpack, { Configuration } from "webpack";
import webpackMerge from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import SentryCliPlugin from "@sentry/webpack-plugin";
import getWebpackConfig from "./config/webpackConfig";
import { getCustomConfig, getProjectPath } from "./utils";

// eslint-disable-next-line
const { name, version } = require(getProjectPath('package.json'));

export interface IDeployConfig {
  outDir: string;
  pushGh: boolean;
  analyzer: boolean;
}

export const getProjectConfig = (config: Configuration) => {
  const { entries, setBabelOptions, banner, setRules, setPlugins, ...webpackConfig } = getCustomConfig();

  config.entry = {};
  setBabelOptions && setBabelOptions(config.module.rules[0].use[0].options);
  setRules && setRules(config.module.rules);
  setPlugins && setPlugins(config.plugins);

  Object.keys(entries || {}).forEach((key) => {
    if(entries[key].entry) {
      config.entry[key] = entries[key].entry;
    }

    config.plugins.push(new HtmlWebpackPlugin({
      template: entries[key].template,
      filename: `${key}.html`,
      chunks: ['mainfest', key],
      favicon: entries[key].favicon,
      inject: entries[key].inject !== false,
    }))
  });

  return webpackMerge(config, webpackConfig);
}


export default ({outDir, pushGh, analyzer}: IDeployConfig) => {
  const config = getProjectConfig(getWebpackConfig('deploy'));
  config.output.path = getProjectPath(outDir);

  pushGh && config.plugins.push(
    new SentryCliPlugin({
      release: version,
      include: outDir,
      sourceMapReference: false,
    })
  );

  analyzer && config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true
    })
  );
  webpack(config).run(() => {});
}