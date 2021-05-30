<template>
  <div :class="passiveWrapperClasses">
    <div />
    <img :src="this.iconUrl" />
  </div>
</template>

<script>
export default {
  name: "PoePassiveImage",
  props: {
    type: { type: String, required: true },
    iconUrl: { type: String, required: true },
  },
  computed: {
    passiveIconClasses() {
      return `poe-passive-icon poe-${this.type
        .replace(" ", "-")
        .toLowerCase()}-passive-icon`;
    },
    passiveWrapperClasses() {
      return `poe-passive-image-wrapper poe-${this.type
        .replace(" ", "-")
        .toLowerCase()}-passive-icon-wrapper`;
    },
  },
};
</script>

<style lang="scss">
.poe-passive-image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

.poe-basic-passive-icon-wrapper {
  & div {
    width: 52px;
    content: url(../../assets/Basic_passive_frame.png);
  }
  & img {
    height: 34px;
    margin: 8px;
  }
}

.poe-ascendancy-basic-passive-icon-wrapper {
  & div {
    width: 52px;
    content: url(../../assets/Ascendancy_basic_passive_frame.png);
  }
  & img {
    height: 34px;
    margin: 8px;
  }
}

.poe-notable-passive-icon-wrapper {
  & div {
    width: 68px;
    content: url(../../assets/Notable_passive_frame.png);
  }
  & img {
    height: 40px;
    margin: 12px;
  }
}
.poe-ascendancy-notable-passive-icon-wrapper {
  & div {
    width: 68px;
    content: url(../../assets/Ascendancy_notable_passive_frame.png);
  }
  & img {
    height: 40px;
    margin: 12px;
  }
}

.poe-keystone-passive-icon-wrapper {
  & div {
    width: 88px;
    content: url(../../assets/Keystone_passive_frame.png);
  }
  & img {
    height: 54px;
    margin: 18px;
  }
}
</style>
