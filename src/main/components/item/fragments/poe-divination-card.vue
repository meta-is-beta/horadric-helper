<template>
  <div>
    <div ref="div-card-wrapper" class="poe-divination-card-wrapper">
      <div class="poe-divination-card-bg-img"></div>
      <div class="poe-divination-card-name">
        <span>{{ name }}</span>
      </div>
      <div class="poe-divination-card-stacks">
        <div>
          <span>{{ this.card.stacks }}</span>
        </div>
      </div>
      <div class="poe-divination-card-description">
        <span
          v-for="(descLine, index) in description"
          :key="index"
          :class="`desc-line-${descLine.rarity}`"
        >
          {{ descLine.text }}
        </span>
      </div>
      <div class="poe-divination-card-flavour-text">
        <span v-for="(flavLine, index) in flavourText" :key="index">
          {{ flavLine }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const rarityRegex = /\((normal|rare|magic|unique|corrupted|gem)\)/gm;

export default {
  name: "PoeDivinationCard",
  props: {
    card: { type: Object, default: () => {} },
    iconUrl: { type: String, default: "" },
  },
  computed: {
    name() {
      return this.card?.name || "";
    },
    description() {
      let description = this.card?.sections?.divCardDescription;
      if (!description) {
        return "";
      }

      if (!Array.isArray(description)) {
        description = [description];
      }

      const descriptionLines = description.map((d) => {
        const rarityMatch = d.match(rarityRegex);
        return {
          text: d.replace(rarityRegex, ""),
          rarity:
            rarityMatch?.length > 0
              ? rarityMatch[0].replace("(", "").replace(")", "")
              : "normal",
        };
      });

      return descriptionLines;
    },
    flavourText() {
      const flavourText = this.card?.sections?.flavourText;
      if (!flavourText) {
        return "";
      }

      if (Array.isArray(flavourText)) {
        return flavourText;
      }
      return [flavourText];
    },
  },
  watch: {
    iconUrl: {
      immediate: false,
      handler(value) {
        if (value) {
          const imgStyle = this.$refs["div-card-wrapper"]?.style;

          if (imgStyle) {
            imgStyle.backgroundImage = `url("${value}")`;
          }
        }
      },
    },
  },
  mounted() {
    if (this.iconUrl) {
      const imgStyle = this.$refs["div-card-wrapper"]?.style;

      if (imgStyle) {
        imgStyle.backgroundImage = `url("${this.iconUrl}")`;
      }
    }
  },
};
</script>

<style lang="scss">
.poe-divination-card-wrapper,
.poe-divination-card-bg-img {
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  max-width: 270px;
  width: 270px;
  height: 410px;
}

.poe-divination-card-bg-img {
  background-image: url(../../../assets/Divination_card_frame.png);
}

.poe-divination-card-wrapper {
  background-position: 20px 35px;
  background-size: 234px;
}

.poe-divination-card-name {
  color: black;
  position: absolute;
  margin-top: 12px;
}

.poe-divination-card-stacks {
  position: absolute;
  margin-top: 167px;
  height: 70px;
  width: 270px;
  display: flex;
  align-items: center;
  & div {
    width: 44px;
    margin-left: 24px;
  }
}

.poe-divination-card-description {
  position: absolute;
  margin-top: 204px;
  height: 70px;
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  & .desc-line-normal {
    color: var(--poe-color-normal);
  }
  & .desc-line-magic {
    color: var(--poe-color-magic);
  }
  & .desc-line-rare {
    color: var(--poe-color-rare);
  }
  & .desc-line-unique {
    color: var(--poe-color-unique);
  }
  & .desc-line-corrupted {
    color: var(--poe-color-corrupted);
  }
  & .desc-line-gem {
    color: var(--poe-color-gemitem);
  }
}

.poe-divination-card-flavour-text {
  position: absolute;
  margin-top: 274px;
  margin-left: 1px;
  height: 121px;
  width: 268px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  color: var(--poe-color-unique);
}
</style>
