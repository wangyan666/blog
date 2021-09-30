import request from '@/utils/request.js'

const getImagesRequest = (id) => {
  return request.get('/api/image/list', { params: { id } })
}

export { getImagesRequest }
