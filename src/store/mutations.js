import {
   ADD_COUNTER,
   ADD_TO_CART,
   CHANGE_TESTBOOLEAN,
} from './mutaion-types'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [CHANGE_TESTBOOLEAN](state, payload) {
    state.testBoolean = payload
  }
}