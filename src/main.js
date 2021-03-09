import Vue from 'vue'
import App from './App'
import moment from 'moment'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  return moment(value.toString()).format('MM/DD/YYYY hh:mm')
})

new Vue({
  render: h => h(App),
}).$mount('#app')
