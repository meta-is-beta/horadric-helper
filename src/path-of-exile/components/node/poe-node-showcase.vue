<template>
  <div style="display: flex">
    <!-- Outside Icon -->
    <poe-node-image
      class="poe-node-icon-beside-showcase"
      v-if="shouldShowIconOutside"
      :type="nodeType"
      :iconUrl="this.iconUrl"
    />
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
      <!-- Inside Icon -->
      <poe-node-image
        v-if="shouldShowIconInside"
        :type="nodeType"
        :iconUrl="this.iconUrl"
      />
    </div>
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
    wrapperClasses() {
      let classes = `poe-node-wrapper`;
      if (this.nodeType) {
        classes += ` poe-node-${this.nodeType.replace(" ", "-").toLowerCase()}`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.poe-node-icon-beside-showcase {
  align-self: flex-start;
  object-fit: contain;
  margin-right: 12px;
}
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

  & .poe-node-header {
    height: 55px;
    color: var(--poe-color-node-title);
    font-size: 22px;
    white-space: nowrap;
    background-image: url(../../assets/Node-ui-header.png);
    display: flex;
    justify-content: space-between;

    & .poe-node-header-left-panel,
    & .poe-node-header-right-panel {
      width: 44px;
      height: 55px;
      background-image: inherit;
    }

    & .poe-node-header-center-panel {
      line-height: 55px;
    }
  }
  & .poe-node-icon {
    padding-bottom: 10px;
  }
  &.poe-node-basic {
    & .poe-node-header {
      background-position-y: -114px;
      & .poe-node-header-left-panel {
        background-position-y: 0px;
      }
      & .poe-node-header-right-panel {
        background-position-y: -57px;
      }
    }
  }
  & .poe-node-description {
    padding: 10px;
    text-align: left;
    color: var(--poe-color-augmented);
    line-height: 20px;
    min-width: 250px;
  }
  &.poe-node-notable {
    & .poe-node-header {
      background-position-y: -284px;
      & .poe-node-header-left-panel {
        background-position-y: -170px;
      }
      & .poe-node-header-right-panel {
        background-position-y: -227px;
      }
    }
  }
  &.poe-node-keystone {
    & .poe-node-header {
      color: #e2dedd !important;
      background-position-y: -456px;
      & .poe-node-header-left-panel {
        background-position-y: -399px;
      }
      & .poe-node-header-right-panel {
        background-position-y: -342px;
      }
    }
  }
  &.poe-node-ascendancy-notable,
  &.poe-node-ascendancy-basic {
    & .poe-node-header {
      background-position-y: 57px;
      & .poe-node-header-left-panel {
        background-position-y: 171px;
      }
      & .poe-node-header-right-panel {
        background-position-y: 114px;
      }
    }
  }
}
</style>
