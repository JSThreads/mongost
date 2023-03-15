import { defineStore } from 'pinia'

export const loginPlaceholderStore = defineStore('loginplaceholder', {
  state: () => {
    return { username: '', password: '' }
  },
})