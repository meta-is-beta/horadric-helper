<template>
  <div :class="wrapperClasses">
    <div class="item-header-row">
      <div class="item-image-section">
        <img
          :src="options.imageUrl"
          v-if="options.imageUrl && options.showIconInTooltip"
        />
      </div>
      <div class="item-overwiev-section">
        <div
          v-show="hasHeader"
          v-for="(line, index) in headerLines"
          :key="`${index}-header`"
        >
          {{ line }}
        </div>
        <div class="item-properties-sction">
          <div
            v-show="hasProperties"
            v-for="(line, index) in propertyLines"
            :key="`${index}-property`"
          >
            <div v-html="getColoredPropertyLines(line)" />
          </div>
        </div>
      </div>
    </div>
    <div style="display: none">
      -----------------------------------------------------------------
    </div>
    <div style="display: none" class="item-stats-row">
      <div
        v-show="hasModifiers"
        v-for="(line, index) in modifierLines"
        :key="`${index}-modifier`"
      >
        {{ line }}
      </div>
      <div v-show="hasRequirements">----------------</div>
      <div
        v-show="hasRequirements"
        v-for="(line, index) in requirementLines"
        :key="`${index}-requirement`"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script>
import processItemData from "./../../processors/le-item-processor";
import itemShowacseMixin from "./../shared/item-showcase.mixin";

export default {
  name: "LeItemShowcase",
  mixins: [itemShowacseMixin],
  methods: {
    processItemData(rawDescription) {
      return processItemData(rawDescription);
    },
    getColoredPropertyLines(line) {
      return line.replace(
        /([0-9-]+%*)/,
        "<span class='item-property-value'>$1</span>"
      );
    },
  },
  computed: {
    hasHeader() {
      return this.headerLines && this.headerLines.length > 0;
    },
    headerLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Header").lines.slice(1)
        : [];
    },
    hasProperties() {
      return this.propertyLines && this.propertyLines.length > 0;
    },
    propertyLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Properties").lines
        : [];
    },
    hasModifiers() {
      return this.modifierLines && this.modifierLines.length > 0;
    },
    modifierLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Modifiers").lines
        : [];
    },
    hasRequirements() {
      return this.requirementLines && this.requirementLines.length > 0;
    },
    requirementLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Requirements").lines
        : [];
    },
    wrapperClasses() {
      let classes = `le-item-showcase`;
      if (this.item.rarity) {
        classes += ` ${this.item.rarity.toLowerCase()}-item`;
      }
      return classes;
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Cinzel-VariableFont";
  src: local("Cinzel-VariableFont"),
    url(../../assets/le/Cinzel-VariableFont.ttf) format("truetype");
}
@font-face {
  font-family: "Cinzel";
  src: local("Cinzel-Regular"),
    url(../../assets/le/Cinzel-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "LinBiolinum";
  src: local("LinBiolinum_R"),
    url(../../assets/le/LinBiolinum_R.otf) format("opentype");
  font-weight: normal;
  font-style: normal;
}
.le-item-showcase {
  display: flex;
  flex-flow: row wrap;
  max-width: 420px;
  font-family: "LinBiolinum", Verdana, Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-style: normal;
  // letter-spacing: 0.1px;
  text-transform: uppercase;
  background-color: var(--le-panel-background);
  color: var(--le-value-text);
  border: 1px solid var(--le-panel-border);
  padding: 4px;
  box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.6);

  --le-panel-background: #0a0a09;
  --le-panel-border: #88806f;
  --le-property-text: #baad8c;
  --le-value-text: #bfb4a3;
  --le-rarity-rare: #b8a746;
  --le-rarity-unique: rgb(155, 74, 7);
  --le-subheader-text: #7d745d;
  --le-property-value-text: #79a7ea;
}
.item-header-row {
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  display: flex;
  padding: 10px;

  & .item-image-section {
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      margin-left: 10px;
      margin-right: 10px;
      width: 70px;
      height: auto;
      border: 1px solid grey;
      padding: 13px;
    }
  }
  & .item-overwiev-section {
    padding-left: 18px;
    width: auto;

    & div:nth-child(1) {
      font-weight: bold;
      font-size: 18px;
    }
    & div:nth-child(2),
    & div:nth-child(3) {
      font-size: 14px;
      font-weight: normal;
      color: var(--le-subheader-text);
    }
  }
  & .item-properties-sction {
    margin-top: 10px;
    font-size: 14px;
    & div {
      color: var(--le-property-text) !important;
      font-size: 14px !important;
    }
  }
  & .item-property-value {
    color: var(--le-property-value-text);
  }
}
.item-stats-row {
  width: 100%;
}
.le-item-showcase.unique-item {
  & .item-overwiev-section {
    & div:nth-child(1) {
      color: var(--le-rarity-unique);
    }
  }
  & .item-image-section {
    & img {
      border-color: var(--le-rarity-unique);
      background: radial-gradient(
        closest-corner,
        rgba(155, 74, 7, 0.08) 30%,
        rgba(155, 74, 7, 0.1) 60%,
        rgba(155, 74, 7, 0.2) 80%,
        rgba(155, 74, 7, 0.3) 100%
      );
    }
  }
}
.le-item-showcase.rare-item {
  & .item-overwiev-section {
    & div:nth-child(1) {
      color: var(--le-rarity-rare);
    }
  }
}
</style>
