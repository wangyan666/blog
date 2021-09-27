import request from '@/utils/request.js'

const deleteBlog = (id) => {
  return request.delete('/api/blog/delete', { params: { id } })
}

export { deleteBlog }
