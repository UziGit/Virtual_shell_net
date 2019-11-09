import React from 'react';
import './info.less';
//引入自定义组件
import MyNavBar from '../../components/myNavbar';
import MySelect from '../../components/mySelect';
import axios from 'axios';
import { connect } from 'dva';
class GoodsInfo extends React.Component {
  state = {
    system: 0, // 0是安卓，1是IOS
    area: '', //安卓微信 qq 苹果微信 qq
    timeOrderBy: '', //时间近-远0，远-近1
    priceOrderBy: '', //价格低到高0，高到低1
    priceRange: '', //价格的范围
  };
  initPageList = [];
  //默认的发请求为第一条
  index = 1;
  //根据传递过来的url地址上面的参数来发送对应游戏的请求
  //游戏id
  game_id = this.props.location.query.game_id;
  //游戏名
  gameName = this.props.location.query.gameName;
  //游戏类型
  gameType = this.props.location.query.gameType;

  //滚动事件
  onScroll = e => {
    let totalpagenum = this.props.totalpagenum;

    if (e.target.clientHeight + e.target.scrollTop > e.target.scrollHeight - 100) {
      if (!this.props.loading) {
        this.index++;
        this.props.initPage({
          index: this.index,
          game_id: this.game_id,
          gameName: this.gameName,
          gameType: this.gameType,
          system: this.state.system,
          area: this.state.area,
          timeOrderBy: this.state.timeOrderBy,
          priceOrderBy: this.state.priceOrderBy,
          priceRange: this.state.priceRange,
        });
      }
    }
  };
  //设置是安卓还是苹果
  setSystem = val => {
    this.setState({
      system: val === '安卓' ? 0 : 1,
    });
    setTimeout(() => {
      this.props.initPagelist(this.initPageList);
      this.props.initPage({
        index: this.index,
        game_id: this.game_id,
        gameName: this.gameName,
        gameType: this.gameType,
        system: this.state.system,
        area: this.state.area,
        timeOrderBy: this.state.timeOrderBy,
        priceOrderBy: this.state.priceOrderBy,
        priceRange: this.state.priceRange,
      });
    });
  };
  //设置是安卓微信还是苹果微信。。。
  setArea = val => {
    this.setState({
      area: val,
    });
  };
  //设置时间远近或是价格高低
  setTimePrice = val => {
    switch (val) {
      case '时间由近到远':
        this.setState({
          timeOrderBy: '0',
          priceOrderBy: '',
        });
        break;
      case '时间由远到近':
        this.setState({
          timeOrderBy: '1',
          priceOrderBy: '',
        });
        break;
      case '价格由低到高':
        this.setState({
          timeOrderBy: '',
          priceOrderBy: '0',
        });
        break;
      case '价格由高到低':
        this.setState({
          timeOrderBy: '',
          priceOrderBy: '1',
        });
        break;
      default:
    }
    setTimeout(() => {
      this.props.initPagelist(this.initPageList);
      this.props.initPage({
        index: this.index,
        game_id: this.game_id,
        gameName: this.gameName,
        gameType: this.gameType,
        system: this.state.system,
        area: this.state.area,
        timeOrderBy: this.state.timeOrderBy,
        priceOrderBy: this.state.priceOrderBy,
        priceRange: this.state.priceRange,
      });
    });
  };
  //设置价格范围
  setPriceRange = (val1, val2) => {
    this.setState({
      priceRange: `${val1}-${val2}`,
    });
    setTimeout(() => {
      this.props.initPagelist(this.initPageList);
      this.props.initPage({
        index: this.index,
        game_id: this.game_id,
        gameName: this.gameName,
        gameType: this.gameType,
        system: this.state.system,
        area: this.state.area,
        timeOrderBy: this.state.timeOrderBy,
        priceOrderBy: this.state.priceOrderBy,
        priceRange: this.state.priceRange,
      });
    });
  };

  render() {
    return (
      <div className="page_info">
        {/* 头部nav */}
        <MyNavBar
        // onClick={() => {
        //   this.props.initPagelist(this.initPageList);
        // }}
        >
          {this.gameName}
        </MyNavBar>
        {/* 筛选的选择框 和 遮罩层 */}
        <MySelect
          setSystem={this.setSystem}
          setArea={this.setArea}
          setTimePrice={this.setTimePrice}
          setPriceRange={this.setPriceRange}
          setPost={() => {
            this.props.initPagelist(this.initPageList);
            this.props.initPage({
              index: this.index,
              game_id: this.game_id,
              gameName: this.gameName,
              gameType: this.gameType,
              system: this.state.system,
              area: this.state.area,
              timeOrderBy: this.state.timeOrderBy,
              priceOrderBy: this.state.priceOrderBy,
              priceRange: this.state.priceRange,
            });
          }}
        ></MySelect>
        {/* 数据展示 */}
        <ul className="showpage" onScroll={this.onScroll}>
          {this.props.page_list.map((item, index) => {
            return (
              <li
                className="eve_data"
                key={index}
                onClick={() => {
                  this.props.history.push(
                    `/goodsdetail?goodsId=${item.goods_id}&gameId=${item.game_id}&isFreePlay=false`,
                  );
                }}
              >
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
    this.props.initPage({
      index: this.index,
      game_id: this.game_id,
      gameName: this.gameName,
      gameType: this.gameType,
    });
  }
  componentWillUnmount() {
    this.props.initPagelist(this.initPageList);
  }
}
export default connect(
  state => {
    return {
      //拿仓库的数据
      pageIndex: state.goods.pageIndex,
      pageSize: state.goods.pageSize,
      page_list: state.goods.page_list,
      totalpagenum: state.goods.totalpagenum,
      //generator自带的属性，发请求时为true
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
      //默认把仓库的数据清空
      initPagelist(payload) {
        dispatch({
          type: 'goods/initList',
          page_list: payload,
        });
      },
      //发送请求的时候设置数据
    };
  },
)(GoodsInfo);
