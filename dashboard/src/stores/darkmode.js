import { defineStore } from 'pinia'

export const darkmodeStore = defineStore('darkmode', {
  state: () => {
    return { darkmode: false }
  },
  actions: {
    toggle() {
        this.darkmode = !this.darkmode;
    },
  },
})