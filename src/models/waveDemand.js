import { getWaveBandData, removeRule, addRule, reqWaveBand } from '../services/api';

export default {
  namespace: 'waveDemand',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    Edit: { modal: false, data: {} },
    Query: { modal: false, data: {} },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getWaveBandData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *itemHandle({ payload }, { call, put }) {
      const response = yield call(reqWaveBand, payload);
      switch (payload.type) {
        case 'Edit':
          yield put({
            type: 'closeEdit',
          });
          break;
        case 'Create':
          yield put({
            type: 'closeEdit',
          });
          break;
        case 'Query':
          yield put({
            type: 'closeQuery',
          });
          break;
        case 'Delete':
          yield put({
            type: 'fetch',
          });
          break;
        default:
          break;
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    closeEdit(state, action) {
      return {
        ...state,
        Edit: { modal: false, data: {} },
      };
    },
    closeQuery(state, action) {
      return {
        ...state,
        Query: { modal: false, data: {} },
      };
    },
    // closeWarn(state, action) {
    //   return {
    //     ...state,
    //     Warn: { modal: false, data: {}}
    //   }
    // },
    // setWarnData(state, action) {
    //   return {
    //     ...state,
    //     Warn: { modal: true, data: action.payload}
    //   }
    // },
    setEditData(state, action) {
      return {
        ...state,
        Edit: { modal: true, data: action.payload },
      };
    },
    setQueryData(state, action) {
      return {
        ...state,
        Query: { modal: true, data: action.payload },
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
