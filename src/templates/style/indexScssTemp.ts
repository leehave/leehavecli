/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:20:35
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-05 08:53:01
 */ 
import changeCase from "change-case";
export default (compName) => `@import '../../style/core/index';
@include b(${changeCase.paramCase(compName)}){
  
}
`