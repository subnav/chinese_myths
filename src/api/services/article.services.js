import { post, get } from '../request'
// 搜索文章接口
export const search = (text) => {
  return post('/search', { text })
}

// 获取用户帖子接口
export const Posts = (uid) => {
  return post('/post', { uid })
}

// 帖子详细接口
export const section = (sid, pid, form) => {
  return post(`section/${sid}/${pid}`, form)
}

// 板块接口
export const plate = (sid, form) => {
  return post(`section/${sid}`, form)
}

// 发布帖子接口
export const foren = (form) => {
  return post('foren', form)
}

// 获取所有板块接口
export const getAllSection = (form) => {
  return post('getAllSection', form)
}

// 获取文章接口
export const sendMessage = (form) => {
  return post('sendMessage', form)
}
