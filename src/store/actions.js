import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECKED
}from './mutation-types'
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      // 1.查找之间数组中是否有该参数
        let OldProduct = context.state.cartList.find(item=>item.iid === payload.iid)
        // 2.判断OldProduct进行添加或count加一操作 
        if(OldProduct){
          context.commit(ADD_COUNTER,OldProduct);
          resolve('当前的商品数量+1');
        }else{
          payload.count = 1;
          context.commit(ADD_TO_CART,payload);
          resolve('添加了新的商品');
        }
      
    })
  },
  changeChecked(context,payload){
    let Product = context.state.cartList.find(item=>item.iid === payload.iid)
    if(Product){
      context.commit(CHANGE_CHECKED,Product);
    }
  }
}