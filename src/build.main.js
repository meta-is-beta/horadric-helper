import Vue from "vue";
import PoeItemShowcase from "@/path-of-exile/components/poe-item-showcase.vue";
import PoeNodeShowcase from "@/path-of-exile/components/poe-node-showcase.vue";

import VTooltip from "v-tooltip";
import vueCustomElement from "vue-custom-element";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(vueCustomElement);

Vue.customElement("poe-item-showcase", PoeItemShowcase);
Vue.customElement("poe-node-showcase", PoeNodeShowcase);
