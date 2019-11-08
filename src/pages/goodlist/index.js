import React from 'react';
import axios from 'axios';
import './index.less';

class Detail extends React.Component {
  state = {
    title: '',
    gamelist: [],
    loading: false,
  };
  getSearchText = props => {
    console.log(this.props);
    let title = this.props.location.query.searchText;
    console.log(title);
    this.setState({
      title,
    });
  };
  //常量表示页数
  pageIndex = 1;
  getAxios(searchText) {
    this.setState({
      loading: true,
      pageNum: 1,
    });
    axios
      .post('http://api8.xubei.com/b/goods/findGoodsList', {
        pageIndex: this.pageIndex,
        pageSize: 10,
        area: '',
        server: '',
        businessNo: 'xubei_m',
        system: 0,
        timeOrderBy: '',
        priceOrderBy: '',
        searchText: searchText,
        priceRange: '',
      })
      .then(response => {
        let result = response.data.result.list;
        let pageNum = response.data.result.totalpagenum;
        console.log(response.data);
        if (Number(response.data.code) === 1) {
          let newResult = [...this.state.gamelist];
          newResult = newResult.concat(result);
          this.setState({
            gamelist: newResult,
            pageNum,
            loading: false,
          });
        }
      });
  }

  //点击回到搜索页面
  getSearch = () => {
    this.props.history.push('/search');
  };
  render() {
    return (
      <div className="detail-root">
        <div className="det-position">
          <div className="det-header">
            <div onClick={this.getSearch} className="iconfont icon-xiangzuo"></div>
            <div className="det-title">{this.state.title}</div>
          </div>
          <div className="det-sort">
            <div className="sort">
              <span>排序</span>
              <i className="iconfont icon-below-s"></i>
            </div>
            <div className="filter">
              <span>筛选</span>
              <i className="iconfont icon-below-s"></i>
            </div>
          </div>
        </div>
        <div className="det-content" onScroll={this.onScroll}>
          <ul>
            {this.state.gamelist.map((item, index) => {
              return (
                <li key={index}>
                  <div className="det-img">
                    <img src={item.imageurl} alt="" />
                  </div>
                  <div className="det-tit-pri">
                    <div className="title">{item.goods_title}</div>
                    <div className="adress">{item.game_all_name}</div>
                    <div className="price">
                      <span>
                        {item.short_lease}小时起租 押金：{item.foregift}
                      </span>
                      <i>
                        ￥<em>{item.lease_price}</em>/小时
                      </i>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  onScroll = e => {
    let target = e.target;
    //1.滚动条滚动的距离
    let scrollTop = target.scrollTop; //535
    //2.滚动容器中内容的整体高度
    let scrollHeight = target.scrollHeight; //1046
    //3.滚动容器的高度
    let clientHeight = target.clientHeight; //511
    // console.log(scrollHeight, clientHeight);
    console.log(scrollTop);
    //判断有没有到底部
    let { loading } = this.state;
    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !loading &&
      this.state.pageNum >= this.pageIndex
    ) {
      //页面加载下一页
      this.pageIndex += 1;
      //重新发送请求
      this.getAxios(this.props.location.query.searchText);
    }
  };
  componentDidMount() {
    this.getSearchText();
    //在这里传入的state.title是空字符串，但console可以得到
    console.log(this.state.title);
    this.getAxios(this.props.location.query.searchText);
    // window.addEventListener('scroll', () => {
    //   console.log(1);
    // });
  }
}
export default Detail;
