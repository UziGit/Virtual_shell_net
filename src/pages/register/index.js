import React from 'react';
import { List, InputItem } from 'antd-mobile';
import './index.less';
import axios from 'axios';
class Register extends React.Component {
  state = {
    isShow: false,
    type: 'password',
    message: '',
    isLogin: false,
    valuePhone: '',
    valuePwd: '',
    hasErr: false,
    valueCode: '',
    str: '获取验证码',
  };
  //密码的显示和隐藏
  isOk = false;
  isGoLogin = false;
  chgeIsShow = () => {
    this.setState({
      isShow: !this.state.isShow,
      type: this.state.isShow ? 'password' : 'text',
    });
  };
  //改变验证码的value
  onChangeCode = value => {
    console.log(value);
    this.setState({
      valueCode: value,
    });
  };
  //改变手机号的value
  onChange = value => {
    let phoneRex = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneRex.test(value.replace(/\s/g, ''))) {
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
  //改变密码的value
  onChangePwd = value => {
    this.setState({
      valuePwd: value,
    });
  };
  //点击登录进行判断
  handleLogin = () => {
    let { valuePwd, valuePhone, isLogin, hasErr, valueCode, str } = this.state;
    let pwdReg = /^[0-9a-zA-Z]{6,20}$/;
    //当输入的手机号是错误的时候，提示“请输入正确的手机号”
    if (hasErr) {
      this.setState({
        isLogin: true,
      });
    } else if (valuePhone === '') {
      //当没有输入手机号，提示“输入手机号”
      this.setState({
        message: '请输入手机号',
        isLogin: true,
      });
    } else if (valueCode === '') {
      //当输入的手机号正确时，没有输入验证码，提示“输入短信验证码”
      this.setState({
        isLogin: true,
        message: '请输入随机验证码',
      });
    } else if (valuePwd === '') {
      //当输入的手机号正确时，又输入了短信验证码，但是没有输入密码，提示“输入密码”
      this.setState({
        isLogin: true,
        message: '请输入密码',
      });
    } else if (str.toUpperCase() !== valueCode.toUpperCase()) {
      this.setState({
        isLogin: true,
        message: '输入的验证码有误',
      });
    } else if (!pwdReg.test(valuePwd)) {
      //判断的设置的密码： 密码为6-20个英文字母，数字或符号
      this.setState({
        isLogin: true,
        message: '请输入正确的密码格式',
      });
    } else if (this.isGoLogin) {
      this.setState({
        isLogin: true,
        message: '注册成功',
      });
      console.log(this.isGoLogin);
    } else {
      this.isOk = true;
    }
    this.setUser();
    this.delay();
  };
  //设置2秒后，错误提示消失
  delay() {
    setTimeout(() => {
      this.setState({
        isLogin: false,
      });
      if (this.isOk && this.isGoLogin) {
        this.props.history.push('/login?redirect=/my');
      }
    }, 2000);
  }
  //将数据存到lostorage中
  setUser() {
    axios
      .get('http://localhost:3000/user', {
        params: {
          phone: this.state.valuePhone,
        },
      })
      .then(response => {
        let data = response.data;
        if (data.length > 1) {
          this.setState({
            isLogin: true,
            message: '该用户名已存在',
          });
          this.isGoLogin = false;
        } else {
          axios
            .post('http://localhost:3000/user', {
              phone: this.state.valuePhone,
              pwd: this.state.valuePwd,
            })
            .then(response => {});
          this.isGoLogin = true;
        }
      });
  }
  judeMent() {
    let { hasErr, valuePhone, isLogin, message, valueCode } = this.state;
    //输入的手机号有错误的时候，提示请输入正确的手机号
    if (hasErr) {
      this.setState({
        isLogin: true,
      });
    } else if (valuePhone === '') {
      //没有输入手机号的时候提示“请输入手机号”
      this.setState({
        message: '请输入手机号',
        isLogin: true,
      });
    } else if (valueCode === '' && hasErr) {
      //输入的手机号是正确的时候，但是没有输入验证码，提示输入验证码
      this.setState({
        isLogin: true,
        message: '请输入随机验证码',
      });
    } else {
      this.getYZM(6);
    }
    this.delay();
  }
  //点击获取验证码，并对输入的手机号进行验证
  getCode = () => {
    this.judeMent();
  };
  getRand = (min, max) => {
    return parseInt(Math.random() * (max - min + 1) + min);
  };
  getYZM = num => {
    var str = '',
      ch;
    for (var i = 0; i < num; i++) {
      var randAscii = this.getRand(48, 122);

      if ((randAscii >= 58 && randAscii <= 64) || (randAscii >= 91 && randAscii <= 96)) {
        i--;
      } else {
        ch = String.fromCharCode(randAscii);
        str += ch;
      }
    }
    this.setState({
      str: str,
    });
  };
  goBack = () => {
    this.props.history.push('/login');
  };
  render() {
    return (
      <div className="page-reset">
        <div className="tab-bar">
          <i className="iconfont icon-xiangzuo" onClick={this.goBack}></i>
          <span>注册</span>
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
              <InputItem
                type="text"
                placeholder="请输入随机验证码"
                value={this.state.valueCode}
                onChange={this.onChangeCode}
              >
                随机验证码 <i onClick={this.getCode}>{this.state.str}</i>
              </InputItem>
            </div>
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
        <div className="info">密码为6-20个英文字母，数字或符号</div>
        <div className="sub">
          <button onClick={this.handleLogin}>完成</button>
        </div>
        {this.state.isLogin ? <div className="notification">{this.state.message}</div> : null}
        <div className="item">
          <span> 完成注册即代表已阅读并同意</span>
          <i>《服务条款和隐私政策》</i>
        </div>
      </div>
    );
  }
}
export default Register;
