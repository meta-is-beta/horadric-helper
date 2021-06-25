<template>
  <div v-if="show" :class="classesComputed">
    <div v-if="displayMode === `showcase`" class="poe-passive-showcase-wrapper">
      <!-- Showcase -->
      <poe-passive-showcase
        :passive="passive"
        :iconUrl="iconUrl"
        :iconSize="iconSize"
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
            :iconUrl="iconUrl"
            :iconSize="iconSize"
            :showIconInside="iconInside"
            :showIconOutside="iconOutside"
            :dimedSections="dimedSections"
          />
        </template>
        <!-- Icon -->
        <div v-if="displayMode === `icon`">
          <svg class="poe-item-stacks" v-if="shouldShowStacksOnIcon">
            <text x="2" y="18">{{ passive.stacks }}</text>
          </svg>
          <poe-passive-image
            :type="passive.type"
            :iconUrl="iconUrl"
            :iconSize="iconSize"
          />
          <div class="poe-icon-label" v-if="!showCustomLabel">
            <div>{{ labelTextComputed }}</div>
            <div class="poe-icon-sublabel">
              {{ passive.type }}
            </div>
          </div>
          <div class="poe-icon-label" v-else>
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
import poeEntityMixin from "./../mixins/poe-entity.mixin";

export default {
  name: "PoePassive",
  mixins: [mainMixin, poeEntityMixin],
  components: { PoePassiveShowcase, PoePassiveImage },
  computed: {
    passive() {
      return this.data;
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

.poe-passive-showcase {
  .poe-item-stacks {
    transform: translate(-36px, 0px);
  }
}

.poe-passive-showcase-popover,
.poe-passive-showcase {
  @include styles.font;
  @include styles.colors;

  .poe-passive-link {
    color: var(--poe-color-passive-title);
  }
}
</style>
