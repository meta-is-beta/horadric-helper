<template>
  <div v-if="show" :class="classesComputed">
    <div v-if="displayMode === `showcase`" class="poe-passive-showcase-wrapper">
      <!-- Showcase -->
      <poe-passive-showcase
        :passive="passive"
        :iconUrl="iconUrl"
        :iconSize="_iconSize"
        :showIconInside="_iconInside"
        :showIconOutside="_iconOutside"
        :dimedSections="dimedSections"
        :showBorder="showBorder"
      />
    </div>
    <div v-else class="poe-passive-showcase-wrapper">
      <popover-wrapper
        :contentClasses="`poe-passive-showcase-popover`"
        :placement="_popoverPosition"
      >
        <template slot="content">
          <poe-passive-showcase
            :passive="passive"
            :iconUrl="iconUrl"
            :iconSize="_iconSize"
            :showIconInside="_iconInside"
            :showIconOutside="_iconOutside"
            :dimedSections="dimedSections"
            :showBorder="showBorder"
          />
        </template>
        <template slot="trigger">
          <!-- Icon -->
          <div v-if="displayMode === `icon`">
            <svg class="poe-item-stacks" v-if="shouldShowStacksOnIcon">
              <text x="2" y="18">{{ passive.stacks }}</text>
            </svg>
            <poe-passive-image
              :type="passive.type"
              :iconUrl="iconUrl"
              :iconSize="_iconSize"
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
        </template>
      </popover-wrapper>
    </div>
  </div>
</template>

<script>
import PoePassiveShowcase from "./fragments/poe-passive-showcase.vue";
import PoePassiveImage from "./fragments/poe-passive-image.vue";
import PopoverWrapper from "../popover-wrapper.vue";
import entityMixin from "./../../mixins/entity.mixin";

export default {
  name: "PoePassive",
  mixins: [entityMixin],
  components: { PoePassiveShowcase, PoePassiveImage, PopoverWrapper },
  computed: {
    passive() {
      return this.data;
    },
    classesComputed() {
      let classes = `poe-passive-showcase ${this._classes}`;

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
      return `poe-showcase-popover poe-passive-showcase-popover ${this._popoverClasses}`;
    },
  },
};
</script>

<style lang="scss">
@use "./../../_styles" as styles;

.poe-passive-showcase-popover {
  isolation: isolate;
  z-index: 3;

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
