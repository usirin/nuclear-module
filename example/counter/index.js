var NuclearModule = require('../../index')

module.exports = NuclearModule({
  stores: [
    require('./stores/counter')
  ],
  actions: require('./actions'),
  getters: require('./getters')
})
