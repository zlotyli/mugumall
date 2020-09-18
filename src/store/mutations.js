import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECKED
}from './mutation-types'
export default{
  // mutation唯一的目的就是修改state中的状态 
  // mutation中的每一个方法尽可能完成的事情比较单一一点
  // 已有该商品，将其count属性加一
  [ADD_COUNTER](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    // 在准备推入之前，为商品添加一checked属性，使购物车中商品一开始处于被选中的状态
    payload.checked = true;

    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state,payload){
    payload.checked = !payload.checked;
  }
}