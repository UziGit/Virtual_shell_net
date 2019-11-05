import React from 'react';
import './index.less';
import { List, InputItem, Toast } from 'antd-mobile';
import Link from 'umi/link';
class MyCenter extends React.Component {
  state = {
    isShow: false,
    type: 'password',
    message: '',
    isLogin: false,
    valuePhone: '',
    valuePwd: '',
    hasErr: false,
  };
  chgeIsShow = () => {
    this.setState({
      isShow: !this.state.isShow,
      type: this.state.isShow ? 'password' : 'text',
    });
  };
  handleLogin = () => {
    let { valuePwd, valuePhone, isLogin, hasErr } = this.state;
    if (valuePwd === '') {
      this.setState({
        message: '请输入登录密码',
        isLogin: true,
      });
    }
    if (valuePhone === '') {
      this.setState({
        message: '请输入手机号',
        isLogin: true,
      });
    }
    if (hasErr) {
      this.setState({
        isLogin: true,
      });
    }
    setTimeout(() => {
      this.setState({
        isLogin: false,
      });
    }, 2000);
  };
  onChange = value => {
    console.log(value);
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        message: '请输入正确的手机号',
        hasErr: true,
      });
    } else {
      this.setState({
        message: '',
        hasErr: false,
      });
    }
    this.setState({
      valuePhone: value,
    });
  };
  onChangePwd = value => {
    this.setState({
      valuePwd: value,
    });
  };
  render() {
    return (
      <div className="page-my">
        <div className="header">
          <i className="iconfont icon-xiangzuo"></i>
          <span>登录</span>
          <span>注册</span>
        </div>
        <div className="picture">
          <img src="http://m.xubei.com/static/img/logo.28f0127.png" alt="" />
        </div>
        <div className="my-login">
          <List>
            <InputItem
              type="phone"
              name="phone"
              placeholder="请输入手机号"
              value={this.state.valuePhone}
              onChange={this.onChange}
            >
              手机号码
            </InputItem>
            <div className="my-pwd">
              <InputItem
                type={this.state.type}
                name={this.state.type}
                placeholder="请输入登录密码"
                value={this.state.valuePwd}
                onChange={this.onChangePwd}
              >
                密码
              </InputItem>
              <div className="pwdShow" onClick={this.chgeIsShow}>
                {this.state.isShow ? (
                  <i className="iconfont icon-yanjing3"></i>
                ) : (
                  <i className="iconfont icon-biyan"></i>
                )}
              </div>
            </div>
          </List>
        </div>
        <div className="my-sub">
          <button onClick={this.handleLogin}>登录</button>
        </div>
        {this.state.isLogin ? <div className="notification">{this.state.message}</div> : null}
        <div className="forget">
          <Link to="/reset">
            <span>忘记密码</span>
          </Link>
        </div>
      </div>
    );
  }
}
export default MyCenter;
