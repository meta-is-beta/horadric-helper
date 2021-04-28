export default {
  props: {
    reference: { type: String, default: "" },
    wrapperClass: { type: String, default: "" },
    tooltipWrapperClass: { type: String, default: "" },
    displayMode: { type: String, default: "icon" },
    labelText: { type: String, default: "" },
    showIconInShowcase: { type: Boolean, default: false },
  },
  data() {
    return {
      show: false,
      showcaseData: {},
      iconSrc: "",
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
    registerShowcase() {
      const horadricHelperObject = registerHoradricHelperGlobalObject();
      const showcases = horadricHelperObject.showcases;
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
    applyConfig(showcaseData, iconSrc) {
      this.showcaseData = showcaseData;
      this.iconSrc = iconSrc;
      this.show = true;
    },
  },
};

const registerHoradricHelperGlobalObject = () => {
  window.HoradricHelper = window.HoradricHelper || {
    showcases: {},
    applyConfig(reference, config) {
      reference = reference.replaceAll(" ", "-");
      const referencedShowcase = window.HoradricHelper.showcases[reference];
      if (!referencedShowcase) {
        return;
      }

      if (config.rawData) {
        if (!referencedShowcase.processRawData) {
          throw new Error(
            `Raw data processor is not plemented for showcase of type "${referencedShowcase.type}"`
          );
        }
        referencedShowcase.showcaseData = referencedShowcase.processRawData(
          config.rawData
        );
      } else if (config.dataObject) {
        if (!referencedShowcase.processDataObject) {
          referencedShowcase.processDataObject = (data) => data;
        }
        referencedShowcase.showcaseData = referencedShowcase.processDataObject(
          config.dataObject
        );
      } else {
        throw new Error("Showcase data not provided");
      }

      referencedShowcase.applyConfigCallbacks.forEach((callback) => {
        try {
          callback(referencedShowcase.showcaseData, config.iconSrc);
        } catch {
          //no-op
        }
      });
    },
  };

  return window.HoradricHelper;
};
