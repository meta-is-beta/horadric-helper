import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import VTooltip from "v-tooltip";
import Vue from "vue";
import "./../path-of-exile/register-global-object";
import Demo from "./Demo.vue";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(Demo),
}).$mount("#app");
