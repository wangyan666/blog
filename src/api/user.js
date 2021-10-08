import request from '@/utils/request.js'

const getUserInfoRequest = () => {
  return request.get('api/user/userInfo')
}

const updateUserProfile = (profile) => {
  return request.post('api/user/profile', { profile: profile })
}

export { getUserInfoRequest, updateUserProfile }
