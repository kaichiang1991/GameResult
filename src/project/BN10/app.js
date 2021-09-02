import Vue from 'vue'
// import router from '@/router'
import store from '@/store'
import i18n from '@/lang'
import App from './app.vue'

Vue.config.productionTip = false

// Element-UI
import { DatePicker, Input, Button, Icon } from 'element-ui';
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);

new Vue({
  // router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')