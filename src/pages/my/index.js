/**
 * title: 个人中心
 * Routes:
 *   - /src/routes/PrivateRoute.js
 *
 */
import React from 'react';
import './index.less';
import picture from '../../assets/atvar.png';
import Link from 'umi/link';
import service from '../../assets/buy.png';
import finish from '../../assets/finish.png';
import buy from '../../assets/buy.png';
import hire from '../../assets/hire.png';
import info from '../../assets/info.png';
import free from '../../assets/free.png';
import phone from '../../assets/phone.png';
class My extends React.Component {
  phone = window.localStorage.getItem('userInfo');
  render() {
    return (
      <div className="page-center">
        <div className="tab-bar">
          <span>个人中心</span>
          <Link to="/fit">
            <i className="iconfont icon-shezhi1"></i>
          </Link>
        </div>
        <div className="userInfo">
          <div className="circle">
            <img src={picture} alt="" />
          </div>
          <span>{this.phone}</span>
        </div>
        <div className="card">
          <span>可用余额</span>
          <i>￥0.00</i>
        </div>
        <div className="detail">
          <div className="freeze">
            <p className="money">冻结资金</p>
            <p className="yuE">￥0.00</p>
          </div>
          <div className="access">
            <p className="money">可用金币</p>
            <p className="yuE">0</p>
            <div className="info">
              <span>金币说明</span>
            </div>
          </div>
        </div>
        <div className="menu">
          <span>我的租号订单</span>
          <p>
            <span>更多</span>
            <i className="iconfont icon-icon--"></i>
          </p>
        </div>
        <div className="menu-content">
          <ul>
            <li>
              <img src={buy} alt="" />
              <span>待付款</span>
            </li>
            <li>
              <img src={hire} alt="" />
              <span>租赁中</span>
            </li>
            <li>
              <img src={finish} alt="" />
              <span>已完成</span>
            </li>
            <li>
              <img src={service} alt="" />
              <span>售后服务</span>
            </li>
          </ul>
        </div>
        <div className="menu">
          <span>我的常用工具</span>
        </div>
        <div className="menu-content">
          <ul>
            <li>
              <img src={free} alt="" />
              <span>待付款</span>
            </li>
            <li>
              <img src={info} alt="" />
              <span>租赁中</span>
            </li>
            <li>
              <img src={phone} alt="" />
              <span>已完成</span>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default My;
