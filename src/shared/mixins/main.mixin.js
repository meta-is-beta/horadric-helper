export default {
  props: {
    classes: { type: String, default: "" },
    popoverClasses: { type: String, default: "" },

    reference: { type: String, default: "" },

    labelText: { type: String, default: "" },

    asIcon: { type: Boolean, default: false },
    asText: { type: Boolean, default: true },
    asShowcase: { type: Boolean, default: false },

    iconInShowcase: { type: Boolean, default: false },
    iconBesideShowcase: { type: Boolean, default: false },

    dimSections: { type: String, default: "" },
    hideSections: { type: String, default: "" },
  },
  data() {
    return {
      show: false,
      showcaseData: {},
      iconSrc: "",
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
  },
  mounted() {
    this.registerShowcase();
  },
  beforeDestroy() {
    this.unregisterShowcase();
  },
  watch: {
    reference: {
      immediate: true,
      handler: function (value) {
        if (!value) {
          return;
        }

        const hhObject = window.HoradricHelper;
        const reference = value.replaceAll(" ", "-");

        if (
          !hhObject ||
          !hhObject.showcases ||
          !hhObject.showcases[reference] ||
          !hhObject.showcases[reference].showcaseData ||
          !Object.keys(hhObject.showcases[reference].showcaseData).length
        ) {
          return;
        }

        this.applyConfig(
          hhObject.showcases[reference].showcaseData,
          hhObject.showcases[reference].iconSrc
        );
      },
    },
  },
  methods: {
    applyConfig(showcaseData, iconSrc) {
      this.showcaseData = showcaseData;
      this.iconSrc = iconSrc;
      this.show = true;
    },
    registerShowcase() {
      const hhObject = registerHoradricHelperGlobalObject();
      const showcases = hhObject.showcases;
      const reference = this.reference.replaceAll(" ", "-");

      if (showcases[reference]) {
        showcases[reference].applyConfigCallbacks.push(this.applyConfig);
      } else {
        showcases[reference] = {
          showcaseData: {},
          applyConfigCallbacks: [this.applyConfig],
          ...this.$options.showcaseMetadata,
        };
      }
    },
    unregisterShowcase() {
      const hhObject = window.HoradricHelper;

      if (!hhObject) {
        return;
      }

      const showcases = hhObject.showcases;
      const reference = this.reference.replaceAll(" ", "-");

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
};

const getSelectedSections = (sectionsString) => {
  if (!sectionsString || sectionsString.length === 0) {
    return {};
  }
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

const registerHoradricHelperGlobalObject = () => {
  window.HoradricHelper = window.HoradricHelper || {
    showcases: {},
    applyConfig(config) {
      if (Array.isArray(config)) {
        applyConfigFromArray(config);
      } else {
        applyConfigFromObject(config);
      }
    },
  };

  return window.HoradricHelper;
};

const applyConfigFromArray = (configArray) => {
  configArray.forEach((configObject) => applyConfigFromObject(configObject));
};

const applyConfigFromObject = ({ reference, rawData, dataObject, iconSrc }) => {
  reference = reference.replaceAll(" ", "-");
  const referencedShowcase = window.HoradricHelper.showcases[reference];

  if (!referencedShowcase) {
    return;
  }

  if (rawData) {
    if (!referencedShowcase.processRawData) {
      throw new Error(
        `Raw data processor is not plemented for showcase of type "${referencedShowcase.type}"`
      );
    }
    referencedShowcase.showcaseData = referencedShowcase.processRawData(
      rawData
    );
  } else if (dataObject) {
    if (!referencedShowcase.processDataObject) {
      referencedShowcase.processDataObject = (data) => data;
    }
    referencedShowcase.showcaseData = referencedShowcase.processDataObject(
      dataObject
    );
  } else {
    throw new Error("Showcase data not provided");
  }

  referencedShowcase.iconSrc = iconSrc;

  referencedShowcase.applyConfigCallbacks.forEach((callback) => {
    if (!callback || typeof callback !== "function") {
      return;
    }
    try {
      callback(referencedShowcase.showcaseData, iconSrc);
    } catch {
      // no-op
    }
  });
};
