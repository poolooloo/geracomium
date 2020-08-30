import types from '@/store/mutations-type'

export default {
  [types.UPDATE_USER_STATE]() { },
  [types.SET_PIE_DATA](state, payload) {
    state.pieDatum = payload
    console.log(state, 'SET_PIE_DATA')
  },
  [types.SET_LIQUID_FILL](state, payload) {
    state.liquidFill = payload
    console.log(state, 'SET_LIQUID_FILL')
  }
}