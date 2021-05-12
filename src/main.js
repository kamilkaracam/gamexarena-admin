// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'




// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import VueMoment from 'vue-moment'
import router from '@/router'
import store from '@/store'
import currency from 'v-currency-field'
import Croppa from 'vue-croppa'
import 'v-currency-field/dist/index.css'
import 'vue-croppa/dist/vue-croppa.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueMoment);

Vue.use(currency)
Vue.use(Croppa)
// Sync store with router
sync(store, router)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


