import PoeItem from "@/path-of-exile/components/item/poe-item.vue";
import PoeNode from "@/path-of-exile/components/node/poe-node.vue";
import VTooltip from "v-tooltip";
import Vue from "vue";
import vueCustomElement from "vue-custom-element";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(vueCustomElement);

let prefix = process.env.VUE_APP_WEB_COMPONENT_PREFIX
  ? `${process.env.VUE_APP_WEB_COMPONENT_PREFIX}-`
  : "";

Vue.customElement(`${prefix}poe-item`, PoeItem);
Vue.customElement(`${prefix}poe-node`, PoeNode);
