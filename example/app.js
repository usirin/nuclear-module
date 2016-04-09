import { Reactor } from 'nuclear-js'
import CounterModule from './counter'

const reactor = new Reactor
const { actions, getters } = CounterModule(reactor)

// we can use named destructuring assignment to prevent name collisions since
// all `NuclearModule`s export an object with the same structure (e.g they all
// export an actions and a getters object)
const {
  actions: counterActions,
  getters: counterGetters,
  observers: counterObservers
} = CounterModule(reactor)

// getters we passed when creating the object is used to create functions which
// will automatically call evaluate on the reactor instance and return the
// result to you.
counterGetters.count() // 1

counterActions.increment()
counterActions.increment()
counterActions.increment()

counterGetters.count() // 4

counterActions.decrement()
counterActions.decrement()

counterGetters.count() // 2

// you can pass a transform function to the getter function modify result.
counterGetters.count(count => count * 10) // 20

// use observers to get updates for getters.
counterObservers.count(count => ReactDOM.render(<div>{count}</div>))


