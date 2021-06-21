<template>
  <img
    loading="lazy"
    :class="classes"
    :width="computedIconSize"
    height="auto"
    :src="this.iconUrl"
  />
</template>

<script>
export default {
  name: "PoeItemImage",
  props: {
    type: { type: String, required: false },
    iconUrl: { type: String, required: true },
    iconSize: { type: String, default: "auto" },
    classes: { type: String, default: "" },
  },
  methods: {
    getIconSize(size) {
      if (size === "auto" && this.type) {
        switch (this.type.toLowerCase()) {
          case "equipment":
            return 100;
          case "flask":
            return 50;
          case "gem":
          default:
            return 50;
        }
      } else {
        switch (size) {
          case "sm":
            return 30;
          case "md":
          default:
            return 50;
          case "lg":
            return 80;
          case "xlg":
            return 100;
        }
      }
    },
  },
  computed: {
    computedIconSize() {
      return this.getIconSize(this.iconSize);
    },
  },
};
</script>
