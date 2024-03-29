<template>
  <div style="display: flex">
    <!-- Outside Icon -->
    <poe-passive-image
      class="poe-passive-icon-beside-showcase"
      v-if="shouldShowIconOutside"
      :type="passiveType"
      :iconUrl="this.iconUrl"
      :iconSize="iconSize"
    />
    <div :class="wrapperClasses">
      <!-- Header -->
      <div class="poe-passive-header">
        <div class="poe-passive-header-left-panel" />
        <div class="poe-passive-header-center-panel">
          {{ passiveName }}
        </div>
        <div class="poe-passive-header-right-panel" />
      </div>
      <!-- Description -->
      <div class="poe-passive-description">
        <div
          v-for="(descLine, index) in passiveDescription"
          :key="`${index}-desc-line`"
          :class="getDescriptionClasses(index)"
        >
          {{ descLine }}
        </div>
      </div>
      <!-- Flavour text -->
      <div
        class="poe-passive-flavour-text"
        v-if="passiveFlavourText && passiveFlavourText.length > 0"
      >
        <div
          v-for="(flavourTextLine, index) in passiveFlavourText"
          :key="`${index}-flav-line`"
          :class="getFlavourTextClasses(index)"
        >
          {{ flavourTextLine }}
        </div>
      </div>
      <!-- Inside Icon -->
      <poe-passive-image
        v-if="shouldShowIconInside"
        :type="passiveType"
        :iconUrl="this.iconUrl"
        :iconSize="iconSize"
      />
    </div>
  </div>
</template>

<script>
import PoePassiveImage from "../fragments/poe-passive-image.vue";
import showcaseMixin from "./../../../mixins/showcase.mixin";

export default {
  name: "PoePassiveShowcaseTooltip",
  props: {
    passive: { type: Object, default: () => {} },
  },
  mixins: [showcaseMixin],
  components: {
    PoePassiveImage,
  },
  methods: {
    getDescriptionClasses(index) {
      const classes = this.addDimedClass("description", index, "");

      return classes;
    },
    getFlavourTextClasses(index) {
      const classes = this.addDimedClass("flavour-text", index, "");

      return classes;
    },
  },
  computed: {
    passiveName() {
      return this.passive.name ? this.passive.name : "";
    },
    passiveType() {
      return this.passive.type ? this.passive.type : "";
    },
    passiveDescription() {
      return this.passive.sections && this.passive.sections.description
        ? this.passive.sections.description
        : [];
    },
    passiveFlavourText() {
      return this.passive.sections && this.passive.sections.flavourText
        ? this.passive.sections.flavourText
        : [];
    },
    wrapperClasses() {
      let classes = `poe-passive-wrapper`;

      if (this.passiveType) {
        classes += ` poe-passive-${this.passiveType
          .replace(" ", "-")
          .toLowerCase()}`;
      }

      if (this.showBorder) {
        classes += ` poe-passive-with-border`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.poe-passive-icon-beside-showcase {
  align-self: flex-start;
  object-fit: contain;
  margin-right: 12px;
}

.poe-passive-wrapper {
  background-color: black;
  border: 0;
  padding: 0px;

  &.poe-passive-with-border {
    border: 2px solid #403b2e;
    padding: 2px;
    height: fit-content;
  }

  & .poe-passive-header {
    height: 55px;
    color: var(--poe-color-passive-title);
    font-size: 22px;
    white-space: nowrap;
    background-image: url(../../../assets/Passive-ui-header.png);
    display: flex;
    justify-content: space-between;
    background-repeat: repeat;

    & .poe-passive-header-left-panel,
    & .poe-passive-header-right-panel {
      width: 44px;
      height: 55px;
      background-image: inherit;
      background-repeat: repeat;
    }

    & .poe-passive-header-center-panel {
      line-height: 55px;
    }
  }
  & .poe-passive-image-wrapper {
    padding-bottom: 10px;
  }
  &.poe-passive-basic,
  &.poe-passive-atlas-basic {
    & .poe-passive-header {
      background-position-y: -114px;
      & .poe-passive-header-left-panel {
        background-position-y: 0px;
      }
      & .poe-passive-header-right-panel {
        background-position-y: -57px;
      }
    }
  }
  & .poe-passive-description,
  & .poe-passive-flavour-text {
    padding: 10px;
    text-align: left;
    min-width: 250px;
  }
  & .poe-passive-description {
    color: var(--poe-color-augmented);
  }
  & .poe-passive-flavour-text {
    margin-top: 10px;
    color: var(--poe-color-unique);
    font-style: italic;
  }
  &.poe-passive-notable,
  &.poe-passive-atlas-notable {
    & .poe-passive-header {
      background-position-y: -284px;
      & .poe-passive-header-left-panel {
        background-position-y: -170px;
      }
      & .poe-passive-header-right-panel {
        background-position-y: -227px;
      }
    }
  }
  &.poe-passive-keystone,
  &.poe-passive-atlas-keystone {
    & .poe-passive-header {
      color: #e2dedd !important;
      background-position-y: -456px;
      & .poe-passive-header-left-panel {
        background-position-y: -399px;
      }
      & .poe-passive-header-right-panel {
        background-position-y: -342px;
      }
    }
  }
  &.poe-passive-ascendancy-notable,
  &.poe-passive-ascendancy-basic {
    & .poe-passive-header {
      background-position-y: 228px;
      & .poe-passive-header-left-panel {
        background-position-y: 342px;
      }
      & .poe-passive-header-right-panel {
        background-position-y: 285px;
      }
    }
  }
  &.poe-passive-mastery {
    & .poe-passive-header {
      color: #e2dedd !important;
      background-position-y: 57px;
      & .poe-passive-header-left-panel {
        background-position-y: 171px;
      }
      & .poe-passive-header-right-panel {
        background-position-y: 114px;
      }
    }
  }
}

.poe-passive-atlas-keystone {
  & .poe-passive-header-left-panel,
  & .poe-passive-header,
  & .poe-passive-header-right-panel {
    background-color: #261200;
    background-blend-mode: luminosity, normal;
  }
}
</style>
