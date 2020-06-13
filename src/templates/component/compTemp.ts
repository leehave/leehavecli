/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:19:41
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-03 17:47:54
 */ 
import changeCase from "change-case";
export default (compName) => `import React, { PureComponent } from 'react'
export interface ${compName}Props {
  prefixCls?: string;
  className?: string;
}
export interface ${compName}States {

}

export default class ${compName} extends PureComponent<${compName}Props, ${compName}States> {
  static displayName = '${compName}';
  static defaultProps = {
    prefixCls: 'ui-${changeCase.paramCase(compName)}',
  };

  render() {
    const {
      prefixCls,
      className,
      children,
    } = this.props;

    const cls = classnames(prefixCls, className);

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }
}
`;