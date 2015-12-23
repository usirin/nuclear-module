var actionTypes = require('../actionTypes')

// instead of exporting a store instance, we are exporting a slightly different
// storeDefinition to be used to initialize a Nuclear.Store

module.exports = {
  name: 'counter',
  handlers: [
    {
      type: actionTypes.INCREMENT,
      handler: function(state) {
        return state + 1
      }
    },
    {
      type: actionTypes.DECREMENT,
      handler: function(state) {
        return state - 1
      }
    }
  ]
}

