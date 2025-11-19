import api from './api'

export const uploadService = {
  uploadFile(file, onProgress) {
    const formData = new FormData()
    formData.append('file', file)

    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percent)
        }
      }
    })
  },

  getAnalysis(uploadId) {
    return api.get(`/upload/${uploadId}/analysis`)
  },

  getQuote(uploadId, options) {
    return api.post(`/upload/${uploadId}/quote`, options)
  }
}
