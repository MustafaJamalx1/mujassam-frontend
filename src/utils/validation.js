export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidPhone(phone) {
  const re = /^\+?[\d\s-]{10,}$/
  return re.test(phone)
}

export function isValid3DFile(filename) {
  const validExtensions = ['.stl', '.obj', '.3mf']
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'))
  return validExtensions.includes(ext)
}

export function required(value) {
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'string') return value.trim().length > 0
  return value !== null && value !== undefined
}

export function minLength(value, min) {
  return value && value.length >= min
}

export function maxLength(value, max) {
  return !value || value.length <= max
}
