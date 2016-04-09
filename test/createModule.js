import expect from 'expect'
import { Reactor } from 'nuclear-js'

import { createModule } from '../src'

describe('createModule()', () => {
  it('should throw when there is no name', () => {
    expect(() => createModule()).toThrow(
      /createModule\(\)\: You must provide a valid name as first argument\./
    )
  })

  it('should accept store definitions to create and register stores', () => {
    const Counter = createModule('Counter', {
      stores: {
        counter: {
          getInitialState() { return 0 },
        }
      }
    })

    const reactor = new Reactor
    const counter = Counter(reactor)

    expect(reactor.evaluate(['counter'])).toBe(0)
  })

  it('should have actions with dispatch and evaluate bounded to it', () => {

    const Counter = createModule('Counter', {
      stores: {
        counter: {
          getInitialState() { return 0 },
          initialize() { this.on('INCREMENT', state => state + 1) }
        }
      },
      actions: {
        increment: ({dispatch, evaluate}) => () => {
          // calling evaluate to trigger spy
          evaluate(['foo'])
          dispatch('INCREMENT')
        }
      }
    })

    const reactor = new Reactor

    const evaluateSpy = expect.spyOn(reactor, 'evaluate').andCallThrough()
    const dispatchSpy = expect.spyOn(reactor, 'dispatch').andCallThrough()

    const counter = Counter(reactor)

    counter.actions.increment()
    expect(evaluateSpy).toHaveBeenCalledWith(['foo'])
    expect(dispatchSpy).toHaveBeenCalledWith('INCREMENT')

    expect(reactor.evaluate(['counter'])).toBe(1)
  })

  it('should have getters with evaluate bound to it', () => {
    const Counter = createModule('Counter', {
      stores: {
        counter: {
          getInitialState() { return 0 },
          initialize() { this.on('INCREMENT', state => state + 1) }
        }
      },
      actions: {
        increment: ({dispatch, evaluate}) => () => dispatch('INCREMENT')
      },
      getters: {
        count: ['counter']
      }
    })

    const reactor = new Reactor
    const counter = Counter(reactor)

    expect(counter.getters.count()).toBe(0)
    counter.actions.increment()
    expect(counter.getters.count()).toBe(1)

    expect(counter.getters.count(x => x * 3)).toBe(3)
  })

  it('should have observers with observe bound to it', () => {
    const Counter = createModule('Counter', {
      stores: {
        counter: {
          getInitialState() { return 0 },
          initialize() { this.on('INCREMENT', state => state + 1) }
        }
      },
      actions: {
        increment: ({dispatch, evaluate}) => () => dispatch('INCREMENT')
      },
      getters: {
        count: ['counter']
      }
    })

    const reactor = new Reactor
    const counter = Counter(reactor)

    let arr = []

    counter.observers.count(x => arr.push(x))

    counter.actions.increment()
    counter.actions.increment()
    counter.actions.increment()

    expect(arr).toEqual([1, 2, 3])
  })
})
