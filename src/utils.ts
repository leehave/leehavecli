import path from 'path';
import fs from 'fs';
import { Configuration } from 'webpack';

export interface FileInfo {
  filePath?: string;
  type?: string;
}
//读取文件目录树
const fileTree = (list: FileInfo[], dirPath: string) => {
  const files = fs.readFileSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stats = fs.statSync(filePath);
    if(stats.isDirectory()){
      fileTree(list, filePath);
    } else {
      const type = path.extname(files[i]).substring(1);
      list.push({ filePath, type });
    }
  }
}
//获取项目文件
const getProjectPath = (dir = './'): string => {
  return path.join(process.cwd(), dir);
}

export interface CustomConfig extends Configuration {
  entries?: object;
  banner?: string;
  setBabelOptions?: (options) => void;
  setRules?: (rules) => void;
  setPlugins?: (pluigns) => void;
}

//获取项目文件
const getCustomConfig = (configFileName = 'lee.config.js'): CustomConfig => {
  const configPath = path.join(process.cwd(), configFileName);
  if(fs.existsSync(configPath)){
    return require(configPath);
  }

  return {};
}

export {
  fileTree,
  getProjectPath,
  getCustomConfig,
}