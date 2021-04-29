<template>
  <div :class="wrapperClasses">
    <!-- Header -->
    <div :class="headerClasses">
      <div :class="leftHeaderPanelClasses">
        <div v-if="item.influences.length > 0" />
      </div>
      <div class="item-header-center">
        <div>{{ item.name }}</div>
        <div v-if="item.name != item.baseName">{{ item.baseName }}</div>
      </div>
      <div :class="rightHeaderPanelClasses">
        <div v-if="item.influences.length > 0" />
      </div>
    </div>
    <!-- Item stats -->
    <div class="item-stats">
      <!-- Properties -->
      <div
        v-for="(property, index) in itemProperties"
        :key="`${index}-property`"
        :class="getPropertyClasses(index)"
        v-html="property"
      ></div>
      <!-- Item level -->
      <div
        class="item-separator"
        v-if="item.level && itemProperties.length > 0"
      ></div>
      <div v-if="item.level">
        Item Level:
        <span class="item-level-value" v-if="item.level">
          {{ item.level }}
        </span>
      </div>
      <!-- Enchants -->
      <div class="item-separator" v-if="item.enchants"></div>
      <div
        v-for="(enchant, index) in itemEnchants"
        :key="`${index}-enchant`"
        :class="getEnchantsClasses(index)"
      >
        {{ enchant }}
      </div>
      <!-- Implicits -->
      <div class="item-separator" v-if="item.implicits"></div>
      <div
        v-for="(implicit, index) in itemImplicits"
        :key="`${index}-implicit`"
        :class="getImplicitClasses(index)"
      >
        {{ implicit }}
      </div>
      <!-- Gem description -->
      <div class="item-separator" v-if="item.gemDescription"></div>
      <div
        v-for="(desciptionLine, index) in item.gemDescription"
        :key="`${index}-gem-desc`"
        :class="getGemDescriptionClasses(index)"
      >
        {{ desciptionLine }}
      </div>
      <!-- Modifiers -->
      <div class="item-separator" v-if="item.modifiers"></div>
      <div
        v-for="(modifier, index) in itemModifiers"
        :key="`${index}-modifier`"
        :class="getModifierClasses(modifier, index)"
      >
        {{ modifier.text }}
      </div>
      <!-- Corruption -->
      <div class="item-corrupted" v-if="itemIsCorrupted">Corrupted</div>
      <!-- Mirrored -->
      <div class="item-mirrored" v-if="itemIsMirrored">Mirrored</div>
      <!-- Split -->
      <div class="item-split" v-if="itemIsSplit">Split</div>
      <!-- Image -->
      <div class="item-separator" v-if="showTooltipIcon"></div>
      <img
        class="item-image"
        :src="iconUrl"
        v-show="showTooltipIcon"
        :width="iconSize"
      />
    </div>
  </div>
</template>

<script>
import poeShowcaseMixin from "./../shared/poe-showcase.mixin";

