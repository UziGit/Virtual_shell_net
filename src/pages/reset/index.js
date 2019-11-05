import React from 'react';
import { List, InputItem } from 'antd-mobile';
import './index.less';
class Reset extends React.Component {
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
      <div className="page-reset">
        <div className="tab-bar">
          <i className="iconfont icon-xiangzuo"></i>
          <span>重置密码</span>
        </div>
        <div className="reset">
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
            <div className="verify">
              <InputItem type="text" placeholder="请输入短信验证码">
                短信验证码
              </InputItem>
              <div className="getCode">
                <i>获取验证码</i>
              </div>
            </div>
            <div className="my-pwd">
              <InputItem
                type={this.state.type}
                name={this.state.type}
                placeholder="请输入登录密码"
                value={this.state.valuePwd}
                onChange={this.onChangePwd}
              >
                设置新密码
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
      </div>
    );
  }
}
export default Reset;
