<template>
  <div v-if="show" :class="classesComputed">
    <div v-if="displayMode === `showcase`" class="poe-item-showcase-wrapper">
      <!-- Showcase -->
      <poe-item-showcase
        :item="item"
        :iconUrl="iconSrc"
        :showIconInside="iconInShowcase"
        :showIconOutside="iconBesideShowcase"
        :iconSize="computedIconSize"
        :dimedSections="dimedSections"
        :hiddenSections="hiddenSections"
      />
    </div>
    <div v-else class="poe-item-showcase-wrapper">
      <v-popover
        trigger="hover click"
        placement="auto"
        :offset="5"
        hideOnTargetClick
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
            :showIconInside="iconInShowcase"
            :showIconOutside="iconBesideShowcase"
            :iconSize="computedIconSize"
            :dimedSections="dimedSections"
            :hiddenSections="hiddenSections"
          />
        </template>
        <!-- Icon -->
        <div v-if="displayMode === `icon`">
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
    classesComputed() {
      let classes = `poe-item-showcase ${this.classes}`;

      switch (this.displayMode) {
        case "showcase":
          classes += " poe-item-display-showcase";
          break;
        case "icon":
          classes += " poe-item-display-icon";
          break;
        case "text":
        default:
          classes += " poe-item-display-text";
          break;
      }

      return classes;
    },
    popoverClassesComputed() {
      return `poe-item-showcase-popover ${this.popoverClasses}`;
    },
    labelTextComputed() {
      return this.labelText ? this.labelText : this.item ? this.item.name : "";
    },
    linkClassesComputed() {
      let classes = `poe-item-link`;
      if (this.item.rarity) {
        classes += ` poe-item-link-${this.item.rarity.toLowerCase()}`;
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
  z-index: 10000;

  .poe-item-wrapper {
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  }
}

.poe-item-showcase,
.poe-item-showcase-popover {
  @include styles.font;
  @include styles.colors;
  display: inline-block;
  .poe-item-link-unique {
    color: var(--poe-color-unique);
  }
  .poe-item-link-rare {
    color: var(--poe-color-rare);
  }
  .poe-item-link-magic {
    color: var(--poe-color-magic);
  }
  .poe-item-link-normal {
    color: var(--poe-color-normal);
  }
  .poe-item-link-gem {
    color: var(--poe-color-gem);
  }
  .poe-item-showcase-wrapper {
    display: flex;
  }
}
</style>
