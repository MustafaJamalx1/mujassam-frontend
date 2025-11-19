import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  function notify(message, type = 'info', duration = 3000) {
    const id = Date.now()
    notifications.value.push({ id, message, type })

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  function remove(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function success(message, duration) {
    return notify(message, 'success', duration)
  }

  function error(message, duration) {
    return notify(message, 'error', duration)
  }

  function warning(message, duration) {
    return notify(message, 'warning', duration)
  }

  return {
    notifications,
    notify,
    remove,
    success,
    error,
    warning
  }
}
