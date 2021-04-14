import defaultOptions from "@/shared/default-options/default-node-options";
import { registerHoradricHelperGlobalObject } from "./mixing-methods";
import sharedMixin from "./shared.mixin";

export default {
  props: {
    id: { type: String, default: "" },
    reference: { type: String, default: "" },
    wrapperClass: { type: String, default: "" },
    tooltipWrapperClass: { type: String, default: "" },
  },
  mixins: [sharedMixin],
  data: function () {
    return {
      options: { ...defaultOptions },
      data: {},
    };
  },
  computed: {
    node() {
      return this.data;
    },
  },
  methods: {
    registerShowcase() {
      const horadricHelperObject = registerHoradricHelperGlobalObject();

      const nodeObject = {
        instance: this,
        applyOptions: this.applyOptions,
        reference: this.reference,
        id: this.id,
      };

      const nodes = horadricHelperObject.nodeShowcases.nodes;

      if (nodes[this.reference]) {
        nodes[this.reference].push(nodeObject);
      } else {
        nodes[this.reference] = [nodeObject];
      }
    },
  },
};
