/*
 * @Author: lizhixiang.have@gmail.com
 * @Date: 2020-06-03 17:19:52
 * @LastEditors: lizhixiang.have@gmail.com
 * @LastEditTime: 2020-06-04 13:53:07
 */ 
export default (compName) => `# ${compName} 组件名


## 基本用法
\`\`\`jsx
import { ${compName} } from 'leeui';

ReactDOM.render(
  <>
    <${compName} />
  <>
, mountNode);
\`\`\`


## 用法二
\`\`\`jsx
import { ${compName} } from 'leeui';

class Demo extends React.Component {
  state = {}
  render() {
    return <${compName} />;
  }
}
ReactDOM.render(<Demo />, mountNode);
\`\`\`

## API
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
`