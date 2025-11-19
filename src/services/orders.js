import api from './api'

export const ordersService = {
  create(orderData) {
    return api.post('/orders', orderData)
  },

  getById(id) {
    return api.get(`/orders/${id}`)
  },

  getHistory() {
    return api.get('/orders/history')
  },

  cancel(id) {
    return api.post(`/orders/${id}/cancel`)
  }
}
