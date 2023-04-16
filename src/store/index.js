import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
//1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}
//2.创建实例
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store
