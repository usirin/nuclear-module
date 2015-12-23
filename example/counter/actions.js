var actionTypes = require('./actionTypes')

module.exports = {
  // registered reactor instance will be injected/curried here.
  // removes the necessity of requiring a reactor singleton.
  increment: (reactor) {
    reactor.dispatch(actionTypes.INCREMENT)
  },
  decrement: (reactor) {
    reactor.dispatch(actionTypes.DECREMENT)
  }
}

