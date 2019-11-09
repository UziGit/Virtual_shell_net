/**
 * title: 立即租赁
 * Routes:
 *   - /src/routes/PrivateRoute.js
 */
import React from 'react';
import Link from 'umi/link';
import './gooddetail.less';
import axios from 'axios';
import load from './../../assets/loading.gif'
import { Carousel } from 'antd-mobile';
class GoodDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      detailList: [],
      detailPicture: [],
      show: 10
    };
  }
  render() {
    let { detailList, detailPicture,show } = this.state;
    console.log(show)
    return (
      <div className="pageGoodDetail">
        <div className="goodDetailHeader">
          <Link to="/info" >
            <i className="iconfont icon-xiangzuo"></i>
          </Link>
          <h1>账号详情</h1>
          <Link to="/tips">
            <i>试玩须知</i>
          </Link>
        </div>

        <div className="goodDetailContent">
          <div className="contentHeader">
            <h2>{detailList.goodsTitle}</h2>
            <div className="phoneType">
              <p>{
                detailList.gameAllName==='underfined'?
                detailList.gameAllName + '/' + detailList.phoneTypeText:''}</p>
            </div>
            <div className="headerFoot">
              <p>{detailList.shortLease}小时起租</p>
              <p>押金：{detailList.foregift}元</p>
              <p>
                <span style={{ color: '#f01101', fontSize: '16px' }}>
                  ￥{detailList.leasePrice}
                </span>
                /小时
              </p>
            </div>
          </div>

          <div className="content">
            <h2>账号描述</h2>
            <div>
              <p>{detailList.remark}</p>
            </div>
          </div>
          <div className="contentFooter">
            <h2>账号截图</h2>
            <Carousel
              className="space-carousel"
              autoplay
              infinite={true}
              cellSpacing={25}
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {detailPicture.map((item, index) => (
                <a
                  key={index}
                  href=" "
                  style={{ display: 'inline-block', width: '100%', height: '100%' }}
                >
                  <img
                    src={item.location}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="goodDetailFooter">
          <button>立即租赁</button>
        </div>
        <div className="loading" style={{zIndex:show === 10 ? -3 : 10, position: 'absolute', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px', borderRadious: '50%' }}>
          <img src={load} alt='' style={{ width: '100px', height: '100px',zIndex: {show} }} />

        </div>
      </div>
    );
  }
  getDetailData() {
    axios
      .get(
        'http://api8.xubei.com/xubei-goods-cloud/anonapi/unifiedGoodsDetail?goodsId=2857600&businessNo=xubei_m&showType=2&show=1',
      )
      .then(response => {
        console.log(response.data);
        let result = response.data;
        console.log(result.result.picture);
        if (result.code === '1') {
          this.setState({
            detailList: result.result,
            detailPicture: result.result.picture,
            show: 10
          });
        }
      });
  }
  componentDidMount() {
    this.getDetailData();
    this.setState({
      show: -3
    })
  }
}
export default GoodDetail;
