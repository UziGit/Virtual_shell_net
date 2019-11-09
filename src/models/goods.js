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
    setpageList(state, { page_list, totalpagenum }) {
      return { ...state, page_list, totalpagenum };
    },
    initList(state, { page_list }) {
      return { ...state, page_list };
    },
  },

  effects: {
    *getList({ value }, { put, select }) {
      //获取上一次仓库的最新数据
      let state = yield select();
      let res = yield axios.post('http://api8.xubei.com/b/goods/findGoodsList', {
        pageIndex: value.index,
        pageSize: '10',
        gameId: value.game_id,
        area: value.area ? value.area : '',
        server: '',
        businessNo: 'xubei_m',
        system: value.system ? value.system : '0',
        timeOrderBy: value.timeOrderBy ? value.timeOrderBy : '',
        priceOrderBy: value.priceOrderBy ? value.priceOrderBy : '',
        priceRange: value.priceRange ? value.priceRange : '',
      });

      yield put({
        type: 'setpageList',
        page_list: state.goods.page_list.concat(res.data.result.list),
        totalpagenum: res.data.result.totalpagenum,
      });
    },
  },
};
