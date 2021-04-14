export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    popoverWrapperClasses() {
      return "horadric-helper-wrapper";
    },
    popoverBaseClasses() {
      return "horadric-helper-tooltip horadric-helper-popover";
    },
    popoverInnerClasses() {
      return "horadric-helper-tooltip-inner horadric-helper-popover-inner";
    },
    popoverArrowClasses() {
      return "horadric-helper-tooltip-arrow horadric-helper-popover-arrow";
    },
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
