import defaultOptions from "@/shared/default-options/default-showcase-options";
import { registerHoradricHelperGlobalObject } from "./mixing-methods";
import sharedMixin from "./shared.mixin";

export default {
  mixins: [sharedMixin],
  data: function () {
    return {
      options: { ...defaultOptions },
    };
  },
  computed: {
    item() {
      return this.data;
    },
  },
  methods: {
    registerShowcase() {
      const horadricHelperObject = registerHoradricHelperGlobalObject();

      const itemObject = {
        instance: this,
        applyOptions: this.applyOptions,
        reference: this.reference,
        id: this.id,
      };

      const items = horadricHelperObject.itemShowcases.items;

      if (items[this.reference]) {
        items[this.reference].push(itemObject);
      } else {
        items[this.reference] = [itemObject];
      }
    },
  },
};
