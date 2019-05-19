// Import Onsenui CSS
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import router from './router'
import storeLike from './store.js';
import VueOnsen from 'vue-onsenui';
import CustomToolbar from './partials/CustomToolbar.vue';
import Vuex from 'vuex';
import AppNavigator from './AppNavigator.vue';
//import onesignal from 'simple-onesignal';
//import push from 'push.js'
//push.create('Hello World')

Vue.use(VueOnsen);
Vue.use(Vuex);

Vue.component('custom-toolbar', CustomToolbar);
Vue.config.productionTip = false

//onesignal.configure('c1b1093f-a002-43fc-b63e-fa1f5eec4645');
//push.create('Hello World')

new Vue({
  router,
  store: new Vuex.Store(storeLike),
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }

  },
  render: h => h(AppNavigator),
}).$mount('#app')
