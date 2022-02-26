<template>
  <div :class="passiveWrapperClasses">
    <div />
    <img
      loading="lazy"
      :src="this.iconUrl"
      alt=" "
      @error="handleMissingImage"
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
  methods: {
    handleMissingImage(event) {
      event.target.src =
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      event.target.style.backgroundColor = "#0f0f0f";
    },
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

.poe-mastery-passive-icon-wrapper {
  & img {
    z-index: 1;
  }
  & div {
    content: url(../../assets/Mastery_frame.png);
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

.poe-atlas-basic-passive-icon-wrapper {
  & div {
    content: url(../../assets/Atlas_basic_passive_frame.png);
  }
}

.poe-atlas-notable-passive-icon-wrapper {
  & div {
    content: url(../../assets/Atlas_notable_passive_frame.png);
  }
}

.poe-keystone-passive-icon-wrapper {
  & div {
    width: 88px;
    content: url(../../assets/Keystone_passive_frame.png);
  }
  & img {
    height: 54px;
    width: 54px;
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
      width: 34px;
      margin: 8px;
    }
  }

  &.poe-notable-passive-icon-wrapper,
  &.poe-ascendancy-notable-passive-icon-wrapper {
    & div {
      width: 68px;
    }
    & img {
      height: 46px;
      width: 46px;
      margin: 11px;
    }
  }

  &.poe-atlas-notable-passive-icon-wrapper {
    & div {
      width: 58px;
    }
    & img {
      height: 30px;
      width: 30px;
      margin: 16px;
    }
  }

  &.poe-atlas-basic-passive-icon-wrapper {
    & div {
      width: 42px;
    }
    & img {
      height: 32px;
      width: 32px;
      margin: 8px;
    }
  }

  &.poe-keystone-passive-icon-wrapper {
    & div {
      width: 88px;
    }
    & img {
      height: 54px;
      width: 54px;
      margin: 18px;
    }
  }

  &.poe-mastery-passive-icon-wrapper {
    & div {
      width: 82px;
    }
    & img {
      height: 80px;
      width: 80px;
      margin: 2px;
    }
  }
}

.poe-passive-image-wrapper-size-sm {
  & div {
    width: 52px;
  }
  & img {
    height: 34px;
    width: 34px;
    margin: 8px;
  }
}

.poe-passive-image-wrapper-size-md {
  & div {
    width: 68px;
  }
  & img {
    height: 40px;
    width: 40px;
    margin: 12px;
  }
}

.poe-passive-image-wrapper-size-lg {
  & div {
    width: 88px;
  }
  & img {
    height: 54px;
    width: 54px;
    margin: 18px;
  }
}

.poe-passive-image-wrapper-size-xlg {
  & div {
    width: 116px;
  }
  & img {
    height: 76px;
    width: 76px;
    margin: 22px;
  }
}
</style>
