import React from 'react'
import  './index.less'
class Order extends React.Component{
  constructor(){
    super()
    this.state = {
    tabActiveIndex: 0
    }
    this.routePush = this.routePush.bind(this);
  }
  handleTabClick(tabActiveIndex) {
		this.setState({
			tabActiveIndex
		})
  }
  routePush() {
    this.props.history.push('/');
  }
  render(){
    return(
      <div className='my_order_page'>
        <div className='c_header'>
        <div className='c_header_tit'>
        <i onClick={this.routePush}> 返回 </i>
        <h1>我的租赁订单</h1>
        </div>
        <div className='c_header_tab'>
        <ul className="c_header_ul">
          <li className={"m-sys-tab " + (this.state.tabActiveIndex === 0 ? 'active': '')} onClick={this.handleTabClick.bind(this, 0)}>
          全部</li>
          <li className={"m-sys-tab " + (this.state.tabActiveIndex === 1 ? 'active': '')} onClick={this.handleTabClick.bind(this, 1)}>
          待付款</li>
          <li className={"m-sys-tab " + (this.state.tabActiveIndex === 2 ? 'active': '')} onClick={this.handleTabClick.bind(this, 2)}>
          租赁中</li>
          <li className={"m-sys-tab " + (this.state.tabActiveIndex === 3 ? 'active': '')} onClick={this.handleTabClick.bind(this, 3)}>
          交易完成</li>
          <li className={"m-sys-tab " + (this.state.tabActiveIndex === 4 ? 'active': '')} onClick={this.handleTabClick.bind(this, 4)}>
          售后维权</li>
        </ul>
        </div>
        </div>
      </div>
    )
  }
}
export default Order