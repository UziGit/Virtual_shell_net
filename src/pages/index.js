import React from 'react';
import './index.less';
import Link from 'umi/link';
import axios from 'axios';
import banner from '../assets/banner.png';
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      bannerList: [],
    };
    this.routePush = this.routePush.bind(this);
  }
  getBannerList = () => {
    axios
      .post('http://rest-api.xubei.com/appxb/appconfig/rentPage', { appKey: 'app_xubei' })
      .then(response => {
        let result = response.data;
        if (result.code === 1) {
          let zg = result.result;

          this.setState({
            bannerList: zg,
          });
        }
      });
  };
  routePush() {
    this.props.history.push('/search');
  }

  render() {
    if (this.state.bannerList <= 0) {
      return null;
    } else {
      return (
        <div className="Shell">
          <div className="header">
            <div className="header_chat">
              <Link to="/my" className="iconfont icon-liaotian"></Link>
            </div>
            <div className="header_sea">
              <input
                type="text"
                placeholder="请输入关键词"
                className="searchInput"
                onClick={this.routePush}
              />
            </div>
            <div className="header_Custom">
              <Link to="/my" className="iconfont icon-kefu"></Link>
            </div>
          </div>
          <div className="home">
            <div className="banner">
              <img src={banner} alt="" />
            </div>
            {this.state.bannerList.map((item, index) => {
              return (
                <div className="gameList" key={item.id}>
                  <div className="game_top">
                    <h2>{item.name}</h2>
                    <Link
                      to={{
                        pathname: `/goodsAll`,
                        search: `?id=${item.id}`,
                      }}
                    >
                      <span>更多</span>
                      <i>></i>
                    </Link>
                  </div>
                  <div className="all_gameList">
                    <ul key={item.id}>
                      {item.content.map((items, indexs) => {
                        return (
                          <Link
                            to={{
                              pathname: `/info`,
                              search: `?game_id=${items.game_id}&gameName=${items.name}&gameType=${items.game_type}&goto_link`,
                            }}
                            key={`${item.id}${items.game_id}`}
                          >
                            <li>
                              <div className="all_img">
                                <img src={items.img_url} alt="" />
                              </div>
                              <div className="tit">{items.name}</div>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
  componentDidMount() {
    this.getBannerList();
  }
}
export default Home;
