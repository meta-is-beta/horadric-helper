<template>
  <div v-if="show" class="poe-item-showcase">
    <div
      v-if="displayMode.toLowerCase() === `showcase`"
      :class="wrapperClassesComputed"
    >
      <!-- Showcase -->
      <poe-item-showcase
        :item="item"
        :iconUrl="iconSrc"
        :showIcon="showIconInShowcase"
        :iconSize="computedIconSize"
        :dimedSections="dimedSections"
      />
    </div>
    <div v-else :class="wrapperClassesComputed">
      <v-popover
        trigger="hover"
        placement="auto"
        :offset="20"
        :popoverClass="popoverClassesComputed"
        :popoverWrapperClass="popoverWrapperClasses"
        :popoverBaseClass="popoverBaseClasses"
        :popoverInnerClass="popoverInnerClasses"
        :popoverArrowClass="popoverArrowClasses"
      >
        <template slot="popover">
          <poe-item-showcase
            :item="item"
            :iconUrl="iconSrc"
            :showIcon="showIconInShowcase"
            :iconSize="computedIconSize"
            :dimedSections="dimedSections"
          />
        </template>
        <!-- Icon -->
        <div v-if="displayMode.toLowerCase() === `icon`">
          <img :width="computedIconSize" :src="iconSrc" />
          <div class="poe-showcase-label">
            {{ labelTextComputed }}
          </div>
        </div>
        <!-- Text -->
        <div v-else :class="linkClassesComputed">{{ labelTextComputed }}</div>
      </v-popover>
    </div>
  </div>
</template>

<script>
import PoeItemShowcase from "./poe-item-showcase.vue";
import processRawData from "./item-data-processor/item-data-processor.ts";
import mainMixin from "@/shared/mixins/main.mixin";

export default {
  name: "PoeItem",
  components: {
    PoeItemShowcase,
  },
  props: {
    iconSize: { type: String, default: "auto" },
  },
  mixins: [mainMixin],
  methods: {
    getIconSize(size) {
      if (size === "auto") {
        switch (this.item.type) {
          case "Equipment":
            return 100;
          case "Flask":
            return 50;
          case "Gem":
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
    item() {
      return this.showcaseData;
    },
    wrapperClassesComputed() {
      return `poe-item-showcase-wrapper ${this.wrapperClass}`;
    },
    popoverClassesComputed() {
      return `poe-item-showcase-popover ${this.tooltipWrapperClass}`;
    },
    labelTextComputed() {
      return this.labelText ? this.labelText : this.item ? this.item.name : "";
    },
    linkClassesComputed() {
      let classes = `item-link`;
      if (this.item.rarity) {
        classes += ` item-link-${this.item.rarity.toLowerCase()}`;
      }
      return classes;
    },
    computedIconSize() {
      return this.getIconSize(this.iconSize);
    },
  },
  showcaseMetadata: {
    type: "poe-item",
    processRawData,
  },
};
</script>

<style lang="scss">
@use "./../../_styles" as styles;

.poe-item-showcase-popover {
  box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.poe-item-showcase,
.poe-item-showcase-popover {
  @include styles.font;
  @include styles.colors;
  display: inline-block;
  .item-link-unique {
    color: var(--poe-color-unique);
  }
  .item-link-rare {
    color: var(--poe-color-rare);
  }
  .item-link-magic {
    color: var(--poe-color-magic);
  }
  .item-link-normal {
    color: var(--poe-color-normal);
  }
  .item-link-gem {
    color: var(--poe-color-gem);
  }
  .poe-item-showcase-wrapper {
    display: flex;
  }
}
</style>
