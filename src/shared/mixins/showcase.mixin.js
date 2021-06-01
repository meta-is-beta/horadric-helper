export default {
  props: {
    iconUrl: { type: String, default: "" },
    iconSize: { type: String, default: "auto" },

    showIconInside: { type: Boolean, default: false },
    showIconOutside: { type: Boolean, default: false },

    dimedSections: { type: Object, default: () => {} },
    hiddenSections: { type: Object, default: () => {} },
  },
  computed: {
    shouldShowIconInside() {
      return this.showIconInside && this.iconUrl;
    },
    shouldShowIconOutside() {
      return this.showIconOutside && this.iconUrl;
    },
  },
  methods: {
    addDimedClass(sectionName, index, classes) {
      if (
        this.dimedSections[sectionName] &&
        (this.dimedSections[sectionName].includes("all") ||
          this.dimedSections[sectionName].includes((index + 1).toString()))
      ) {
        classes += " dimed-line";
      }

      return classes;
    },
    addHiddenClasses(sectionName, index, classes) {
      if (
        this.hiddenSections[sectionName] &&
        (this.hiddenSections[sectionName].includes("all") ||
          this.hiddenSections[sectionName].includes((index + 1).toString()))
      ) {
        classes += " hidden-line";
      }

      return classes;
    },
    sectionShouldBeFullyHidden(sectionName) {
      return (
        this.hiddenSections[sectionName] &&
        this.hiddenSections[sectionName].includes("all")
      );
    },
  },
};
