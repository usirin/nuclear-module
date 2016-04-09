import {
  INCREMENT,
  DECREMENT
} from '../actionTypes'

// instead of exporting a store instance, we are exporting a slightly different
// storeDefinition to be used to initialize a Nuclear.Store

export default {
  getInitialState() { return 0},
  initialize() {
    this.on(INCREMENT, increment)
    this.on(DECREMENT, decrement)
  }
}

const increment = (count) => count + 1
const decrement = (count) => count - 1

