import { post } from '@/api/request'

// 关系数据接口
export const getRelationData = () => {
  return post('/getRelationData')
}