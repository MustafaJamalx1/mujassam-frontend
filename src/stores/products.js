import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    category: null,
    priceRange: null,
    searchQuery: ''
  })

  const filteredProducts = computed(() => {
    let result = products.value

    if (filters.value.category) {
      result = result.filter(p => p.category === filters.value.category)
    }

    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    if (filters.value.priceRange) {
      const [min, max] = filters.value.priceRange
      result = result.filter(p => p.price >= min && p.price <= max)
    }

    return result
  })

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/products')
      // products.value = response.data

      // Placeholder data for development
      products.value = []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      // TODO: Replace with actual API call
      categories.value = []
    } catch (err) {
      error.value = err.message
    }
  }

  function setFilter(key, value) {
    filters.value[key] = value
  }

  function clearFilters() {
    filters.value = {
      category: null,
      priceRange: null,
      searchQuery: ''
    }
  }

  function getProductById(id) {
    return products.value.find(p => p.id === id)
  }

  return {
    products,
    categories,
    loading,
    error,
    filters,
    filteredProducts,
    fetchProducts,
    fetchCategories,
    setFilter,
    clearFilters,
    getProductById
  }
})
