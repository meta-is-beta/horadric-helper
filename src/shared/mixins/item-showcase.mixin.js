import defaultOptions from "@/shared/default-options/default-showcase-options";

export default {
  data: function () {
    return {
      options: { ...defaultOptions },
      item: {},
      showItem: false,
    };
  },
  props: {
    id: { type: String, default: "" },
    reference: { type: String, default: "" },
    wrapperClass: { type: String, default: "" },
    tooltipWrapperClass: { type: String, default: "" },
  },
  mounted() {
    this.registerShowcase();
  },
  methods: {
    applyOptions(options) {
      this.options = {
        ...this.options,
        ...options,
      };
    },
    registerShowcase() {
      window.itemShowcases = window.itemShowcases || {
        items: [],
        applyOptionsByReference(reference, options) {
          const items = window.itemShowcases.items[reference];
          if (!items) {
            return;
          }

          items.forEach((item) => {
            item.applyOptions(options);
          });
        },
        applyOptionsById(itemId, options) {
          const items = Object.values(window.itemShowcases.items);
          if (!items) {
            return;
          }

          const itemWithId = items.find((x) => x.id === itemId);
          if (!itemWithId) {
            return;
          }

          itemWithId.applyOptions(options);
        },
      };

      const itemObject = {
        instance: this,
        applyOptions: this.applyOptions,
        reference: this.reference,
        id: this.id,
      };

      if (window.itemShowcases.items[this.reference]) {
        window.itemShowcases.items[this.reference].push(itemObject);
      } else {
        window.itemShowcases.items[this.reference] = [itemObject];
      }
    },
    processItemData() {
      throw new Error();
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function (options) {
        try {
          this.item = this.processItemData(options.itemData);
          this.showItem = true;
        } catch (e) {
          this.showItem = false;
        }
      },
    },
  },
};
