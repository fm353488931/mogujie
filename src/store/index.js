import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCounter(state,payload){
      payload.count++;
    },
    addToCart(state,payload){
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct){
          context.commit('addCounter',oldProduct)
          resolve('当前商品数量+1')
        }else{
          payload.count = 1
          context.commit('addToCart',payload)
          resolve('添加了新的商品')
        }
      })
    }
  },
  modules: {
  }
})
