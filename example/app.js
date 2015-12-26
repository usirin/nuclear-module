import { Reactor } from 'nuclear-js'
import CounterModule, { getters } from './counter'

const reactor = new Reactor
const { actions } = CounterModule(reactor)

// read via getters
reactor.evaluate(getters.count) // 1

actions.increment()
actions.increment()
actions.increment()

reactor.evaluate(getters.count) // 4

actions.decrement()
actions.decrement()

reactor.evaluate(getters.count) // 2
