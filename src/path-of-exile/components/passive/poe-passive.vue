<template>
  <div v-if="show" :class="classesComputed">
    <div v-if="displayMode === `showcase`" class="poe-passive-showcase-wrapper">
      <!-- Showcase -->
      <poe-passive-showcase
        :passive="passive"
        :iconUrl="iconSrc"
        :showIconInside="iconInside"
        :showIconOutside="iconOutside"
        :dimedSections="dimedSections"
      />
    </div>
    <div v-else class="poe-passive-showcase-wrapper">
      <v-popover
        trigger="hover click"
        placement="auto"
        :offset="20"
        hideOnTargetClick
        :popoverClass="popoverClassesComputed"
        :popoverWrapperClass="popoverWrapperClasses"
        :popoverBaseClass="popoverBaseClasses"
        :popoverInnerClass="popoverInnerClasses"
        :popoverArrowClass="popoverArrowClasses"
      >
        <template slot="popover">
          <poe-passive-showcase
            :passive="passive"
            :iconUrl="iconSrc"
            :showIconInside="iconInside"
            :showIconOutside="iconOutside"
            :dimedSections="dimedSections"
          />
        </template>
        <!-- Icon -->
        <div v-if="displayMode === `icon`">
          <poe-passive-image :type="passive.type" :iconUrl="iconSrc" />
          <div class="poe-showcase-label" v-if="!showCustomLabel">
            <div>{{ passive.name }}</div>
            <div class="poe-passive-showcase-passive-name">
              {{ passive.type }}
            </div>
          </div>
          <div class="poe-showcase-label" v-else>
            <div>
              {{ labelTextComputed }}
            </div>
          </div>
        </div>
        <!-- Text -->
        <div v-else class="poe-passive-link">
          <div>{{ labelTextComputed }}</div>
        </div>
      </v-popover>
    </div>
  </div>
</template>

<script>
import PoePassiveShowcase from "./poe-passive-showcase.vue";
import PoePassiveImage from "./poe-passive-image.vue";
import mainMixin from "@/shared/mixins/main.mixin";

export default {
  name: "PoePassive",
  mixins: [mainMixin],
  components: { PoePassiveShowcase, PoePassiveImage },
  computed: {
    passive() {
      return this.showcaseData;
    },
    classesComputed() {
      let classes = `poe-passive-showcase ${this.classes}`;

      switch (this.displayMode) {
        case "showcase":
          classes += " poe-passive-display-showcase";
          break;
        case "icon":
          classes += " poe-passive-display-icon";
          break;
        case "text":
        default:
          classes += " poe-passive-display-text";
          break;
      }

      return classes;
    },
    popoverClassesComputed() {
      return `poe-passive-showcase-popover ${this.popoverClasses}`;
    },
    showCustomLabel() {
      return this.labelText.length > 0;
    },
    labelTextComputed() {
      return this.labelText
        ? this.labelText
        : this.passive
        ? this.passive.name
        : "";
    },
  },
  showcaseMetadata: {
    type: "poe-passive",
  },
};
</script>

<style lang="scss">
@use "./../../_styles" as styles;

.poe-passive-showcase-popover {
  z-index: 10000;
  .poe-passive-wrapper {
    background-color: black;
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  }
}

.poe-passive-showcase-popover,
.poe-passive-showcase {
  @include styles.font;
  @include styles.colors;

  .poe-passive-showcase-passive-name {
    line-height: 12px;
    font-size: 12px;
  }
  .poe-passive-link {
    color: var(--poe-color-passive-title);
  }
}
</style>
