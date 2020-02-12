export default {
  addCart({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit('addCart', payload)
      resolve('添加购物车成功')
    })
  }
}
