var Nuclear = require('nuclear-js')

var reactor = new Nuclear.Reactor

var CounterModule = require('./counter')(reactor)

var actions = CounterModule.actions
var getters = CounterModule.getters

// read via getters
reactor.evaluate(getters.count) // 1

actions.increment()
actions.increment()
actions.increment()

reactor.evaluate(getters.count) // 4

actions.decrement()
actions.decrement()

reactor.evaluate(getters.count) // 2
