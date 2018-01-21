import { getSampleData, removeRule, addRule, reqSample } from '../services/api';

const namespace = 'sampleApply';

export default {
  namespace,

  state: {
    data: {
      list: [],
      pagination: {},
    },
    defaultType: `${namespace}/fetch`,
    Edit: { modal: false, data: {} },
    Query: { modal: false, data: {} },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getSampleData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *itemHandle({ payload }, { call, put }) {
      console.log('1111');
      const response = yield call(reqSample, payload);
      switch (payload.type) {
        case 'Edit':
          yield put({
            type: 'closeEdit',
          });
          break;
        case 'Create':
          // yield put({
          //     type: 'closeEdit',
          // });
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
