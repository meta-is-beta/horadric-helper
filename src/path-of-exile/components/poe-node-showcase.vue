<template>
  <div v-if="showNode" class="poe-node-showcase">
    <div
      v-if="options.displayMode.toLowerCase() === `showcase`"
      :class="wrapperClassesComputed"
    >
      <!-- Showcase -->
      <poe-node-showcase-tooltip
        v-if="showNode"
        :node="node"
        :iconUrl="options.iconUrl"
        :showIcon="options.showIconInShowcase"
      />
    </div>
    <div v-else :class="wrapperClassesComputed">
      <v-popover
        trigger="hover"
        placement="auto"
        :popoverClass="popoverClassesComputed"
      >
        <template slot="popover">
          <poe-node-showcase-tooltip
            v-if="showNode"
            :node="node"
            :iconUrl="options.iconUrl"
            :showIcon="options.showIconInShowcase"
          />
        </template>
        <!-- Icon -->
        <div v-if="options.displayMode.toLowerCase() === `icon`">
          <poe-node-image :type="node.type" :iconUrl="options.iconUrl" />
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
import PoeNodeShowcaseTooltip from "@/path-of-exile/components/fragments/poe-node-showcase-tooltip.vue";
import PoeNodeImage from "@/path-of-exile/components/fragments/poe-node-image.vue";
import nodeShowcaseMixin from "@/shared/mixins/node-showcase.mixin";
import processNodeData from "@/path-of-exile/data-processors/poe-node-processor";

export default {
  name: "PoeNodeShowcase",
  mixins: [nodeShowcaseMixin],
  components: { PoeNodeShowcaseTooltip, PoeNodeImage },
  methods: {
    processNodeData(rawDescription) {
      return processNodeData(rawDescription);
    },
  },
  computed: {
    showCustomLabel() {
      return this.options.labelText.length > 0;
    },
    labelTextComputed() {
      return this.options.labelText
        ? this.options.labelText
        : this.node
        ? this.node.name
        : "";
    },
    wrapperClassesComputed() {
      return `poe-node-showcase-wrapper ${this.wrapperClass}`;
    },
    popoverClassesComputed() {
      return `poe-node-showcase-popover ${this.tooltipWrapperClass}`;
    },
  },
};
</script>

<style lang="scss">
@use "./../_styles" as styles;

.poe-node-showcase-popover {
  z-index: 10000;
  max-width: 1000px;
}

.poe-node-showcase-popover,
.poe-node-showcase {
  @include styles.font;
  @include styles.colors;
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
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.6);
  }
}
.poe-showcase-label {
  margin-top: 3px;
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
