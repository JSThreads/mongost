import { defineStore } from 'pinia'

export const loginPasswordStore = defineStore('loginpassword', {
  state: () => {
    return { visibility: 'visibility', type: 'password' }
  },
  actions: {
    toggle() {
        this.visibility == 'visibility' ? [this.visibility, this.type] = ['visibility_off', 'text'] : [this.visibility, this.type] = ['visibility', 'password'];
    },
  },
})