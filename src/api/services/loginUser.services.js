import { post } from '@/api/request'

// 自动登录
export const home = (token) => {
  return post('/', {
    token
  })
}

// 密码登录接口
export const login = (form) => {
  return post('/login', form)
}

// 短信登录接口
export const loginforphone = (form) => {
  return post('/loginforphone', form)
}

// 更新用户信息接口
export const updateInfo = (fome) => {
  return post('/center/updateInfo', fome)
}

// 更新用户密码
export const updateUserPwd = (username, { oldPwd, newPwd }, token) => {
  return post('/center/updatePwd', {
    username,
    oldPwd,
    newPwd,
    token
  })
}

// 注册接口
export const register = (form) => {
  return post('/register', form)
}
