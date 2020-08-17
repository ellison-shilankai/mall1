import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_TESTBOOLEAN,
} from './mutaion-types'
// import * as types from '@/store/mutation-types';
export default {
  addCart(context, payload) {
    // payload新添加商品
    let oldProduct = null;
    for (let item of context.state.cartList){
      if (item.iid === payload.iid) {
        oldProduct = item;
      }
    }
    //let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct
    if(oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload)
    }
  },
  changeStatus(context, payload){
    context.commit(CHANGE_TESTBOOLEAN, payload)
  }
}
// export const changeStatus = ({ commit }, { isLoading }) => {
//   commit(CHANGE_TESTBOOLEAN, { isLoading });
// };
