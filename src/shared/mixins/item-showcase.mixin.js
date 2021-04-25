import defaultOptions from "@/shared/default-options/default-showcase-options";
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
        items[this.reference].itemList.push(itemObject);
      } else {
        items[this.reference] = {
          itemData: {},
          itemList: [itemObject],
          ...this.showcaseMetadata,
        };
      }
    },
  },
};
