<template>
  <div :class="wrapperClasses">
    <!-- Header -->
    <div class="node-header">
      <div class="node-header-left" />
      <div class="node-header-center">
        {{ nodeName }}
      </div>
      <div class="node-header-right" />
    </div>
    <!-- Description -->
    <div class="node-description">
      <div
        v-for="(descLine, index) in nodeDescription"
        :key="`${index}-desc-line`"
      >
        {{ descLine }}
      </div>
    </div>
    <!-- Icon -->
    <poe-node-image
      v-if="showTooltipIcon"
      :type="nodeType"
      :iconUrl="this.iconUrl"
    />
  </div>
</template>

<script>
import PoeNodeImage from "./poe-node-image.vue";

export default {
  name: "PoeNodeShowcaseTooltip",
  props: {
    node: { type: Object, default: () => {} },
    iconUrl: { type: String, default: "" },
    showIcon: { type: Boolean, default: false },
  },
  components: {
    PoeNodeImage,
  },
  computed: {
    nodeName() {
      return this.node ? this.node.name : "";
    },
    nodeType() {
      return this.node ? this.node.type : "";
    },
    nodeDescription() {
      return this.node ? this.node.description : [];
    },
    showTooltipIcon() {
      return this.iconUrl && this.showIcon;
    },
    wrapperClasses() {
      let classes = `node-showcase-tooltip-wrapper`;
      if (this.nodeType) {
        classes += ` node-${this.nodeType.toLowerCase()}`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.node-showcase-tooltip-wrapper {
  background-color: black;
  border: 2px solid #403b2e;
  transform: scale(0.8);

  & .node-header {
    min-width: 176px;
    height: 73px;
    color: var(--poe-color-node-title);
    display: flex;
    font-size: 28px;
    white-space: nowrap;
    background-image: url(../../../assets/poe/Node-ui-header.png);
    & .node-header-center {
      justify-self: center;
      text-align: center;
      align-self: center;
      min-width: 100px;
      width: 100%;
    }
    & .node-header-left,
    & .node-header-right {
      width: 66px;
      background-image: url(../../../assets/poe/Node-ui-header.png);
    }
  }
  & .node-icon {
    padding-top: 12px;
    padding-bottom: 25px;
  }
  &.node-basic {
    & .node-header {
      background-position-y: -1278px;
      & .node-header-left {
        background-position-y: -1203px;
      }
      & .node-header-right {
        background-position-y: -1128px;
      }
    }
  }
  & .node-description {
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: left;
    color: var(--poe-color-augmented);
    font-size: 18px;
    line-height: 22px;
  }
  &.node-notable {
    & .node-header {
      background-position-y: -377px;
      & .node-header-left {
        background-position-y: -302px;
      }
      & .node-header-right {
        background-position-y: -227px;
      }
    }
  }
  &.node-keystone {
    & .node-header {
      color: #e2dedd !important;
      background-position-y: -152px;
      & .node-header-left {
        background-position-y: -77px;
      }
      & .node-header-right {
        background-position-y: -2px;
      }
    }
  }
}
</style>
