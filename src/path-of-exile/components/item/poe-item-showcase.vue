<template>
  <div style="display: flex">
    <!-- Outside Icon -->
    <img
      class="poe-item-icon poe-item-icon-beside-showcase"
      :src="iconUrl"
      v-if="shouldShowIconOutside"
      :width="iconSize"
      height="auto"
    />
    <div :class="wrapperClasses">
      <!-- Header -->
      <div :class="headerClasses">
        <div :class="leftHeaderPanelClasses">
          <div v-if="itemInfluences.length > 0" />
        </div>
        <div class="poe-item-header-center-panel">
          <div>{{ item.name }}</div>
          <div v-if="item.name != item.baseName">{{ item.baseName }}</div>
        </div>
        <div :class="rightHeaderPanelClasses">
          <div v-if="itemInfluences.length > 0" />
        </div>
      </div>
      <!-- Item stats -->
      <div class="poe-item-stats">
        <!-- Properties -->
        <div class="poe-item-separator" v-if="shouldShowItemProperties"></div>
        <div v-if="shouldShowItemProperties">
          <div
            v-for="(property, index) in itemProperties"
            :key="`${index}-property`"
            :class="getPropertyClasses(index)"
            v-html="property"
          ></div>
        </div>
        <!-- Item level -->
        <div class="poe-item-separator" v-if="shouldShowItemLevel"></div>
        <div v-if="shouldShowItemLevel">
          Item Level:
          <span class="poe-item-level-value" v-if="item.level">
            {{ item.level }}
          </span>
        </div>
        <!-- Enchants -->
        <div class="poe-item-separator" v-if="shouldShowItemEnchants"></div>
        <div v-if="shouldShowItemEnchants">
          <div
            v-for="(enchant, index) in itemEnchants"
            :key="`${index}-enchant`"
            :class="getEnchantsClasses(index)"
          >
            {{ enchant }}
          </div>
        </div>
        <!-- Implicits -->
        <div class="poe-item-separator" v-if="shouldShowItemImplicits"></div>
        <div v-if="shouldShowItemImplicits">
          <div
            v-for="(implicit, index) in itemImplicits"
            :key="`${index}-implicit`"
            :class="getImplicitClasses(index)"
          >
            {{ implicit }}
          </div>
        </div>
        <!-- Gem description -->
        <div class="poe-item-separator" v-if="shouldShowGemDescription"></div>
        <div v-if="shouldShowGemDescription">
          <div
            v-for="(desciptionLine, index) in item.gemDescription"
            :key="`${index}-gem-desc`"
            :class="getGemDescriptionClasses(index)"
          >
            {{ desciptionLine }}
          </div>
        </div>
        <!-- Modifiers -->
        <div class="poe-item-separator" v-if="shouldShowItemModifiers"></div>
        <div v-if="shouldShowItemModifiers">
          <div
            v-for="(modifier, index) in itemModifiers"
            :key="`${index}-modifier`"
            :class="getModifierClasses(modifier, index)"
          >
            {{ modifier.text }}
          </div>
        </div>
        <!-- Statuses -->
        <div v-if="shouldShowStatuses">
          <!-- Corruption -->
          <div class="poe-item-corrupted" v-if="itemIsCorrupted">Corrupted</div>
          <!-- Mirrored -->
          <div class="poe-item-mirrored" v-if="itemIsMirrored">Mirrored</div>
          <!-- Split -->
          <div class="poe-item-split" v-if="itemIsSplit">Split</div>
        </div>
        <!-- Inside Icon -->
        <div class="poe-item-separator" v-if="shouldShowIconInside"></div>
        <img
          class="poe-item-icon"
          :src="iconUrl"
          v-if="shouldShowIconInside"
          :width="iconSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import showcaseMixin from "@/shared/mixins/showcase.mixin";

