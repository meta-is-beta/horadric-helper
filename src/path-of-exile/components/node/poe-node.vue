<template>
  <div v-if="show" :class="classesComputed">
    <div v-if="displayMode === `showcase`" class="poe-node-showcase-wrapper">
      <!-- Showcase -->
      <poe-node-showcase
        :node="node"
        :iconUrl="iconSrc"
        :showIconInside="iconInside"
        :showIconOutside="iconOutside"
        :dimedSections="dimedSections"
      />
    </div>
    <div v-else class="poe-node-showcase-wrapper">
      <v-popover
        trigger="hover click"
        placement="auto"
        hideOnTargetClick
        :popoverClass="popoverClassesComputed"
        :popoverWrapperClass="popoverWrapperClasses"
        :popoverBaseClass="popoverBaseClasses"
        :popoverInnerClass="popoverInnerClasses"
        :popoverArrowClass="popoverArrowClasses"
      >
        <template slot="popover">
          <poe-node-showcase
            :node="node"
            :iconUrl="iconSrc"
            :showIconInside="iconInside"
            :showIconOutside="iconOutside"
            :dimedSections="dimedSections"
          />
        </template>
        <!-- Icon -->
        <div v-if="displayMode === `icon`">
          <poe-node-image :type="node.type" :iconUrl="iconSrc" />
          <div class="poe-showcase-label" v-if="!showCustomLabel">
            <div>{{ node.name }}</div>
            <div class="poe-node-showcase-node-name">{{ node.type }}</div>
          </div>
          <div class="poe-showcase-label" v-else>
            <div>
              {{ labelTextComputed }}
            </div>
          </div>
        </div>
        <!-- Text -->
        <div v-else class="poe-node-link">
          <div>{{ labelTextComputed }}</div>
        </div>
      </v-popover>
    </div>
  </div>
</template>

<script>
import PoeNodeShowcase from "./poe-node-showcase.vue";
import PoeNodeImage from "./poe-node-image.vue";
import mainMixin from "@/shared/mixins/main.mixin";

export default {
  name: "PoeNode",
  mixins: [mainMixin],
  components: { PoeNodeShowcase, PoeNodeImage },
  computed: {
    node() {
      return this.showcaseData;
    },
    classesComputed() {
      let classes = `poe-node-showcase ${this.classes}`;

      switch (this.displayMode) {
        case "showcase":
          classes += " poe-node-display-showcase";
          break;
        case "icon":
          classes += " poe-node-display-icon";
          break;
        case "text":
        default:
          classes += " poe-node-display-text";
          break;
      }

      return classes;
    },
    popoverClassesComputed() {
      return `poe-node-showcase-popover ${this.popoverClasses}`;
    },
    showCustomLabel() {
      return this.labelText.length > 0;
    },
    labelTextComputed() {
      return this.labelText ? this.labelText : this.node ? this.node.name : "";
    },
  },
  showcaseMetadata: {
    type: "poe-node",
  },
};
</script>

<style lang="scss">
@use "./../../_styles" as styles;

.poe-node-showcase-popover {
  z-index: 10000;

  .poe-node-wrapper {
    background-color: black;
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  }
}

.poe-node-showcase-popover,
.poe-node-showcase {
  @include styles.font;
  @include styles.colors;

  .poe-node-showcase-node-name {
    line-height: 12px;
    font-size: 12px;
  }
  .poe-node-link {
    color: var(--poe-color-node-title);
  }
}
</style>
