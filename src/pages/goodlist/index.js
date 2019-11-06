import React from 'react';
import axios from 'axios';
import './index.less';
class Detail extends React.Component {
  state = {
    title: '',
    gamelist: [],
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
        console.log(result);
        this.setState({
          gamelist: result,
        });
      });
  }

  render() {
    return (
      <div className="detail-root">
        <div className="det-header">
          <div className="iconfont icon-xiangzuo"></div>
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
        <div className="det-content">
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
  componentDidMount() {
    this.getSearchText();
    //在这里传入的state.title是空字符串，但console可以得到
    console.log(this.state.title);
    this.getAxios(this.props.location.query.searchText);
  }
}
export default Detail;
