export default {
  addCart(state, payload) {
    let oldProduct = state.cartList.find(item => item.iid === payload.iid);
    if(oldProduct) {
      oldProduct.count++;
    } else {
      state.cartList.push(payload);
    }
  }
}
