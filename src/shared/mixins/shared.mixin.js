export default {
  props: {
    id: { type: String, default: "" },
    reference: { type: String, default: "" },
    wrapperClass: { type: String, default: "" },
    tooltipWrapperClass: { type: String, default: "" },
  },
  data() {
    return {
      show: false,
    };
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
    processData() {
      throw new Error();
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function (options) {
        try {
          this.data = this.processData(options.rawData);
          this.show = true;
        } catch (e) {
          this.show = false;
        }
      },
    },
  },
};
