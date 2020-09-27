import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Vant UI组件 ,vant放在全局前面，全局可以覆盖vant样式css就不用加 !important
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

//全局样式加载
import './style/index.less'

//设置REM基准值(html标签字体大小)
import 'amfe-flexible';
//时间
import './utils/dayjs'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
