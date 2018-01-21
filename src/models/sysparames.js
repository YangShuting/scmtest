import { paramesGetBand, paramesGetBandYear, paramesGetCategory, paramesGetShop, paramesGetScoreItem, paramesGetVender } from '../services/api';
// import { setAuthority } from '../utils/authority';
// import { routerRedux } from 'dva/router';

export default {
  namespace: 'sysparames',

  state: {
    band: [],
    bandYear: [],
    category: [],
    shop: [],
    scoreItem: [],
    vender: [],
    // currentAuthority: 'guest'
  },

  effects: {
    *getBand(_, { call, put }) {
      const response = yield call(paramesGetBand);
      yield put({ type: 'updateBand', payload: response });
    },
    *getBandYear(_, { call, put }) {
      const response = yield call(paramesGetBandYear);
      yield put({ type: 'updateBandYear', payload: response });
    },
    *getCategory(_, { call, put }) {
      const response = yield call(paramesGetCategory);
      yield put({ type: 'updateGetCategory', payload: response });
    },
    *getShop(_, { call, put }) {
      const response = yield call(paramesGetShop);
      yield put({ type: 'updateShop', payload: response });
    },
    *getScoreItem(_, { call, put }) {
      const response = yield call(paramesGetScoreItem);
      yield put({ type: 'updateScoreItem', payload: response });
    },
    *getVender(_, { call, put }) {
      const response = yield call(paramesGetVender);
      yield put({ type: 'updateVender', payload: response });
    },
    *getAllParames(_, { call, put }) {
      const band = yield call(paramesGetBand);
      const bandYear = yield call(paramesGetBandYear);
      const category = yield call(paramesGetCategory);
      const shop = yield call(paramesGetShop);
      // const scoreItem = yield call(paramesGetScoreItem);
      // const vender = yield call(paramesGetVender);
      // yield put({ type: 'updateAllParames', payload: {band, bandYear, category, shop, scoreItem, vender} });
      yield put({ type: 'updateAllParames', payload: { band, bandYear, category, shop } });
    },
  },

  reducers: {
    updateBand(state, { payload }) {
      return {
        ...state,
        band: payload,
      };
    },
    updateBandYear(state, { payload }) {
      return {
        ...state,
        bandYear: payload,
      };
    },
    updateGetCategory(state, { payload }) {
      return {
        ...state,
        category: payload,
      };
    },
    updateShop(state, { payload }) {
      return {
        ...state,
        shop: payload,
      };
    },
    updateScoreItem(state, { payload }) {
      return {
        ...state,
        scoreItem: payload,
      };
    },
    updateVender(state, { payload }) {
      return {
        ...state,
        vender: payload,
      };
    },
    updateAllParames(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
