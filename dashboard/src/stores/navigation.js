import { defineStore } from 'pinia'

export const navigationStore = defineStore('navigation', {
  state: () => {
    return { active: false }
  },
  actions: {
    toggle() {
      this.active = !this.active;
    },
  },
})