<template>
  <div v-if="show" class="poe-node-showcase">
    <div
      v-if="displayMode.toLowerCase() === `showcase`"
      :class="wrapperClassesComputed"
    >
      <!-- Showcase -->
      <poe-node-showcase
        :node="node"
        :iconUrl="iconSrc"
        :showIcon="showIconInShowcase"
      />
    </div>
    <div v-else :class="wrapperClassesComputed">
      <v-popover
        trigger="hover"
        placement="auto"
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
            :showIcon="showIconInShowcase"
          />
        </template>
        <!-- Icon -->
        <div v-if="displayMode.toLowerCase() === `icon`">
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
        <span v-else class="node-link">{{ labelTextComputed }}</span>
      </v-popover>
    </div>
  </div>
</template>

<script>
import PoeNodeShowcase from "./poe-node-showcase.vue";
import PoeNodeImage from "./poe-node-image.vue";
import showcaseMixin from "@/shared/mixins/showcase.mixin";

export default {
  name: "PoeNode",
  mixins: [showcaseMixin],
  components: { PoeNodeShowcase, PoeNodeImage },
  computed: {
    node() {
      return this.showcaseData;
    },
    showCustomLabel() {
      return this.labelText.length > 0;
    },
    labelTextComputed() {
      return this.labelText ? this.labelText : this.node ? this.node.name : "";
    },
    wrapperClassesComputed() {
      return `poe-node-showcase-wrapper ${this.wrapperClass}`;
    },
    popoverClassesComputed() {
      return `poe-node-showcase-popover ${this.tooltipWrapperClass}`;
    },
  },
  showcaseMetadata: {
    type: "poe-node",
    processRawData: () => {
      throw new Error("Raw data processor not implemented for PoE nodes.");
    },
    processDataObject: (data) => data,
  },
};
</script>

<style lang="scss">
@use "./../../_styles" as styles;

.poe-node-showcase-popover {
  z-index: 10000;
  max-width: 1000px;
}

.poe-node-showcase-popover,
.poe-node-showcase {
  @include styles.font;
  @include styles.colors;
  .poe-node-showcase-wrapper {
    display: flex;
  }
  .poe-node-showcase-node-name {
    line-height: 12px;
    font-size: 12px;
  }
  .node-link {
    color: var(--poe-color-node-title);
  }
}
.poe-node-showcase-popover {
  .node-showcase-tooltip-wrapper {
    background-color: black;
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  }
}
.poe-showcase-label {
  margin-top: 5px;
  padding: 3px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: rgba(1, 1, 1, 0.8);
  border: 1px solid #303030;
  border-radius: 5px;
  justify-content: center;
  line-height: 18px;
  & div:nth-child(1) {
    padding-top: 0px;
    line-height: 20px;
  }
  & div:nth-child(2) {
    padding-bottom: 3px;
  }
}
</style>
