import React from 'react';

class MySelect extends React.Component {
  state = {
    isShow1: false,
    isShow2: false,
    isShow3: false,
    isShow4: false,
    input1: '',
    input2: '',
  };
  //判断输入框只能是数字的正则
  numReg = /^\d+$/;
  chginput1 = e => {
    if (this.numReg.test(e.target.value)) {
      this.setState({
        input1: e.target.value,
      });
    }
  };
  chginput2 = e => {
    if (this.numReg.test(e.target.value)) {
      this.setState({
        input2: e.target.value,
      });
    }
  };
  bodycss = document.getElementsByTagName('body')[0];
  render() {
    this.bodycss.style.overflow =
      this.state.isShow1 || this.state.isShow2 || this.state.isShow3 || this.state.isShow4
        ? 'hidden'
        : 'auto';
    return (
      <div>
        <ul className="selectGoods">
          <li
            className="selectGoods_one"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                isShow1: !this.state.isShow1,
                isShow2: false,
                isShow3: false,
                isShow4: false,
              });
            }}
          >
            <span style={{ color: this.state.isShow1 ? '#118EEA' : '#333' }}>安卓</span>
            <i className="iconfont icon-below-s"></i>

            <ol
              className="more_select"
              style={{
                height: this.state.isShow1 ? '72px' : '0px',
                transition: 'all 0.3s',
                overflow: 'hidden',
              }}
              onClick={e => {
                this.props.setSystem(e.target.innerHTML);
              }}
            >
              <li
                onClick={() => {
                  console.log(this.props);
                }}
              >
                安卓
              </li>
              <li
                onClick={() => {
                  console.log(this.props);
                }}
              >
                IOS
              </li>
            </ol>
          </li>

          <li
            className="selectGoods_one"
            onClick={() => {
              this.setState({
                isShow1: false,
                isShow2: !this.state.isShow2,
                isShow3: false,
                isShow4: false,
              });
            }}
          >
            <span style={{ color: this.state.isShow2 ? '#118EEA' : '#333' }}>服务器</span>
            <i className="iconfont icon-below-s"></i>

            <div
              className="fwq"
              style={{
                height: this.state.isShow2 ? '140px' : '0px',
                transition: 'all 0.3s',
                overflow: 'hidden',
              }}
            >
              <ol
                className="more_select"
                onClick={e => {
                  console.log(e.target);
                  this.props.setArea(e.target.innerHTML);
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <li>安卓QQ</li>
                <li>安卓微信</li>
                <li>苹果QQ</li>
                <li>苹果微信</li>
              </ol>
              <div
                className="rselsect"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <span
                  onClick={
                    //这里点击需要把这个isshow2变成false，并且发送请求
                    () => {
                      this.setState({
                        isShow1: false,
                        isShow2: !this.state.isShow2,
                        isShow3: false,
                        isShow4: false,
                      });
                      this.props.setPost();
                    }
                  }
                >
                  全部区服
                </span>
              </div>
            </div>
          </li>

          <li
            className="selectGoods_one"
            onClick={() => {
              this.setState({
                isShow1: false,
                isShow2: false,
                isShow3: !this.state.isShow3,
                isShow4: false,
              });
            }}
          >
            <span style={{ color: this.state.isShow3 ? '#118EEA' : '#333' }}>排序</span>
            <i className="iconfont icon-below-s"></i>

            <ol
              className="more_select"
              style={{
                height: this.state.isShow3 ? '170px' : '0px',
                transition: 'all 0.3s',
                overflow: 'hidden',
              }}
              onClick={e => {
                this.props.setTimePrice(e.target.innerHTML);
                // e.stopPropagation();
                // e.preventDefault();
              }}
            >
              <li>默认排序</li>
              <li>时间由近到远</li>
              <li>时间由远到近</li>
              <li>价格由低到高</li>
              <li>价格由高到低</li>
            </ol>
          </li>

          <li
            className="selectGoods_one"
            onClick={() => {
              this.setState({
                isShow1: false,
                isShow2: false,
                isShow3: false,
                isShow4: !this.state.isShow4,
              });
            }}
          >
            <span style={{ color: this.state.isShow4 ? '#118EEA' : '#333' }}>筛选</span>
            <i className="iconfont icon-below-s"></i>

            <ol
              className="more_select"
              style={{
                height: this.state.isShow4 ? '124px' : '0px',
                transition: 'all 0.3s',
                overflow: 'hidden',
              }}
              onClick={e => {
                // console.log(e.target.tagName);
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <li>价格范围</li>
              <li className="price">
                <input placeholder="最低价" value={this.state.input1} onChange={this.chginput1} />{' '}
                --
                <input placeholder="最高价" value={this.state.input2} onChange={this.chginput2} />
              </li>
              <li className="btn">
                <button
                  className="btn1"
                  onClick={() => {
                    //点击这个确定按钮的时候把遮罩层去掉
                    this.setState({
                      isShow1: false,
                      isShow2: false,
                      isShow3: false,
                      isShow4: !this.state.isShow4,
                    });
                  }}
                >
                  重置
                </button>
                <button
                  className="btn2"
                  onClick={() => {
                    this.props.setPriceRange(this.state.input1, this.state.input2);
                    //点击这个确定按钮的时候把遮罩层去掉
                    this.setState({
                      isShow1: false,
                      isShow2: false,
                      isShow3: false,
                      isShow4: !this.state.isShow4,
                    });
                  }}
                >
                  确定
                </button>
              </li>
            </ol>
          </li>
        </ul>
        <div
          className="mask"
          style={{
            display:
              this.state.isShow1 || this.state.isShow2 || this.state.isShow3 || this.state.isShow4
                ? 'block'
                : 'none',
          }}
          onClick={() => {
            this.setState({
              isShow1: false,
              isShow2: false,
              isShow3: false,
              isShow4: false,
            });
          }}
        ></div>
      </div>
    );
  }
}
export default MySelect;
