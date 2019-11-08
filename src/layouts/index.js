import React from 'react';
import './index.less';
import { TabBar } from 'antd-mobile';

class Index extends React.Component {
  state = {
    curItem: 'myHome',
  };
  render() {
    console.log(this.state.curItem === 'myHome');
    return (
      <div className="page_index">
        <div className="page_index_body">{this.props.children}</div>
        <div></div>
      </div>
    );
  }
}
export default Index;
