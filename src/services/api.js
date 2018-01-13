import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function accountLogin(params) {
  return request('http://120.78.136.225:20001/Scm/Account/AntLogin', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


/////////////////////////////new api/////////////////////////////
/**
 * 登录接口
 * @param {*} params 
 */
export async function accountLogin(params) {
  return request('Scm/Account/AntLogin?username='+params.userName + '&password=' + params.password, {
    method: 'GET',
    // body: params,
  });
}
/**
 * 获取字典接口
 */
export async function paramesGetBand() {
  return request('scm/Dict/GetBand', {
    method: 'GET',
  });
}

/**
 * 获取年份接口
 */
export async function paramesGetBandYear() {
  return request('scm/Dict/GetBandYear', {
    method: 'GET',
  });
}
  
/**
 * 获取类别接口
 */
export async function paramesGetCategory() {
  return request('scm/Dict/GetCategory', {
    method: 'GET',
  });
}
  
/**
 * 获取店铺接口
 */
export async function paramesGetShop() {
  return request('scm/Dict/GetShop', {
    method: 'GET',
  });
}

/**
 * 获取打分项接口
 */
export async function paramesGetScoreItem() {
  return request('scm/Dict/GetGetScoreItemShop', {
    method: 'GET',
  });
}

  
/**
 * 获取供应商接口
 */
export async function paramesGetVender() {
  return request('scm/Dict/GetVender', {
    method: 'GET',
  });
}
  