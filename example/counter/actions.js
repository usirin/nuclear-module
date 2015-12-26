import {
  INCREMENT,
  DECREMENT
} from '../actionTypes'

// registered reactor instance will be injected/curried to each actions.
// removes the necessity of requiring a reactor singleton.
export default {
  increment(reactor) {
    reactor.dispatch(INCREMENT)
  },
  decrement(reactor) {
    reactor.dispatch(DECREMENT)
  }
}

