/**
 * title: 租号
 *
*/
import React from 'react';
import Link from 'umi/link';
import './goodsAll.less';
import axios from 'axios';
import getPinyin from './../../assets/js/pinyin';//引入外部的方法，作用：获取汉字首字母，排序
class GoodsMore extends React.PureComponent {
  state = {
    goodAllList: [],//所有数据
    pingData: [],//转成拼音的数据
    datal: 0,//点击的下标数据
    index: 0,
  };
  //点击导航栏数据发生改变
  changeData(index) {
    this.setState({
      index,
      datal: index,
    });
  }

  render() {
    let { datal } = this.state;
    //将数据处理，获取底部数据newFooterList
    let newFooterList = [];
    // eslint-disable-next-line array-callback-return
    this.state.goodAllList.map(item => {
      newFooterList.push(item.content);
    });

    //拼音数据
    let pylist = [];
    if (newFooterList.length > 0) {
      let sd=newFooterList[datal].map(item => {
      return (item.name)
      })
      pylist = sd.map(item => {
        return getPinyin(item.split('')[0], '', true);
      });
      pylist = Array.from(new Set(pylist.sort()))
      // console.log(pylist)
    }
    // 拼音检索，筛选点击的首字母的数据；例如点击到c，根据拼音首字母寻找数据渲染页面

    return (
      <div className="goodAllPage">
        <div className="goodAllHeader">
          <Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>
            <i className="iconfont icon-xiangzuo"></i>
          </Link>
          <h1>租号</h1>
          <Link to="/search"  style={{ color: '#fff', textDecoration: 'none' }}>
            <i className="iconfont icon-sousuo"></i>
          </Link>
        </div>
        <div className="goodAllContent">
          <ul className="contentHeader">
            {this.state.goodAllList.map((item, index) => {
              return (
                <li key={item.id} onClick={this.changeData.bind(this, index)}>
                  <span
                    style={{
                      color: this.state.index === index ? '#00c1fb' : '#333',
                      borderBottom: this.state.index === index ? '3px solid #00c1fb' : 'none',
                    }}
                    className={index}
                  >
                    {item.name}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="contentMiddle">
            <h3 className="title">选择游戏</h3>
            <div>
              <span style={{
                color: this.state.index === datal ? '#fff' : '#333',
                backgroundColor: this.state.index === datal ? '#00c1fb' : '#333'
              }} onClick={
                this.changeData.bind(this,this.state.datal)
              }>热</span>
              {
                pylist.map((item,index) => {
                  return <span key={index} id='yy'
                    >{item}</span>
                })
              }
            </div>
          </div>
          <div className="contentFooter">
            {newFooterList.length > 0
              ? newFooterList[datal].map(item => {
                return (
                  <Link className="It" key={item.id} to={`/info/?gameId=${item.game_id}&gameName=${item.name}&gameType=${
                  item.game_type
                }&goto_link=${item.goto_link ? item.goto_link : ''}`}>
                    <div className="footerAvater">
                      <img src={`http:${item.img_url}`} alt="" className="im" />
                    </div>
                    <div className="footerTitle">{item.name}</div>
                  </Link>
                );
              })
              : null}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    //发送请求，获取后台数据
    axios
      .post('http://rest-api.xubei.com/appxb/appconfig/rentPage', {
        appKey: 'app_xubei',//不加这个，无法获取后台数据
      })
      .then(response => {
        if (response.data.status === 'success') {
        }
        let NewList = [];
        response.data.result.forEach(item => {
          NewList.push(item);
        });
        this.setState({
          goodAllList: NewList,
        });
      });
  }
}
export default GoodsMore;
