<template>
  <div v-if="show" :class="classesComputed">
    <div v-if="displayMode === `showcase`" class="poe-item-showcase-wrapper">
      <!-- Showcase -->
      <poe-item-showcase
        :item="item"
        :iconUrl="iconUrl"
        :iconSize="_iconSize"
        :showIconInside="_iconInside"
        :showIconOutside="_iconOutside"
        :dimedSections="dimedSections"
        :hiddenSections="hiddenSections"
        :showSockets="_showSocketsInShowcase"
        :socketReferences="socketReferences"
        :showBorder="showBorder"
      />
    </div>
    <div v-else class="poe-item-showcase-wrapper">
      <popover-wrapper
        :contentClasses="`poe-item-showcase-popover`"
        :placement="_popoverPosition"
      >
        <template slot="content">
          <poe-item-showcase
            :item="item"
            :iconUrl="iconUrl"
            :iconSize="_iconSize"
            :showIconInside="_iconInside"
            :showIconOutside="_iconOutside"
            :dimedSections="dimedSections"
            :hiddenSections="hiddenSections"
            :showSockets="_showSocketsInShowcase"
            :socketReferences="socketReferences"
            :showBorder="showBorder"
          />
        </template>
        <template slot="trigger">
          <div>
            <!-- Icon -->
            <div v-if="displayMode === `icon`">
              <svg class="poe-item-stacks" v-if="shouldShowStacksOnIcon">
                <text x="2" y="18">{{ item.stacks }}</text>
              </svg>
              <poe-item-image
                :iconSize="_iconSize"
                :iconUrl="iconUrl"
                :type="item.type"
              />
              <poe-item-sockets
                :sockets="item.sockets"
                :socketReferences="socketReferences"
                v-if="shouldShowSockets"
              />
              <div class="poe-icon-label" v-if="!showCustomLabel">
                <div>{{ labelTextComputed }}</div>
                <div class="poe-icon-sublabel" v-if="shouldShowBaseName">
                  {{ item.baseName }}
                </div>
              </div>
              <div class="poe-icon-label" v-else>
                <div>
                  {{ labelTextComputed }}
                </div>
              </div>
            </div>
            <!-- Text -->
            <div v-else :class="linkClassesComputed">
              {{ labelTextComputed }}
            </div>
          </div>
        </template>
      </popover-wrapper>
    </div>
  </div>
</template>

<script>
import PoeItemShowcase from "./fragments/poe-item-showcase.vue";
import PoeItemImage from "./fragments/poe-item-image.vue";
import PoeItemSockets from "./fragments/poe-item-sockets.vue";
import PopoverWrapper from "../popover-wrapper.vue";
import entityMixin from "./../../mixins/entity.mixin";

export default {
  name: "PoeItem",
  components: {
    PoeItemShowcase,
    PoeItemImage,
    PoeItemSockets,
    PopoverWrapper,
  },
  mixins: [entityMixin],
  computed: {
    item() {
      return this.data;
    },
    socketReferences() {
      return this.extensions ? this.extensions.socketReferences : void 0;
    },
    classesComputed() {
      let classes = `poe-item-showcase ${this._classes}`;

      switch (this.displayMode) {
        case "showcase":
          classes += " poe-item-display-showcase";
          break;
        case "icon":
          classes += " poe-item-display-icon";
          break;
        case "text":
        default:
          classes += " poe-item-display-text";
          break;
      }

      return classes;
    },
    popoverClassesComputed() {
      return `poe-showcase-popover poe-item-showcase-popover ${this._popoverClasses}`;
    },
    linkClassesComputed() {
      let classes = `poe-item-link`;
      if (this.item.rarity) {
        classes += ` poe-item-link-${this.item.rarity.toLowerCase()}`;
      }
      return classes;
    },
    shouldShowBaseName() {
      return this.item.baseName && this.item.baseName != this.item.name;
    },
    shouldShowSockets() {
      return this._showSockets && this.item.sockets;
    },
  },
};
</script>

<style lang="scss">
@use "./../../_styles" as styles;

.poe-item-showcase-popover {
  isolation: isolate;
  z-index: 3;

  .poe-item-wrapper {
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  }
}

.poe-item-showcase,
.poe-item-showcase-popover {
  @include styles.font;
  @include styles.colors;

  display: inline-block;
  .poe-item-link-unique {
    color: var(--poe-color-unique);
  }
  .poe-item-link-rare {
    color: var(--poe-color-rare);
  }
  .poe-item-link-magic {
    color: var(--poe-color-magic);
  }
  .poe-item-link-normal {
    color: var(--poe-color-normal);
  }
  .poe-item-link-gem {
    color: var(--poe-color-gem);
  }
  .poe-item-showcase-wrapper {
    display: flex;
  }
}
</style>
