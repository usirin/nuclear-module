# nuclear-module

An opiniated way of creating nuclear modules.

### What?

Assume that you want to create a counter module.

```bash
./counter
├── actionTypes.js
├── actions.js
├── getters.js
└── stores
    └── counter.js
```

There is not a specific way to bind this module into your reactor instance. `NuclearModule` tries to solve this problem by providing an easy way to export `nuclear-js` modules.

Let's build our counter example.

```js
// counter/actionTypes.js

module.exports = {
  'INCREMENT': 'INCREMENT',
  'DECREMENT': 'DECREMENT'
}
```

```js
// counter/actions.js

var actionTypes = require('./actionTypes')
module.exports = {
  // registered reactor instance will be injected/curried here.
  // removes the necessity of requiring a reactor singleton.
  increment: (reactor) {
    reactor.dispatch(actionTypes.INCREMENT)
  },
  decrement: (reactor) {
    reactor.dispatch(actionTypes.DECREMENT)
  }
}
```

```js
// counter/stores/counter.js

var actionTypes = require('../actionTypes')

// instead of exporting a store instance, we are exporting a slightly different
// storeDefinition to be used to initialize a Nuclear.Store

module.exports = {
  getInitialState() {
    return 0
  },
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
```

```js
// counter/getters.js

module.exports = {
  count: ['count']
}
```

So far we saw a different way of defining stores and their handlers, also, all
the actions has `reactor` instance as their first argument.

`NuclearModule` is the glue that combines them all together.

```js
// counter/index.js
// this is a new file we didn't use before.

NuclearModule = require('nuclear-module')

module.exports = NuclearModule({
  stores: {
    count: require('./stores/counter')
  },
  actions: require('./actions'),
  getters: require('./getters')
})

```

In any part of your app you can use it as following:

```js
import CounterModule from 'modules/counter'
let { actions } = CounterModule(reactor)

actions.increment()
expect(reactor.evaluate(CounterModule.getters.count)).toBe(2)

actions.decrement()
expect(reactor.evaluate(CounterModule.getters.count)).toBe(1)
```

## Install

```
npm install nuclear-module
```
