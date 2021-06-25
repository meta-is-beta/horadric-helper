<template>
  <div :class="passiveWrapperClasses">
    <div />
    <img
      loading="lazy"
      :src="this.iconUrl"
      alt=" "
      onerror="this.style.display='none'"
    />
  </div>
</template>

<script>
export default {
  name: "PoePassiveImage",
  props: {
    type: { type: String, required: true },
    iconUrl: { type: String, required: true },
    iconSize: { type: String, default: "auto" },
  },
  computed: {
    passiveWrapperClasses() {
      const passiveType = this.type.replace(" ", "-").toLowerCase();

      return `
      poe-passive-image-wrapper
      poe-${passiveType}-passive-icon-wrapper
      poe-passive-image-wrapper-size-${this.iconSize}
      `;
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
    content: url(../../assets/Basic_passive_frame.png);
  }
}

.poe-ascendancy-basic-passive-icon-wrapper {
  & div {
    content: url(../../assets/Ascendancy_basic_passive_frame.png);
  }
}

.poe-notable-passive-icon-wrapper {
  & div {
    content: url(../../assets/Notable_passive_frame.png);
  }
}

.poe-ascendancy-notable-passive-icon-wrapper {
  & div {
    content: url(../../assets/Ascendancy_notable_passive_frame.png);
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

.poe-passive-image-wrapper-size-auto {
  &.poe-basic-passive-icon-wrapper,
  &.poe-ascendancy-basic-passive-icon-wrapper {
    & div {
      width: 52px;
    }
    & img {
      height: 34px;
      margin: 8px;
    }
  }

  &.poe-notable-passive-icon-wrapper,
  &.poe-ascendancy-notable-passive-icon-wrapper {
    & div {
      width: 68px;
    }
    & img {
      height: 40px;
      margin: 14px;
    }
  }

  &.poe-keystone-passive-icon-wrapper {
    & div {
      width: 88px;
    }
    & img {
      height: 54px;
      margin: 18px;
    }
  }
}

.poe-passive-image-wrapper-size-sm {
  & div {
    width: 52px;
  }
  & img {
    height: 34px;
    margin: 8px;
  }
}

.poe-passive-image-wrapper-size-md {
  & div {
    width: 68px;
  }
  & img {
    height: 40px;
    margin: 12px;
  }
}

.poe-passive-image-wrapper-size-lg {
  & div {
    width: 88px;
  }
  & img {
    height: 54px;
    margin: 18px;
  }
}

.poe-passive-image-wrapper-size-xlg {
  & div {
    width: 116px;
  }
  & img {
    height: 76px;
    margin: 22px;
  }
}
</style>
