export default {
  props: {
    displayMode: { type: String, default: "icon" },
    labelText: { type: String, default: "" },
    showIconInShowcase: { type: Boolean, default: false },
  },
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
  },
  watch: {
    options: {
      immediate: false,
      handler: function ({ data }) {
        if (data) {
          this.data = data;
          this.show = true;
        } else {
          this.data = {};
          this.show = false;
        }
      },
    },
  },
};
