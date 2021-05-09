export default {
  props: {
    iconUrl: { type: String, default: "" },
    showIconInside: { type: Boolean, default: false },
    showIconOutside: { type: Boolean, default: false },
    dimedSections: { type: Object, default: () => {} },
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
  },
};
