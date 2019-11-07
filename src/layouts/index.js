import React from 'react';
import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="page_index">
        <div className="page_index_body">{this.props.children}</div>
        <ul className="bottom_bar">
          <li>我的</li>
          <li>我的</li>
          <li>我的</li>
          <li>我的</li>
          <li>我的</li>
        </ul>
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
  let firstRouter = ['/serach', '/login', '/register', '/info', '/reset', '/fit'];
  if (firstRouter.indexOf(props.location.pathname) > -1) {
    return <SimpleIndex {...props}></SimpleIndex>;
  } else {
    return <Index {...props}></Index>;
  }
};
