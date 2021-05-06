export default {
  props: {
    iconUrl: { type: String, default: "" },
    showIcon: { type: Boolean, default: false },
    dimedSections: { type: Object, default: () => {} },
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
