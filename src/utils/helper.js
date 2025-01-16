import axiosInstance, { customIstance } from "../service/axiosInstance"

export const determineInstance = (type) => {
    switch (type) {
      case 'sftp':
        return axiosInstance
      case 'custom':
        return customIstance
      default:
        return axiosInstance
    }
  }
  