export default {
  name: "PoeItemShowcase",
  props: {
    item: { type: Object, default: () => {} },
    iconSize: { type: Number, default: 50 },
  },
  mixins: [showcaseMixin],
  methods: {
    getPropertyClasses(index) {
      let classes = this.addDimedClass("properties", index, "");
      classes = this.addHiddenClasses("properties", index, classes);

      return classes;
    },
    getEnchantsClasses(index) {
      let classes = "poe-item-enchant";
      classes = this.addDimedClass("enchants", index, classes);
      classes = this.addHiddenClasses("enchants", index, classes);

      return classes;
    },
    getImplicitClasses(index) {
      let classes = "poe-item-implicit";
      classes = this.addDimedClass("implicits", index, classes);
      classes = this.addHiddenClasses("implicits", index, classes);

      return classes;
    },
    getGemDescriptionClasses(index) {
      let classes = "gem-description";
      classes = this.addDimedClass("decription", index, classes);
      classes = this.addHiddenClasses("decription", index, classes);

      return classes;
    },
    getModifierClasses(modifier, index) {
      let classes = "poe-item-modifier";
      if (modifier.isCrafter) {
        classes += " modifier-crafted";
      }

      classes = this.addDimedClass("modifiers", index, classes);
      classes = this.addHiddenClasses("modifiers", index, classes);

      return classes;
    },
  },
  computed: {
    shouldShowItemLevel() {
      return this.item.level && !this.sectionShouldBeFullyHidden("item-level");
    },
    shouldShowItemProperties() {
      return (
        this.itemProperties.length > 0 &&
        !this.sectionShouldBeFullyHidden("properties")
      );
    },
    shouldShowItemEnchants() {
      return (
        this.itemEnchants.length > 0 &&
        !this.sectionShouldBeFullyHidden("enchants")
      );
    },
    shouldShowItemImplicits() {
      return (
        this.itemImplicits.length > 0 &&
        !this.sectionShouldBeFullyHidden("implicits")
      );
    },
    shouldShowGemDescription() {
      return (
        this.item.gemDescription &&
        !this.sectionShouldBeFullyHidden("description")
      );
    },
    shouldShowItemModifiers() {
      return (
        this.item.modifiers && !this.sectionShouldBeFullyHidden("modifiers")
      );
    },
    shouldShowStatuses() {
      return !this.sectionShouldBeFullyHidden("statuses");
    },
    itemProperties() {
      return this.item.properties
        ? this.item.properties.map((line) => {
            return line
              .replace(" (augmented)", "")
              .trim()
              .replaceAll(
                /(([0-9-%+-]+s*)|([0-9s.\-)(]{3,})|((Max))|((Min)))/gi,
                "<span class='poe-item-property-value'>$1</span>"
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
    itemInfluences() {
      return this.item.influences ? this.item.influences : [];
    },
    itemStatuses() {
      return this.item.statuses ? this.item.statuses : [];
    },
    itemIsCorrupted() {
      return !!this.itemStatuses.some((s) => s === "corrupted");
    },
    itemIsMirrored() {
      return !!this.itemStatuses.some((s) => s === "mirrored");
    },
    itemIsSplit() {
      return !!this.itemStatuses.some((s) => s === "split");
    },
    wrapperClasses() {
      let classes = "poe-item-wrapper";
      if (this.item.rarity) {
        classes += ` ${this.item.rarity.toLowerCase()}-item`;
      }

      return classes;
    },
    headerClasses() {
      let classes = "poe-item-header";
      if (this.item.rarity === "Rare" || this.item.rarity === "Unique") {
        classes += " poe-item-header-double";
      } else {
        classes += " poe-item-header-single";
      }

      return classes;
    },
    leftHeaderPanelClasses() {
      let classes = "poe-item-header-left-panel";

      if (this.itemInfluences.length > 0) {
        classes += ` poe-item-influenced poe-item-influenced-${this.itemInfluences[0].toLowerCase()}`;
      }

      return classes;
    },
    rightHeaderPanelClasses() {
      let classes = "poe-item-header-right-panel";

      if (this.itemInfluences.length > 0) {
        classes += " poe-item-influenced";
      }

      if (this.itemInfluences.length === 1) {
        classes += ` poe-item-influenced-${this.itemInfluences[0].toLowerCase()}`;
        return classes;
      }

      if (this.itemInfluences.length === 2) {
        classes += ` poe-item-influenced-${this.itemInfluences[1].toLowerCase()}`;
        return classes;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.poe-item-icon-beside-showcase {
  align-self: flex-start;
  object-fit: contain;
  margin-right: 12px;
}

.poe-item-showcase-popover {
  .poe-item-wrapper {
    border: 0;
    padding: 0px;
  }
}
.poe-item-showcase {
  .poe-item-wrapper {
    border: 1px solid white;
    padding: 2px;
  }
}

.poe-item-showcase,
.poe-item-showcase-popover {
  .poe-item-wrapper {
    background-color: rgba(0, 0, 0, 1);
    display: inline-block;

    & .poe-item-icon {
      margin: 4px;
      margin-top: 8px;
    }
  }

  .poe-item-header {
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    font-size: 22px;

    &.poe-item-header-single {
      height: 32px;
      background-image: url(../../assets/Item-ui-header-single.png);

      & .poe-item-header-left-panel,
      & .poe-item-header-right-panel {
        height: 32px;
        width: 28px;
        background-image: inherit;
      }
      & .poe-item-influenced div {
        margin-top: 2px;
        display: flex;
      }
      & .poe-item-header-center-panel {
        line-height: 31px;
      }
    }

    &.poe-item-header-double {
      height: 52px;
      background-image: url(../../assets/Item-ui-header-double.png);

      & .poe-item-header-left-panel,
      & .poe-item-header-right-panel {
        background-image: inherit;
        width: 44px;
        height: 52px;
      }

      & .poe-item-header-left-panel.poe-item-influenced div {
        float: left;
        width: 38px;
        margin-left: 6px;
      }

      & .poe-item-header-right-panel.poe-item-influenced div {
        float: right;
        width: 38px;
      }

      & .poe-item-influenced div {
        margin-top: 12px;
        display: flex;
      }

      & .poe-item-header-center-panel {
        line-height: 25px;

        & div {
          display: block;
        }
      }

      & .poe-item-influenced img {
        margin-top: 12px;
      }
    }
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

  .poe-item-property-value,
  .poe-item-level-value {
    color: white;
  }

  .poe-item-implicit,
  .poe-item-modifier,
  .poe-item-mirrored,
  .poe-item-split {
    color: var(--poe-color-augmented);
    white-space: nowrap;
  }

  .poe-item-enchant {
    color: var(--poe-color-essencemod);
  }

  .poe-item-corrupted {
    color: var(--poe-color-corrupted);
  }

  .poe-item-corrupted,
  .poe-item-mirrored,
  .poe-item-split {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .poe-item-stats {
    padding: 16px;
    padding-top: 4px;
    padding-bottom: 10px;
    display: inline-block;
    min-width: 360px;
    .poe-item-separator {
      height: 2px;
      background-repeat: no-repeat;
      background-position-x: center;
      margin-top: 4px;
      margin-bottom: 4px;
      background-image: url(../../assets/Item-ui-separators.png);
      &:first-of-type {
        display: none;
      }
    }
  }

  .unique-item {
    &.poe-item-wrapper {
      border-color: var(--poe-color-unique);
    }
    & .poe-item-header {
      color: var(--poe-color-unique);
      background-position-y: 106px;
    }
    & .poe-item-separator {
      background-position-y: -6px;
    }
    & .poe-item-header-left-panel {
      background-position-y: 160px;
    }
    & .poe-item-header-right-panel {
      background-position-y: 52px;
    }
  }

  .rare-item {
    &.poe-item-wrapper {
      border-color: var(--poe-color-rare);
    }
    & .poe-item-header {
      color: var(--poe-color-rare);
      background-position-y: -55px;
    }
    & .poe-item-separator {
      background-position-y: -4px;
    }
    & .poe-item-header-left-panel {
      background-position-y: -1px;
    }
    & .poe-item-header-right-panel {
      background-position-y: -109px;
    }
  }

  .magic-item {
    &.poe-item-wrapper {
      border-color: var(--poe-color-magic);
    }
    & .poe-item-header {
      color: var(--poe-color-magic);
      background-position-y: 474px;
    }
    & .poe-item-separator {
      background-position-y: -2px;
    }
    & .poe-item-header-left-panel {
      background-position-y: 508px;
    }
    & .poe-item-header-right-panel {
      background-position-y: 440px;
    }
  }

  .normal-item {
    &.poe-item-wrapper {
      border-color: var(--poe-color-normal);
    }
    & .poe-item-header {
      color: var(--poe-color-normal);
      background-position-y: 578px;
    }
    & .poe-item-separator {
      background-position-y: -8px;
    }
    & .poe-item-header-left-panel {
      background-position-y: 612px;
    }
    & .poe-item-header-right-panel {
      background-position-y: 544px;
    }
  }

  .gem-item {
    &.poe-item-wrapper {
      border-color: var(--poe-color-gem);
    }
    & .poe-item-header {
      color: var(--poe-color-gem);
      background-position-y: 883px;
    }
    & .poe-item-separator {
      background-position-y: -10px;
    }
    & .poe-item-header-left-panel {
      background-position-y: 917px;
    }
    & .poe-item-header-right-panel {
      background-position-y: 849px;
    }
  }

  .currency-item {
    &.poe-item-wrapper {
      border-color: var(--poe-color-currency);
    }
    & .poe-item-header {
      color: var(--poe-color-currency);
      background-position-y: -239px;
    }
    & .poe-item-separator {
      background-position-y: -8px;
    }
    & .poe-item-header-left-panel {
      background-position-y: -205px;
    }
    & .poe-item-header-right-panel {
      background-position-y: -273px;
    }
  }

  .poe-item-influenced div {
    background-image: url(../../assets/Influence-icons.png);
    background-repeat: no-repeat;
    background-size: 27px;
    height: 25px;
  }
  .poe-item-influenced-crusader div {
    background-position-y: 0;
  }
  .poe-item-influenced-warlord div {
    background-position-y: -28px;
  }
  .poe-item-influenced-hunter div {
    background-position-y: -56px;
  }
  .poe-item-influenced-redeemer div {
    background-position-y: -80px;
  }
  .poe-item-influenced-elder div {
    background-position-y: -108px;
  }
  .poe-item-influenced-shaper div {
    background-position-y: -135px;
  }
  .poe-item-influenced-replica div {
    background-position-y: -163px;
  }
}
</style>
