import {
  INCREMENT,
  DECREMENT
} from '../actionTypes'

// instead of exporting a store instance, we are exporting a slightly different
// storeDefinition to be used to initialize a Nuclear.Store

export default {
  getInitialState() {
    return 0
  },
  handlers: [
    {
      type: INCREMENT,
      handler(state) {
        return state + 1
      }
    },
    {
      type: DECREMENT,
      handler(state) {
        return state - 1
      }
    }
  ]
}

