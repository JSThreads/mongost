/* HOW does the update of the database works
   SS
   1. We add a async listener for changes in the database
   2. On change we broadcast the information
   CS
   1. We create a connection to a Websocket  
   2. We update the databases stores in pinia
*/

import { defineStore } from 'pinia'

export const databasesStore = defineStore('databases', {
  state: () => {
    return {  }
  },
  actions: {
  },
})