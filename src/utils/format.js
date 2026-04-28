function getLocale() {
  return localStorage.getItem('mujassam-locale') || 'en'
}

export function formatPrice(price, currency = 'USD') {
  const locale = getLocale() === 'ar' ? 'ar-SA' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function formatDate(date, options = {}) {
  const locale = getLocale() === 'ar' ? 'ar-SA' : 'en-US'
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }).format(new Date(date))
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatDimensions(dimensions) {
  const { width, height, depth } = dimensions
  return `${width} × ${height} × ${depth} mm`
}
