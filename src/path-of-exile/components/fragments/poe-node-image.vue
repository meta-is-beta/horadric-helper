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
      return `node-icon ${this.type.toLowerCase()}-node-icon`;
    },
  },
};
</script>

<style lang="scss">
.node-icon {
  &.basic-node-icon {
    & img {
      content: url(../../../assets/poe/Basic_passive_frame.png);
      background-size: 35px;
      background-position-x: 14px;
      background-position-y: 14px;
      background-repeat: no-repeat;
      width: 62px;
    }
  }
  &.notable-node-icon {
    & img {
      content: url(../../../assets/poe/Notable_passive_frame.png);
      background-position-x: 14px;
      background-position-y: 14px;
      background-repeat: no-repeat;
      background-size: 47px;
      width: 75px;
    }
  }
  &.keystone-node-icon {
    & img {
      content: url(../../../assets/poe/Keystone_passive_frame.png);
      background-position-x: 18px;
      background-position-y: 18px;
      background-repeat: no-repeat;
      background-size: 52px;
      width: 90px;
    }
  }
}
</style>
