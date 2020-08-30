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
  },
  [types.SET_DISEASE](state, payload) {
    state.diseaseDatum = payload
    console.log(state, 'SET_DISEASE')
  },
  [types.SET_AGE_DATA](state, payload) {
    state.ageDatum = payload
    console.log(state, 'SET_AGE_DATA')
  }
}