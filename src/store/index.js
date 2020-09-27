import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'   //本地存储

Vue.use(Vuex)

const USER_KEY='user'
export default new Vuex.Store({
  state: {
    //user:JSON.parse(window.localStorage.getItem('user')) //当前用户登录状态(token数据)
    user:getItem(USER_KEY),
    cachePages:['LayoutIndex']
  },
  mutations: {
    setUser(state,data){
      state.user=data
      //为了数据持久化保存在state，不至于页面刷新数据丢失，要将数据本地存储
      //window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(USER_KEY,state.user)
    },

    // 添加缓存 
    addcachePages(state,pageName){
      if(!state.cachePages.includes(pageName)){
        state.cachePages.push(pageName)
      }
    },
    // 移出缓存
    removecachePages(state,pageName){
      const index=state.cachePages.indexOf(pageName)
      if(index!==-1){
        state.cachePages.splice(index,1)
      }
    }
  },
  actions: {
  },
  modules: {

  }
})
