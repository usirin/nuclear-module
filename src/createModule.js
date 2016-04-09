import { Store as DefaultStore } from 'nuclear-js'
import each from 'lodash.foreach'
import mapValues from 'lodash.mapvalues'
import invariant from 'invariant'

export default function createModule(name, { stores = {}, actions = {}, getters = {}, StoreFactory } = {}) {

  invariant(
    'string' === typeof name,
    'createModule(): You must provide a valid name as first argument.'
  )

  const Factory = (reactor) => {
    StoreFactory = StoreFactory || DefaultStore

    let evaluate = reactor.evaluate.bind(reactor)
    let dispatch = reactor.dispatch.bind(reactor)
    let observe = reactor.observe.bind(reactor)
    let registerStores = reactor.registerStores.bind(reactor)

    const realStores = createStores(stores, StoreFactory, evaluate)
    const realGetters = createGetters(getters, { evaluate })
    const realActions = createActions(actions, { dispatch, evaluate })
    const realObservers = createObservers(getters, { observe })

    registerStores(realStores)

    return {
      name: name,
      getters: realGetters,
      actions: realActions,
      observers: realObservers
    }
  }

  Factory.getters = getters
  Factory.actions = actions

  return Factory
}

function createStores(stores, StoreFactory, evaluate) {
  let realStores = {}

  each(stores, (store, name) => {
    if (evaluate([name])) {
      return
    }
    realStores[name] = StoreFactory(store)
  })

  return realStores
}

// fooModule.getters.foo()
// => will return evaluated value
function createGetters(getters, { evaluate }) {
  return mapValues(getters, getter => (transform = identity) => transform(evaluate(getter)))
}

// fooModule.observers.foo(foo => console.log('foo changed %s', foo))
function createObservers(getters, { observe }) {
  return mapValues(getters, getter => handler => observe(getter, handler))
}

function createActions(actions, { dispatch, evaluate }) {
  return mapValues(actions, action => action({ dispatch, evaluate }))
}


const identity = (x) => x

