<template>
  <div :class="nodeIconClasses">
    <img :style="`background-image: url(${this.iconUrl})`" />
  </div>
</template>

<script>
export default {
  name: "PoeNodeImage",
  props: {
    type: { type: String, required: true },
    iconUrl: { type: String, required: true },
  },
  computed: {
    nodeIconClasses() {
      return `poe-node-icon poe-${this.type
        .replace(" ", "-")
        .toLowerCase()}-node-icon`;
    },
  },
};
</script>

<style lang="scss">
.poe-node-icon {
  &.poe-basic-node-icon,
  &.poe-ascendancy-basic-node-icon {
    & img {
      background-size: 34px;
      background-position-x: 13px;
      background-position-y: 13px;
      background-repeat: no-repeat;
      width: 62px;
    }
  }

  &.poe-basic-node-icon img {
    content: url(../../assets/Basic_passive_frame.png);
  }
  &.poe-ascendancy-basic-node-icon img {
    content: url(../../assets/Ascendancy_basic_passive_frame.png);
  }

  &.poe-notable-node-icon,
  &.poe-ascendancy-notable-node-icon {
    & img {
      background-position-x: 14px;
      background-position-y: 14px;
      background-repeat: no-repeat;
      background-size: 47px;
      width: 75px;
    }
  }
  &.poe-notable-node-icon img {
    content: url(../../assets/Notable_passive_frame.png);
  }
  &.poe-ascendancy-notable-node-icon img {
    content: url(../../assets/Ascendancy_notable_passive_frame.png);
  }

  &.poe-keystone-node-icon {
    & img {
      content: url(../../assets/Keystone_passive_frame.png);
      background-position-x: 18px;
      background-position-y: 18px;
      background-repeat: no-repeat;
      background-size: 52px;
      width: 90px;
    }
  }
}
</style>
