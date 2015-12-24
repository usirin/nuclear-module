var NuclearModule = require('../../index')

module.exports = NuclearModule({
  stores: {
    count: require('./stores/counter')
  },
  actions: require('./actions'),
  getters: require('./getters')
})
