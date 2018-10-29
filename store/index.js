import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'
const createStore = () => {
  return new Vuex.Store( {
    state,
    getters,
    actions,
    mutations
  } )
}
export default createStore
