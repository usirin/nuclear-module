var Nuclear = require('nuclear-js')
var expect = require('expect')
var omit = require('lodash.omit')
var assign = require('lodash.assign')
var isArray = require('lodash.isarray')
var each = require('lodash.foreach')

var NuclearModule = function(options) {
  var stores = options.stores || {}
  var actions = options.actions || {}
  var getters = options.getters || {}

  return function(reactor, StoreFactory) {
    StoreFactory = StoreFactory || Nuclear.Store

    var _stores = stores.reduce(function(acc, store) {
      var storeName = store.name
      var storeDefinition = omit(store, 'name')

      if (reactor.evaluate([storeName])) {
        return
      }

      var handlers = storeDefinition.handlers || {}

      storeDefinition = assign({}, omit(storeDefinition, 'handlers'), {
        initialize: function initialize() {
          var self = this
          each(handlers, function(handler) {
            var actionType = handler.type
            self.on(actionType, handler.handler)
          })
        }
      })

      acc[storeName] = StoreFactory(storeDefinition)

      return acc
    }, {})

    reactor.registerStores(_stores)

    return {
      getters: getters,
      actions: createActions(reactor, actions)
    }
  }
}

module.exports = NuclearModule

function createActions(reactor, actions) {
  var _actions = {}
  each(actions, function(action, actionName) {
    _actions[actionName] = action.bind(null, reactor)
  })
  return _actions
}
