import { createModule } from 'nuclear-module'

import * as actions from './actions'
import * as getters from './getters'
import * as stores from './stores'

export default createModule('counter', {
  stores, actions, getters
})
