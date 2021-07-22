export default {
  props: {
    classes: { type: String, default: "" },
    popoverClasses: { type: String, default: "" },

    bordered: { type: Boolean, default: undefined },
    borderless: { type: Boolean, default: undefined },

    reference: { type: String, default: "" },

    labelText: { type: String, default: "" },
    iconSize: { type: String, default: "auto" },

    asIcon: { type: Boolean, default: false },
    asText: { type: Boolean, default: true },
    asShowcase: { type: Boolean, default: false },

    iconInside: { type: Boolean, default: false },
    iconOutside: { type: Boolean, default: false },

    dimSections: { type: String, default: "" },
    hideSections: { type: String, default: "" },

    showStacks: { type: Boolean, default: false },
    showStacksInLabel: { type: Boolean, default: false },
  },
  data() {
    return {
      show: false,
      data: {},
      iconUrl: "",
      extensions: {},
      popoverWrapperClasses: "horadric-helper-wrapper",
      popoverArrowClasses:
        "horadric-helper-tooltip-arrow horadric-helper-popover-arrow",
      popoverInnerClasses:
        "horadric-helper-tooltip-inner horadric-helper-popover-inner",
      popoverBaseClasses: "horadric-helper-tooltip horadric-helper-popover",
    };
  },
  computed: {
    displayMode() {
      if (this.asShowcase) {
        return "showcase";
      }
      if (this.asIcon) {
        return "icon";
      }
      if (this.asText) {
        return "text";
      }
      return "text";
    },
    dimedSections() {
      return getSelectedSections(this.dimSections);
    },
    hiddenSections() {
      return getSelectedSections(this.hideSections);
    },
    showCustomLabel() {
      return this.labelText.length > 0;
    },
    labelTextComputed() {
      let labelText = this.labelText
        ? this.labelText
        : this.data
        ? this.data.name
        : "";

      if (this.showStacksInLabel && this.data.stacks) {
        labelText = `(${this.data.stacks}x) ${labelText}`;
      }

      return labelText;
    },
    shouldShowStacksOnIcon() {
      return this.data.stacks && this.showStacks;
    },
    showBorder() {
      if (this.bordered !== undefined) {
        return true;
      }

      if (this.borderless !== undefined) {
        return false;
      }

      return this.displayMode === "showcase";
    },
  },
  beforeMount() {
    this.registerShowcase();
  },
  mounted() {
    this.setConfigFromReference(this.reference);
  },
  beforeDestroy() {
    this.unregisterShowcase();
  },
  methods: {
    setConfigFromReference(reference) {
      if (!reference) {
        return;
      }

      const hhObject = this.getGlobalObject();

      if (
        !hhObject ||
        !hhObject.showcases ||
        !hhObject.showcases[reference] ||
        !hhObject.showcases[reference].data ||
        !Object.keys(hhObject.showcases[reference].data).length
      ) {
        return;
      }

      this.applyConfig(hhObject.showcases[reference]);
    },
    applyConfig({ data, iconUrl, extensions }) {
      this.data = data;
      this.iconUrl = iconUrl;
      this.extensions = extensions;
      this.show = true;
    },
    registerShowcase() {
      const showcases = this.getGlobalObject().showcases;

      if (showcases[this.reference]) {
        showcases[this.reference].applyConfigCallbacks.push(this.applyConfig);
      } else {
        showcases[this.reference] = {
          applyConfigCallbacks: [this.applyConfig],
        };
      }
    },
    unregisterShowcase() {
      const hhObject = this.getGlobalObject();

      if (!hhObject) {
        return;
      }

      const showcases = hhObject.showcases;
      const reference = this.reference;

      if (!showcases || !showcases[reference]) {
        return;
      }

      const callbackIndex = showcases[reference].applyConfigCallbacks.indexOf(
        this.applyConfig
      );

      if (callbackIndex < 0) {
        return;
      }

      showcases[reference].applyConfigCallbacks.splice(callbackIndex, 1);

      if (showcases[reference].applyConfigCallbacks.length < 1) {
        delete showcases[reference];
      }
    },
  },
  watch: {
    reference: {
      immediate: false,
      handler: function (value) {
        this.setConfigFromReference(value);
      },
    },
  },
};

const getSelectedSections = (sectionsString) => {
  try {
    const sections = {};
    const sectionDirectives = sectionsString.split(";");
    sectionDirectives.forEach((directive) => {
      if (directive.includes(":")) {
        const directiveComponents = directive.split(":");
        const sectionName = directiveComponents[0];
        sections[sectionName] = directiveComponents[1].split(",");
      } else {
        sections[directive] = "all";
      }
    });

    return sections;
  } catch {
    return {};
  }
};
