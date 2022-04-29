import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import "./../main/utils/register-global-object";
import Demo from "./Demo.vue";
import Vue2TouchEvents from "vue2-touch-events";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vue2TouchEvents);

new Vue({
  render: (h) => h(Demo),
}).$mount("#app");
