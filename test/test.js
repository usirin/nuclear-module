var expect = require('expect')
var Nuclear = require('nuclear-js')

var NuclearModule = require('../src')

// we are gonna slowly build a counter module.

describe('NuclearModule', function() {
  describe('#constructor', function() {
    it('registers nuclear stores to given reactor', function() {
      var CounterModule = NuclearModule({
        stores: {
          counter: {
            getInitialState: () => 1
          }
        }
      })

      var reactor = new Nuclear.Reactor

      var counter = CounterModule(reactor)

      expect(reactor.evaluate(['counter'])).toBe(1)

    })

    it('returns an object containing bound actions', function() {
      var expectedReactor = null

      var CounterModule = NuclearModule({
        stores: {
          counter: {
            getInitialState: () => 1
          }
        },
        actions: {
          increment: function(reactor) {
            expectedReactor = reactor
          }
        }
      })

      var reactor = new Nuclear.Reactor
      var counter = CounterModule(reactor)

      counter.actions.increment()

      expect(expectedReactor).toBe(reactor)
    })

    it('registers handlers from store definition', function() {
      var CounterModule = NuclearModule({
        stores: {
          count: {
            getInitialState() { return 1 },
            handlers: [{
              type: 'INCREMENT',
              handler: (state) => state + 1
            }]
          }
        },
        actions: {
          increment: (reactor) => reactor.dispatch('INCREMENT')
        }
      })

      var reactor = new Nuclear.Reactor
      var counter = CounterModule(reactor)

      counter.actions.increment()

      expect(reactor.evaluate(['count'])).toBe(2)
    })

    it('exports getters', function() {

      var CounterModule = NuclearModule({
        stores: {
          count: {
            getInitialState() { return 1 },
            handlers: [{
              type: 'INCREMENT',
              handler: (state) => state + 1
            }]
          }
        },
        actions: {
          increment: (reactor) => reactor.dispatch('INCREMENT')
        },
        getters: {
          count: ['count']
        }
      })

      var reactor = new Nuclear.Reactor
      var counter = CounterModule(reactor)

      expect(reactor.evaluate(CounterModule.getters.count)).toBe(1)

      // let's duplicate to have an end-to-end test :)

      counter.actions.increment()
      counter.actions.increment()

      expect(reactor.evaluate(CounterModule.getters.count)).toBe(3)
    })

  })
})
