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

export default {
  'INCREMENT': 'INCREMENT',
  'DECREMENT': 'DECREMENT'
}
```

```js
// counter/actions.js
import actionTypes from './actionTypes'

import { INCREMENT, DECREMENT } from './actionTypes'

// dispatch and evaluate functions are injected for you.
export const increment = ({ dispatch, evaluate }) => () => dispatch(INCREMENT)
export const decrement = ({ dispatch, evaluate }) => () => dispatch(DECREMENT)
```

```js
// counter/stores/counter.js

import { INCREMENT, DECREMENT } from '../actionTypes'

// instead of exporting a store instance, we are exporting a store definition
// to be used to initialize a store.

export default {
  getInitialState() { return 0},
  initialize() {
    this.on(INCREMENT, increment)
    this.on(DECREMENT, decrement)
  }
}

const increment = (count) => count + 1
const decrement = (count) => count - 1
```

```js
// counter/getters.js

export default {
  count: ['count']
}
```

So far we didn't initialize our store handlers, just wrote a definition to initialize one.
Also actions are different in a way that they need to accept `dispatch` and
`evaluate` functions and return the real action itself.

`NuclearModule` is the glue that combines them all together.

```js
// counter/index.js
// this is a new file we didn't use before.

import { createModule } from 'nuclear-module'

import counter from './stores'
import * as actions from './actions'
import * as getters from './getters'

export default createModule('counter', {
  stores: {
    count: counter
  },
  actions: actions,
  getters: getters,
})
```

In any part of your app you can use it as following:

```js
import { Reactor } from 'nuclear-js'
import CounterModule from './counter'

const reactor = new Reactor

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
```

## Install

```
npm install nuclear-module
```
