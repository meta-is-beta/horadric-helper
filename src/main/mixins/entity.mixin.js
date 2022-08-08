const mainProps = {
  reference: { type: String, default: "" },

  classes: { type: String, default: "" },

  popoverClasses: { type: String, default: "" },

  bordered: {
    type: [Boolean, String],
    default: undefined,
    exclusive: ["borderless"],
  },
  borderless: {
    type: [Boolean, String],
    default: undefined,
    exclusive: ["bordered"],
  },

  labelText: { type: String, default: "" },

  iconSize: { type: String, default: "auto" },

  asIcon: {
    type: [Boolean, String],
    default: false,
    exclusive: ["asShowcase", "asText"],
  },
  asText: {
    type: [Boolean, String],
    default: true,
    exclusive: ["asIcon", "asShowcase"],
  },
  asShowcase: {
    type: [Boolean, String],
    default: false,
    exclusive: ["asIcon", "asText"],
  },

  iconInside: { type: [Boolean, String], default: false },
  iconOutside: { type: [Boolean, String], default: false },

  dimSections: { type: String, default: "" },
  hideSections: { type: String, default: "" },

  showStacks: { type: [Boolean, String], default: false },
  showStacksInLabel: { type: [Boolean, String], default: false },

  popoverPosition: { type: String, default: `auto` },

  showSockets: { type: [Boolean, String], default: false },
  showSocketsInShowcase: { type: [Boolean, String], default: false },
};

const createGettersForProps = function (props) {
  return Object.keys(props).reduce((acc, propKey) => {
    acc[`_${propKey}`] = function () {
      const explicitPropValue = this.$options.propsData[propKey];
      const baseProp = props[propKey];

      // If prop was explicitly set
      if (explicitPropValue !== undefined) {
        // Handle native HTML string attributes that should be parsed as boolean
        if (
          typeof explicitPropValue === "string" &&
          Array.isArray(baseProp.type) &&
          baseProp.type.includes(Boolean)
        ) {
          // Interpret empty string as true
          if (explicitPropValue.length === 0) {
            return true;
          } else {
            // Interpret any string other than "false" as true
            return explicitPropValue.toLowerCase() !== "false";
          }
        }

        return explicitPropValue;
      }

      // If default value was overriten with defaults object
      // but not if provided value is exclusive with other explicitly set values
      const globalObject = this.getGlobalObject();
      if (
        globalObject.defaults &&
        globalObject.defaults[propKey] &&
        (!baseProp.exclusive ||
          !baseProp.exclusive.some((p) => this.$options.propsData[p]))
      ) {
        return globalObject.defaults[propKey];
      }

      // Otherwise use default value or undefined
      return baseProp.default;
    };

    return acc;
  }, {});
};

export default {
  data() {
    return {
      show: false,
      data: {},
      iconUrl: "",
      extensions: {},
    };
  },
  props: {
    ...mainProps,
  },
  computed: {
    ...createGettersForProps(mainProps),
    displayMode() {
      if (this._asShowcase) {
        return "showcase";
      }
      if (this._asIcon) {
        return "icon";
      }
      if (this._asText) {
        return "text";
      }
      return "text";
    },
    dimedSections() {
      return getSelectedSections(this._dimSections);
    },
    hiddenSections() {
      return getSelectedSections(this._hideSections);
    },
    showCustomLabel() {
      return this._labelText.length > 0;
    },
    labelTextComputed() {
      let labelText = this._labelText
        ? this._labelText
        : this.data
        ? this.data.name
        : "";

      if (this._showStacksInLabel && this.data.stacks) {
        labelText = `(${this.data.stacks}x) ${labelText}`;
      }

      return labelText;
    },
    shouldShowStacksOnIcon() {
      return this.data.stacks && this._showStacks;
    },
    stacks() {
      const _stacks = this.data.stacks;
      if (!_stacks) {
        return "";
      }

      if (!isNaN(_stacks)) {
        return _stacks;
      }

      const stacksMatch = _stacks.match(/([0-9]+)\/[0-9]+/);

      if (stacksMatch.length > 0) {
        return stacksMatch[1];
      }

      return "";
    },
    showBorder() {
      if (this._borderless !== undefined) {
        return false;
      }

      if (this._bordered !== undefined) {
        return true;
      }

      return true;
    },
  },
  beforeMount() {
    this.registerShowcase();
  },
  mounted() {
    this.setConfigFromReference(this._reference);
  },
  beforeDestroy() {
    this.unregisterShowcase();
  },
  methods: {
    getGlobalObject() {
      return (
        window?.HoradricHelper?.PathOfExile || {
          HoradricHelper: {
            PathOfExile: {
              showcases: {},
              defaults: {},
            },
          },
        }
      );
    },
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

      if (showcases[this._reference]) {
        showcases[this._reference].applyConfigCallbacks.push(this.applyConfig);
      } else {
        showcases[this._reference] = {
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
      const reference = this._reference;

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
