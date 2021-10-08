import request from '@/utils/request.js'

const getImagesRequest = (confObj) => {
  return request.get('/api/image/list', { params: confObj })
}

const getTotalRequest = (flag) => {
  return request.get('/api/image/imageNumber', { params: { flag } })
}

const favorRequest = (imageId) => {
  return request.put(`/api/image/favor/${imageId}`)
}

const deleteRequest = (imageId) => {
  return request.delete(`/api/image/delete/${imageId}`)
}

export { getImagesRequest, getTotalRequest, favorRequest, deleteRequest }
