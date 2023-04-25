import { post } from '../request'
// 后台首页数据接口
export const getAllData = () => {
  return post('/getAllData')
}

// 请求用户数据接口
export const getAllUser = (uid, token) => {
  return post('/getAllUser', {
    uid,
    token
  })
}

// 添加用户接口
export const register = (form) => {
  return post('/register', form)
}

// 后台修改用户信息接口
export const updataInfoByAdmin = (
  token,
  adminId,
  adminPwd,
  adminUser,
  {
    email,
    password,
    phone,
    role,
    uid,
    username
  }
) => {
  return post('updataInfoByAdmin', {
    email,
    password,
    phone,
    role,
    uid,
    username,
    token,
    adminId,
    adminPwd,
    adminUser
  })
}

// 删除用户接口
export const deleteUser = (uid) => {
  return post('/deleteUser', { uid })
}

// 回收站删除板块接口
export const removeFromRecycle = (sid, pid) => {
  return post('removeFromRecycle', { sid, pid })
}
// 回收站得到板块接口
export const getAllRecycle = () => {
  return post('getAllRecycle')
}
// 回收恢复帖子接口
export const recover = (sid, pid) => {
  return post('recover', { sid, pid })
}

// 删除板块接口
export const delectSection = (sid) => {
  return post('delectSection', { sid })
}

// 添加板块接口
export const addSection = (row) => {
  return post('addSection', row)
}

// 获取所有板块信息接口
export const getAllSection = () => {
  return post('getAllSections')
}

// 获取所有帖子息接口
export const getAllPost = () => {
  return post('getAllPost')
}
// 帖子修改接口
export const updatePost = (row) => {
  return post('updatePost', row)
}

// 删除帖子接口
export const goToRecycle = (sid, pid) => {
  return post('goToRecycle', { sid, pid })
}
// 取消帖子接口
export const noneRecycle = (uid, pid) => {
  return post('noneRecycle', { uid, pid })
}
