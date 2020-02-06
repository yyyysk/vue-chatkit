import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueChatScroll from 'vue-chat-scroll'

import App from './App.vue'
import router from './router'
import store from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/loading.css'
import './assets/css/loading-btn.css'

// 使うプラグインの設定?
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueChatScroll)

// routerとstoreを渡して一つのvueコンポーネントを生成?
// id=appのDOMとしてbodyにマウント的な?
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
