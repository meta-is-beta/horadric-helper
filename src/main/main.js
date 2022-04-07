import PoeItem from "@/path-of-exile/components/item/poe-item.vue";
import PoePassive from "@/path-of-exile/components/passive/poe-passive.vue";
import Vue from "vue";
import vueCustomElement from "vue-custom-element";
import "./register-global-object";

Vue.config.productionTip = false;

Vue.use(vueCustomElement);

Vue.customElement(`poe-item`, PoeItem);
Vue.customElement(`poe-passive`, PoePassive);
