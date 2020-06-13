import fs from "fs";
import webpack from "webpack";
import WebpacDevServer from "webpack-dev-server";
import getWebpackConfig from "./config/webpackConfig";
import ForkTsCheckWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { getProjectPath } from "./utils";
import { getProjectConfig } from "./deploy";

export interface IDevelopmentConfig {
  mode?: 'native';
  host: string;
  port: number;
}

export default async ({ mode, host, port }: IDevelopmentConfig) => {
  const config = getProjectConfig(getWebpackConfig('dev'));
  Object.keys(config.entry).forEach((key) => {
    config.entry[key].unshift(require.resolve('react-hot-loader/patch'));
  })
  if(fs.existsSync(getProjectPath('tsconfig.json'))) {
    config.plugins.push(new ForkTsCheckWebpackPlugin());
  }

  const compiler = webpack(config);
  const serverConfig = {
    publicPath: '/',
    compress: true,
    noInfo: true,
    inline: true,
    hot: true
  };
  const devServer = new WebpacDevServer(compiler, serverConfig);
  devServer.listen(port, host, (err) => {
    if(err) {
      return console.error(err);
    }
    console.warn(`http://${host}:${port}\n`);
  });
  ['SIGINT', 'SIGTERM'].forEach((sig: any) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    })
  })
}