export default {
  name: "PoeItemShowcase",
  props: {
    item: { type: Object, default: () => {} },
    iconSize: { type: Number, default: 50 },
  },
  mixins: [poeShowcaseMixin],
  methods: {
    getPropertyClasses(index) {
      const classes = this.addDimedClass("properties", index, "");

      return classes;
    },
    getEnchantsClasses(index) {
      let classes = "item-enchant";
      classes = this.addDimedClass("enchants", index, classes);

      return classes;
    },
    getImplicitClasses(index) {
      let classes = "item-implicit";
      classes = this.addDimedClass("implicits", index, classes);

      return classes;
    },
    getGemDescriptionClasses(index) {
      let classes = "gem-description";
      classes = this.addDimedClass("decription", index, classes);

      return classes;
    },
    getModifierClasses(modifier, index) {
      let classes = "item-modifier";
      if (modifier.isCrafter) {
        classes += " modifier-crafted";
      }

      classes = this.addDimedClass("modifiers", index, classes);

      return classes;
    },
  },
  computed: {
    showTooltipIcon() {
      return this.showIcon && this.iconUrl;
    },
    itemProperties() {
      return this.item.properties
        ? this.item.properties.map((line) => {
            return line
              .replace(" (augmented)", "")
              .trim()
              .replaceAll(
                /([0-9-%+-]+|([0-9]+)|(Max)|(Min))/gi,
                "<span class='item-property-value'>$1</span>"
              );
          })
        : [];
    },
    itemEnchants() {
      return this.item.enchants
        ? this.item.enchants.map((x) => x.replace("(enchant)", "").trim())
        : [];
    },
    itemImplicits() {
      return this.item.implicits
        ? this.item.implicits.map((x) => x.replace("(implicit)", "").trim())
        : [];
    },
    itemModifiers() {
      return this.item.modifiers
        ? this.item.modifiers.map((x) => ({
            text: x.replace("(crafted)", "").trim(),
            isCrafter: x.includes("(crafted)"),
          }))
        : [];
    },
    itemIsCorrupted() {
      return !!this.item.statuses.some((s) => s === "corrupted");
    },
    itemIsMirrored() {
      return !!this.item.statuses.some((s) => s === "mirrored");
    },
    itemIsSplit() {
      return !!this.item.statuses.some((s) => s === "split");
    },
    wrapperClasses() {
      let classes = "item-wrapper";
      if (this.item.rarity) {
        classes += ` ${this.item.rarity.toLowerCase()}-item`;
      }

      return classes;
    },
    headerClasses() {
      let classes = "item-header";
      if (this.item.rarity === "Rare" || this.item.rarity === "Unique") {
        classes += " item-header-double";
      } else {
        classes += " item-header-single";
      }

      return classes;
    },
    leftHeaderPanelClasses() {
      let classes = "item-header-left-panel";

      if (this.item.influences.length > 0) {
        classes += ` item-influenced item-influenced-${this.item.influences[0].toLowerCase()}`;
      }

      return classes;
    },
    rightHeaderPanelClasses() {
      let classes = "item-header-right-panel";

      if (this.item.influences.length > 0) {
        classes += " item-influenced";
      }

      if (this.item.influences.length === 1) {
        classes += ` item-influenced-${this.item.influences[0].toLowerCase()}`;
        return classes;
      }

      if (this.item.influences.length === 2) {
        classes += ` item-influenced-${this.item.influences[1].toLowerCase()}`;
        return classes;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.poe-item-showcase-popover {
  .item-wrapper {
    border: 0;
    padding: 0px;
  }
}
.poe-item-showcase {
  .item-wrapper {
    border: 1px solid white;
    padding: 2px;
  }
}

.poe-item-showcase,
.poe-item-showcase-popover {
  .item-wrapper {
    min-width: 360px;
    background-color: rgba(0, 0, 0, 1);

    & .item-image {
      margin-top: 4px;
      margin-bottom: 4px;
    }
  }

  .item-header {
    white-space: nowrap;
    font-size: 22px;
    width: 100%;

    & div {
      display: inline-block;
    }

    & .item-header-left-panel {
      float: left;
    }

    & .item-header-right-panel {
      float: right;
    }

    &.item-header-single {
      height: 32px;
      background-image: url(../../assets/Item-ui-header-single.png);

      & .item-header-left-panel,
      & .item-header-right-panel {
        height: 32px;
        width: 28px;
        background-image: url(../../assets/Item-ui-header-single.png);
      }
      & .item-influenced div {
        margin-top: 2px;
        display: flex;
      }
      & .item-header-center {
        line-height: 23px;

        & div:nth-child(1) {
          margin-top: 4px;
        }
      }
    }

    &.item-header-double {
      height: 52px;
      background-image: url(../../assets/Item-ui-header-double.png);

      & .item-header-left-panel,
      & .item-header-right-panel {
        background-image: url(../../assets/Item-ui-header-double.png);
        width: 44px;
        height: 52px;
      }

      & .item-header-left-panel.item-influenced div {
        float: left;
        width: 38px;
        margin-left: 6px;
      }

      & .item-header-right-panel.item-influenced div {
        float: right;
        width: 38px;
      }

      & .item-influenced div {
        margin-top: 12px;
        display: flex;
      }

      & .item-header-center {
        line-height: 23px;
        height: 52px;

        & div {
          display: block;
        }

        & div:nth-child(1) {
          margin-top: 3px;
        }
      }

      & .item-influenced img {
        margin-top: 12px;
      }
    }
  }

  .dimed-line {
    color: var(--poe-color-default-dimed) !important;
  }

  .modifier-crafted {
    color: var(--poe-color-essencemod) !important;
  }

  .gem-description {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    color: var(--poe-color-gem);
  }

  .item-property-value,
  .item-level-value {
    color: white;
  }

  .item-implicit,
  .item-modifier,
  .item-mirrored,
  .item-split {
    color: var(--poe-color-augmented);
    white-space: nowrap;
  }

  .item-enchant {
    color: var(--poe-color-essencemod);
  }

  .item-corrupted {
    color: var(--poe-color-corrupted);
  }

  .item-corrupted,
  .item-mirrored,
  .item-split {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .item-separator {
    height: 2px;
    background-repeat: no-repeat;
    background-position-x: center;
    margin-top: 4px;
    margin-bottom: 4px;
    background-image: url(../../assets/Item-ui-separators.png);
  }

  .item-stats {
    padding: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .unique-item {
    &.item-wrapper {
      border-color: var(--poe-color-unique);
    }
    & .item-header {
      color: var(--poe-color-unique);
      background-position-y: 106px;
    }
    & .item-separator {
      background-position-y: -6px;
    }
    & .item-header-left-panel {
      background-position-y: 160px;
    }
    & .item-header-right-panel {
      background-position-y: 52px;
    }
  }

  .rare-item {
    &.item-wrapper {
      border-color: var(--poe-color-rare);
    }
    & .item-header {
      color: var(--poe-color-rare);
      background-position-y: -55px;
    }
    & .item-separator {
      background-position-y: -4px;
    }
    & .item-header-left-panel {
      background-position-y: -1px;
    }
    & .item-header-right-panel {
      background-position-y: -109px;
    }
  }

  .magic-item {
    &.item-wrapper {
      border-color: var(--poe-color-magic);
    }
    & .item-header {
      color: var(--poe-color-magic);
      background-position-y: 474px;
    }
    & .item-separator {
      background-position-y: -2px;
    }
    & .item-header-left-panel {
      background-position-y: 508px;
    }
    & .item-header-right-panel {
      background-position-y: 440px;
    }
  }

  .normal-item {
    &.item-wrapper {
      border-color: var(--poe-color-normal);
    }
    & .item-header {
      color: var(--poe-color-normal);
      background-position-y: 578px;
    }
    & .item-separator {
      background-position-y: -8px;
    }
    & .item-header-left-panel {
      background-position-y: 612px;
    }
    & .item-header-right-panel {
      background-position-y: 544px;
    }
  }

  .gem-item {
    &.item-wrapper {
      border-color: var(--poe-color-gem);
    }
    & .item-header {
      color: var(--poe-color-gem);
      background-position-y: 883px;
    }
    & .item-separator {
      background-position-y: -10px;
    }
    & .item-header-left-panel {
      background-position-y: 917px;
    }
    & .item-header-right-panel {
      background-position-y: 849px;
    }
  }

  .currency-item {
    &.item-wrapper {
      border-color: var(--poe-color-currency);
    }
    & .item-header {
      color: var(--poe-color-currency);
      background-position-y: -239px;
    }
    & .item-separator {
      background-position-y: -8px;
    }
    & .item-header-left-panel {
      background-position-y: -205px;
    }
    & .item-header-right-panel {
      background-position-y: -273px;
    }
  }

  .item-influenced div {
    background-image: url(../../assets/Influence-icons.png);
    background-repeat: no-repeat;
    background-size: 27px;
    height: 25px;
  }
  .item-influenced-crusader div {
    background-position-y: 0;
  }
  .item-influenced-warlord div {
    background-position-y: -28px;
  }
  .item-influenced-hunter div {
    background-position-y: -56px;
  }
  .item-influenced-redeemer div {
    background-position-y: -80px;
  }
  .item-influenced-elder div {
    background-position-y: -108px;
  }
  .item-influenced-shaper div {
    background-position-y: -135px;
  }
  .item-influenced-replica div {
    background-position-y: -163px;
  }
}
</style>
