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
class SimpleIndex extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
export default props => {
  let firstRouter = ['/my', '/serach', '/login', '/register', '/info', '/reset', '/goodsdetail'];
  if (firstRouter.indexOf(props.location.pathname) > -1) {
    return <SimpleIndex {...props}></SimpleIndex>;
  } else {
    return <Index {...props}></Index>;
  }
};
