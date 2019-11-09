import React from 'react';
import './index.less';
import { NavLink } from 'react-router-dom'

class Index extends React.Component {
  state = {
    curItem: 'myHome',
  };
  render() {
    console.log(this.state.curItem === 'myHome');
    return (
      <div className="page_index">
        <div className="page_index_body">{this.props.children}</div>
        <ul className='bottom_bar'>
          <NavLink to={{ pathname:"/" }}  exact
          activeStyle={{color: '#118eea'}}>
          <li><i className='iconfont icon-shouye'></i><span>首页</span></li></NavLink>

          <NavLink to={{ pathname:'/goodsAll' }}  activeStyle={{

          color: '#118eea'
          }}><li><i className='iconfont icon-zu'></i><span>租号</span></li></NavLink>
          <NavLink to={{ pathname:'/xiazai' }}  activeStyle={{

          color: '#118eea'
   }}><li><i className='iconfont icon-xiazai'></i><span>App下载</span></li></NavLink>

          <NavLink to={{ pathname:'/order'  }}  activeStyle={{
          color: '#118eea'
   }}><li><i className='iconfont icon-weibiaoti-1'></i><span>订单</span></li></NavLink>
          <NavLink to={{ pathname:'/my' }}  activeStyle={{
          color: '#118eea'
   }}><li><i className='iconfont icon-ziyuan1'></i><span>我的</span></li></NavLink>
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
  let firstRouter = [ '/search', '/login', '/register', '/info', '/reset', '/goodsdetail','/xiazai','/order'];
  if (firstRouter.indexOf(props.location.pathname) > -1) {
    return <SimpleIndex {...props}></SimpleIndex>;
  } else {
    return <Index {...props}></Index>;
  }
};
