import React from 'react';
import axios from 'axios';
import Link from 'umi/link';
import './index.less';
class Search extends React.Component {
  state = {
    hotGame: [],
    history: [],
    value: '',
    isshow: false,
  };
  // pageIndex=1
  // getGoodsDetail(a) {
  //   axios.post('http://api8.xubei.com/b/goods/findGoodsList', {
  //     pageIndex: this.pageIndex,
  //     pageSize: 10,
  //     area: '',
  //     server: '',
  //     businessNo: 'xubei_m',
  //     system: 0,
  //     timeOrderBy: '',
  //     priceOrderBy: '',
  //     searchText: a,
  //     priceRange: '',
  //   }).;
  // }
  setInfo = props => {
    // console.log(13);
    let value = this.state.value;
    //页面跳转的一系列操作
    if (value) {
      this.props.history.push(`/goodlist?searchText=${value}`);
    } else {
      this.setState({
        isshow: true,
      });
      setTimeout(() => {
        this.setState({
          isshow: false,
        });
      }, 2000);
      return;
    }
    let result = window.localStorage.getItem('keywords')
      ? JSON.parse(window.localStorage.getItem('keywords'))
      : [];
    if (result.indexOf(value) <= -1) {
      result.push(value);
      // result = [...result, value];
      window.localStorage.setItem('keywords', JSON.stringify(result));
    }
    //console.log(this.props);

    this.getHistory();

    this.setState({
      value: '',
    });
    this.refs.myIpt.focus();
  };
  getHistory = () => {
    let result = window.localStorage.getItem('keywords')
      ? window.localStorage.getItem('keywords')
      : [];
    let arr = [];
    // console.log(result);
    if (result.length > 0) {
      arr.push(result);
      this.setState({
        history: JSON.parse(arr),
      });
    }
  };
  handChange = e => {
    let value = e.target.value;
    this.setState({
      value,
    });
  };
  deleteHistory = () => {
    console.log(333);
    window.localStorage.removeItem('keywords');
    // this.getHistory();
    this.setState({
      history: [],
    });
  };

  render() {
    return (
      <div className="search-root">
        <div className="search-header">
          <i className="iconfont icon-xiangzuo"></i>
          <div className="search-input">
            <span className="iconfont icon-sousuo"></span>
            <input
              ref="myIpt"
              placeholder="请输入关键字"
              type="text"
              onChange={this.handChange}
              value={this.state.value}
            />
          </div>
          <div className="search-btn" onClick={this.setInfo}>
            搜索
          </div>
        </div>
        <div className="search-center">
          <div className="search-hot">热门搜索</div>
          <div className="search-class">
            {this.state.hotGame.map(item => {
              return (
                <Link to="/goodsAll" key={item.dataId}>
                  {item.content}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="search-footer">
          <div className="search-delete">
            <i>搜索历史</i>
            <span onClick={this.deleteHistory} className="iconfont icon-cuohao"></span>
          </div>
          <div className="search-history">
            {this.state.history.map((item, index) => {
              console.log(111);
              return (
                <Link to="/goodsAll" key={index}>
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
        {this.state.isshow ? <div className="isshow">请输入搜索条件</div> : null}
      </div>
    );
  }
  // shouldComponentUpdate() {
  //   this.getHistory();
  // }
  componentDidMount() {
    axios
      .get(
        'http://api8.xubei.com/xubei-page-cloud/anon/cms/getModDataByModId?modId=hot_game_search',
      )
      .then(response => {
        let result = response.data.result.datas;
        this.setState({
          hotGame: result,
        });
      });
    this.getHistory();
  }
}
export default Search;
