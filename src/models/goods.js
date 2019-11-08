//商品详情页仓库
import axios from 'axios';
export default {
  //命名空间
  namespace: 'goods',
  //初始化数据
  state: {
    pageIndex: 1, //第几页
    pageSize: 10, //一页多少条数据
    totalpagenum: '', //总功有几页，默认10条一页
    page_list: [], //渲染页面的数组
  },

  reducers: {
    //初始化更新数据页面
    setpageList(state, { page_list, totalpagenum, loading }) {
      console.log(page_list);
      return { ...state, page_list, totalpagenum, loading };
    },
  },

  effects: {
    *getList({ value }, { put, select }) {
      //获取上一次仓库的最新数据
      let state = yield select();
      console.log(value, state);

      let res = yield axios.post('http://api8.xubei.com/b/goods/findGoodsList', {
        pageIndex: value,
        pageSize: '10',
        gameId: '1109',
        area: '',
        server: '',
        businessNo: 'xubei_m',
        system: '0',
        timeOrderBy: '',
        priceOrderBy: '',
        priceRange: '',
      });

      console.log(res);
      yield put({
        type: 'setpageList',
        page_list: state.goods.page_list.concat(res.data.result.list),
        totalpagenum: res.data.result.totalpagenum,
      });
    },
  },
};
