import request from '@/utils/request.js'

export const updateAvatar = data => {
  return request.post('api/upload/AvatarImages', data)
}
