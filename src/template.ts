import fs from "fs";
import path from "path";
import { sync } from "mkdirp";
import changeCase from "change-case";
import chalk from "chalk";
import signale from "signale";
import { component, style } from "./templates";
import compTemp from "./templates/component/compTemp";

export interface ITemplateConfig {
  compName: string;
}

const write = (dir: string, code: string) => {
  fs.writeSync(fs.openSync(dir, 'w'), code);
}

export default ({ compName }: ITemplateConfig) => {
  const rootDir = `components/${changeCase.paramCase(compName)}`;
  const folder = {
    component: rootDir,
    style: `${rootDir}/style`,
  };

  const pages = {
    component: [
      {
        name: 'index.tsx', module: component.indexTemp(compName)
      },
      {
        name: 'demo.md', module: component.demoTemp(compName)
      },
      {
        name: `${compName}.tsx`, module: component.compTemp(compName)
      }
    ],
    style: [
      { name: 'index.tsx', module: style.indexTemp() },
      { name: 'index.scss', module: style.indexScssTemp(compName) },
    ],
  };
  Object.keys(pages).forEach((key) => {
    sync(folder[key]);
    pages[key].forEach((page) => {
      write(path.resolve(`./${folder[key]}`, page.name), page.module);
      console.info(`  ${chalk.green('create')} ${folder[key]}/${page.name}`);
    });
  });
  signale.success('create component templates successfully!!');
}

