import {
  INCREMENT,
  DECREMENT
} from '../actionTypes'

// instead of exporting a store instance, we are exporting a store definition
// to be used to initialize a store.

export default {
  getInitialState() { return 0},
  initialize() {
    this.on(INCREMENT, increment)
    this.on(DECREMENT, decrement)
  }
}

const increment = (count) => count + 1
const decrement = (count) => count - 1

