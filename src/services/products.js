import api from './api'

export const productsService = {
  getAll(params = {}) {
    return api.get('/products', { params })
  },

  getById(id) {
    return api.get(`/products/${id}`)
  },

  getCategories() {
    return api.get('/products/categories')
  },

  search(query) {
    return api.get('/products/search', { params: { q: query } })
  }
}
