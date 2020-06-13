/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:20:07
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-04 13:55:22
 */ 
export default (compName) => `import ${compName} from './${compName}';
export default ${compName};
`