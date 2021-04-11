<template>
  <div v-if="showItem" class="poe-item-showcase">
    <div
      v-if="options.displayMode.toLowerCase() === `showcase`"
      :class="wrapperClassesComputed"
    >
      <!-- Showcase -->
      <poe-item-showcase-tooltip
        v-if="showItem"
        :item="item"
        :imageUrl="options.imageUrl"
        :showImage="showTooltipImage"
        :imageSize="tooltipImageSize"
      />
    </div>
    <div v-else :class="wrapperClassesComputed">
      <v-popover
        trigger="hover"
        placement="auto"
        :offset="20"
        :popoverClass="popoverClassesComputed"
      >
        <template slot="popover">
          <poe-item-showcase-tooltip
            v-if="showItem"
            :item="item"
            :imageUrl="options.imageUrl"
            :showImage="showTooltipImage"
            :imageSize="tooltipImageSize"
          />
        </template>
        <!-- Icon -->
        <div v-if="options.displayMode.toLowerCase() === `icon`">
          <img :width="linkImageSize" :src="options.imageUrl" />
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
import PoeItemShowcaseTooltip from "./fragments/poe-item-showcase-tooltip.vue";
import processItemData from "@/path-of-exile/data-processors/poe-item-processor";
import itemShowacseMixin from "@/shared/mixins/item-showcase.mixin";

export default {
  name: "PoeItemShowcase",
  components: {
    PoeItemShowcaseTooltip,
  },
  mixins: [itemShowacseMixin],
  methods: {
    processItemData(rawDescription) {
      return processItemData(rawDescription);
    },
    getImageSize(size) {
      if (size === "auto") {
        switch (this.item.type) {
          case "Equipment":
            return 100;
          case "Flask":
            return 50;
          case "Gem":
            return 50;
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
    wrapperClassesComputed() {
      return `poe-item-showcase-wrapper ${this.wrapperClass}`;
    },
    popoverClassesComputed() {
      return `poe-item-showcase-popover ${this.tooltipWrapperClass}`;
    },
    labelTextComputed() {
      return this.options.labelText
        ? this.options.labelText
        : this.item
        ? this.item.name
        : "";
    },
    linkClassesComputed() {
      let classes = `${this.options.linkClasses} item-link`;
      if (this.item.rarity) {
        return (
          classes + ` item-link item-link-${this.item.rarity.toLowerCase()}`
        );
      }
      return classes;
    },
    showTooltipImage() {
      return this.options.showIconInShowcase;
    },
    linkImageSize() {
      return this.getImageSize(this.options.imageSize);
    },
    tooltipImageSize() {
      return this.getImageSize(this.options.imageSize);
    },
  },
};
</script>

<style lang="scss">
@use "./../_styles" as styles;
.poe-item-showcase-popover {
  box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.6);
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
