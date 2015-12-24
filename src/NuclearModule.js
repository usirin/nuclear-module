import { Store } from 'nuclear-js'
import expect from 'expect'
import omit from 'lodash.omit'
import isArray from 'lodash.isarray'
import each from 'lodash.foreach'
import reduce from 'lodash.reduce'

export default function NuclearModule({ stores = {}, actions = {}, getters = {} }) {
  return (reactor, StoreFactory = Store) => {

    let _stores = reduce(stores, (acc, storeDefinition, storeName) => {
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
