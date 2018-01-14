const menuData = [
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [{
      name: '登录',
      path: 'login',
    }, {
      name: '注册',
      path: 'register',
    }, {
      name: '注册结果',
      path: 'register-result',
    }],
  },
  {
    name: '天天惠',
    icon: 'user',
    path: 'daysgoods',
    authority: 'user',
    children: [{
      name: '1001|波段计划管理',
      path: 'wave-plan-manager',
      authority: 'user',
    }, {
      name: '1004|样衣照片列表',
      path: 'audition-list',
    }, {
      name: '1005|样衣照片批量审核',
      path: 'audition-pic-verify',
    }, {
      name: '1006|样衣海选发布',
      path: 'audition-publish',
    }, {
      name: '1008|样衣照片海选列表',
      path: 'audition－pic-list',
    }, {
      name: '1007|样衣照片海选',
      path: 'audition－pic',
    }, {
      name: '1009|样衣照片决策',
      path: 'audition－pic-chosen',
    }, {
      name: '1010|样衣初选单列表',
      path: 'audition-start-list',
    }, {
      name: '1012|样衣初选收货',
      path: 'audition-start-recieve',
    }, {
      name: '1013|样衣一审打分',
      path: 'audition-first-score',
    }, {
      name: '1014|样衣一审决策',
      path: 'audition-first-chosen',
    }, {
      name: '1019|样板二审提交',
      path: 'audition-second-submit',
    }, {
      name: '1020|样板二审审批',
      path: 'audition-second-verify',
    }],
  }];

export function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: item.authority || parentAuthority || 'user',
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
