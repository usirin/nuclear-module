import { Store } from 'nuclear-js'
import expect from 'expect'
import omit from 'lodash.omit'
import isArray from 'lodash.isarray'
import each from 'lodash.foreach'
import reduce from 'lodash.reduce'

export default function NuclearModule(options) {
  let stores = options.stores || {}
  let actions = options.actions || {}
  let getters = options.getters || {}

  return function(reactor, StoreFactory) {
    StoreFactory = StoreFactory || Store

    let _stores = stores.reduce((acc, store) => {
      let storeName = store.name
      let storeDefinition = omit(store, 'name')

      if (reactor.evaluate([storeName])) {
        // TODO: Show a warning unless `debug/dev` mode.
        return
      }

      let handlers = storeDefinition.handlers || {}

      storeDefinition = {
        ...omit(storeDefinition, 'handlers'),
        initialize() {
          each(handlers, ({ type, handler }) => {
            this.on(type, handler)
          })
        }
      }

      return {
        ...acc,
        [storeName]: StoreFactory(storeDefinition)
      }
    }, {})

    reactor.registerStores(_stores)

    return {
      getters: getters,
      actions: createActions(reactor, actions)
    }
  }
}

function createActions(reactor, actions) {
  return reduce(actions, (result, action, actionName) => {
    return {
      ...result,
      [actionName]: action.bind(null, reactor)
    }
  }, {})
}
