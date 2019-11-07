import React from 'react';
import './index.less';
class Fit extends React.Component {
  render() {
    return (
      <div className="page-fit">
        <div className="tab-bar">
          <i className="iconfont icon-xiangzuo"></i>
          <span>设置</span>
        </div>
        <div className="clickItem">
          <span>修改登录密码</span>
          <i className="iconfont icon-icon--"></i>
        </div>
      </div>
    );
  }
}
export default Fit;
