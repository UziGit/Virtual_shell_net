import React from 'react';
import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="page_index">
        <div className='page_index_body'>{this.props.children}</div>
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
export default Index;
