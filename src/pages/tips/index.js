import React from 'react';
import Link from 'umi/link';
import './tips.less';
const Tips = () => {
  return (
    <div className="TipsPage">
      <div className="TipsHeader">
        <Link to="/goodsdetail?goodsId=2974628&gameId=1822&isFreePlay=false" style={{ color: '#fff', textDecoration: 'none' }}>
          <i className="iconfont icon-xiangzuo"></i>
        </Link>
        <h1>试玩须知</h1>
        <i>~^o^~</i>
      </div>
      <div className="TipsCotent">
        <div className="tipsItem">
          <h2>关于手游租号后如何登陆游戏？</h2>
          <p>订单租赁成功后，订单页面会出现游戏的账号密码，您输入账号密码登录即可进行游戏。</p>
        </div>
        <div className="tipsItem">
          <h2>关于押金，有些出租商品设置了押金，这个押金扣除后怎么退还？</h2>
          <p>某些出租商品设置需要缴纳押金才能租赁，您租号的押金会在48小时后返还到您的账户！ </p>
        </div>
        <div className="tipsItem">
          <h2>为了更多的朋友能够享受极品账号带来的游戏乐趣，我们期望您能遵守以下约定</h2>
          <div className="ll">
            <div>
              <span>①</span>
              <i>禁止使用第三方外挂，禁止游戏中辱骂他人，禁止消极游戏和逃跑</i>
            </div>
            <div>
              <span>②</span>
              <i>
                租号前请详细查看卖家发布内容，知晓明确禁止内容：例如：标注为禁止打排位的不可以打排位！不允许使用金币和点卷等。
              </i>
            </div>
            <div>
              <span>③</span>
              <i>严禁租赁高段位账号进行“演员”行为。</i>
            </div>
            <div>
              <span>④</span>
              <i>
                如果用户违反以上禁止内容，卖家有权发起维权申请，客服根据实际情况进行仲裁，有押金的扣除押金补偿卖家！情节严重的统计相关信息追究责任，保留且提交不良信用记录
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tips;
