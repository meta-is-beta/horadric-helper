<template>
  <img
    loading="lazy"
    :class="classes"
    :width="computedIconSize"
    height="auto"
    :src="this.iconUrl"
    alt=" "
    onerror="this.style.display='none'"
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
      if (size === "auto") {
        return "auto";
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

<style lang="scss">
.poe-item-div-card-icon {
  content: url(../../../assets/Divination_card_icon.png);
}
</style>
