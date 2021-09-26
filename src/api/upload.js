import request from '@/utils/request.js'

export const uploadImage = data => {
  return request.post('api/upload', data)
}
