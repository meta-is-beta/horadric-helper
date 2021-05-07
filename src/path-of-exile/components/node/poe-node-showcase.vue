<template>
  <div :class="wrapperClasses">
    <!-- Header -->
    <div class="poe-node-header">
      <div class="poe-node-header-left-panel" />
      <div class="poe-node-header-center-panel">
        {{ nodeName }}
      </div>
      <div class="poe-node-header-right-panel" />
    </div>
    <!-- Description -->
    <div class="poe-node-description">
      <div
        v-for="(descLine, index) in nodeDescription"
        :key="`${index}-desc-line`"
        :class="getDescriptionClasses(index)"
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
import showcaseMixin from "@/shared/mixins/showcase.mixin";

export default {
  name: "PoeNodeShowcaseTooltip",
  props: {
    node: { type: Object, default: () => {} },
  },
  mixins: [showcaseMixin],
  components: {
    PoeNodeImage,
  },
  methods: {
    getDescriptionClasses(index) {
      const classes = this.addDimedClass("description", index, "");

      return classes;
    },
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
      let classes = `poe-node-wrapper`;
      if (this.nodeType) {
        classes += ` poe-node-${this.nodeType.toLowerCase()}`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.poe-node-showcase-popover {
  .poe-node-wrapper {
    border: 0;
    padding: 0px;
  }
}
.poe-node-showcase {
  .poe-node-wrapper {
    border: 2px solid #403b2e;
    padding: 2px;
  }
}

.poe-node-wrapper {
  background-color: black;
  transform: scale(0.8);

  & .dimed-line {
    color: var(--poe-color-default-dimed) !important;
  }

  & .poe-node-header {
    min-width: 176px;
    height: 73px;
    color: var(--poe-color-node-title);
    font-size: 28px;
    white-space: nowrap;
    background-image: url(../../assets/Node-ui-header.png);

    & .poe-node-header-center-panel {
      line-height: 73px;
    }

    & .poe-node-header-left-panel,
    & .poe-node-header-right-panel {
      width: 59px;
      height: 73px;
      background-image: url(../../assets/Node-ui-header.png);
    }

    & div {
      display: inline-block;
    }

    & .poe-node-header-left-panel {
      float: left;
    }

    & .poe-node-header-right-panel {
      float: right;
    }
  }
  & .poe-node-icon {
    padding-bottom: 14px;
  }
  &.poe-node-basic {
    & .poe-node-header {
      background-position-y: -1278px;
      & .poe-node-header-left-panel {
        background-position-y: -1203px;
      }
      & .poe-node-header-right-panel {
        background-position-y: -1128px;
      }
    }
  }
  & .poe-node-description {
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: left;
    color: var(--poe-color-augmented);
    font-size: 18px;
    line-height: 22px;
  }
  &.poe-node-notable {
    & .poe-node-header {
      background-position-y: -377px;
      & .poe-node-header-left-panel {
        background-position-y: -302px;
      }
      & .poe-node-header-right-panel {
        background-position-y: -227px;
      }
    }
  }
  &.poe-node-keystone {
    & .poe-node-header {
      color: #e2dedd !important;
      background-position-y: -152px;
      & .poe-node-header-left-panel {
        background-position-y: -77px;
      }
      & .poe-node-header-right-panel {
        background-position-y: -2px;
      }
    }
  }
}
</style>
