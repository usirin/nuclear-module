import NuclearModule from 'nuclear-module'

module.exports = NuclearModule({
  stores: {
    count: require('./stores/counter')
  },
  actions: require('./actions'),
  getters: require('./getters')
})
