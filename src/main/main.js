import PoeItem from "@/main/components/item/poe-item.vue";
import PoePassive from "@/main/components/passive/poe-passive.vue";
import Vue from "vue";
import vueCustomElement from "vue-custom-element";
import "./utils/register-global-object";

Vue.config.productionTip = false;

Vue.use(vueCustomElement);

Vue.customElement(`poe-item`, PoeItem);
Vue.customElement(`poe-passive`, PoePassive);
