import React from 'react';
import './info.less';
//引入自定义组件
import MyNavBar from '../../components/myNavbar';
import MySelect from '../../components/mySelect';
import axios from 'axios';
import { connect } from 'dva';
class GoodsInfo extends React.Component {
  //默认的发请求为第一条
  index = 1;
  onScroll = e => {
    let totalpagenum = this.props.totalpagenum;
    if (e.target.clientHeight + e.target.scrollTop > e.target.scrollHeight - 100) {
      if (!this.props.loading) {
        this.index++;
        this.props.initPage(this.index);
      }
    }
  };

  render() {
    return (
      <div className="page_info">
        {/* 头部nav */}
        <MyNavBar></MyNavBar>
        {/* 筛选的选择框 和 遮罩层 */}
        <MySelect></MySelect>
        {/* 数据展示 */}
        <ul className="showpage" onScroll={this.onScroll}>
          {this.props.page_list.map((item, index) => {
            return (
              <li className="eve_data" key={index}>
                <a className="page_a">
                  <div className="page_img">
                    <img src={item.imageurl} alt=""></img>
                  </div>
                  <div className="page_inner">
                    <h3 className="game_name">{item.goods_title}</h3>
                    <h3 className="game_title"></h3>
                    <p className="game_area">{item.game_all_name}</p>
                    <div className="game_price">
                      <div className="lf">
                        {`${item.short_lease}小时起租 押金: ${item.foregift}元`}
                      </div>
                      <span>
                        ￥<em>&nbsp;{item.lease_price}</em>/小时
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.props.initPage(this.index);
  }
}
export default connect(
  state => {
    return {
      pageIndex: state.goods.pageIndex,
      pageSize: state.goods.pageSize,
      page_list: state.goods.page_list,
      totalpagenum: state.goods.totalpagenum,
      loading: state.loading.global,
    };
  },
  dispatch => {
    return {
      initPage(value) {
        dispatch({
          type: 'goods/getList',
          value,
        });
      },
    };
  },
)(GoodsInfo);
