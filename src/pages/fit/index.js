import React from 'react';
import './index.less';
import Link from 'umi/link';
class Fit extends React.Component {
  emit = () => {
    window.localStorage.setItem('userInfo', '');
    this.props.history.push('/login');
  };
  goBack = () => {
    this.props.history.push('/my');
  };
  render() {
    return (
      <div className="page-fit">
        <div className="tab-bar">
          <i className="iconfont icon-xiangzuo" onClick={this.goBack}></i>
          <span>设置</span>
        </div>
        <div className="clickItem">
          <Link to="/reset">
            <span>修改登录密码</span>
            <i className="iconfont icon-icon--"></i>
          </Link>
        </div>
        <div className="clickItem">
          <span>修改支付密码</span>
          <i className="iconfont icon-icon--"></i>
        </div>
        <div className="sub">
          <button onClick={this.emit}>退出登录</button>
        </div>
      </div>
    );
  }
}
export default Fit;
