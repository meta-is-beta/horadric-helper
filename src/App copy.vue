<template>
  <div id="app">
    <div class="poe-node-demo">
      <div class="poe-node-showcase-demo">
        <poe-node-showcase
          :displayMode="nodeProps.displayMode"
          :labelText="nodeProps.customLabelText"
          :showIconInShowcase="nodeProps.showIconInShowcase"
          reference="node-demo"
        />
      </div>
      <div class="poe-node-demo-control-panel">
        <h2>node settings</h2>
        <p>
          <label><b>Display mode: </b></label>
          <select @change="nodeDataUpdate" v-model="nodeProps.displayMode">
            <option disabled value="">Please select one</option>
            <option>Icon</option>
            <option>Text</option>
            <option>Showcase</option>
          </select>
          <label for="node-icon-checkbox" style="margin-left: 10px"
            ><b>Show icon in showcase: </b></label
          >
          <input
            id="node-icon-checkbox"
            @change="nodeDataUpdate"
            type="checkbox"
            v-model="nodeProps.showIconInShowcase"
          />
        </p>
        <p v-show="nodeProps.displayMode != `Showcase`">
          <label><b>Custom label text: </b></label>
          <textarea
            @change="nodeDataUpdate"
            type="text"
            v-model="nodeProps.customLabelText"
            rows="1"
          />
        </p>
        <p>
          <label><b>Icon url</b></label>
          <br />
          <textarea
            @change="nodeDataUpdate"
            v-model="nodeOptions.nodeOptions"
            rows="3"
          />
        </p>
        <p>
          <label><b>Node data</b></label>
          <br />
        </p>
      </div>
    </div>
    <div class="poe-node-demo">
      <div class="poe-item-showcase-demo">
        <poe-item-showcase reference="item-demo" />
      </div>
      <div class="poe-item-demo-control-panel">
        <h2>item settings</h2>
        <p>
          <label><b>Display mode: </b></label>
          <select @change="itemDataUpdate" v-model="itemDisplayMode">
            <option disabled value="">Please select one</option>
            <option>Icon</option>
            <option>Text</option>
            <option>Showcase</option>
          </select>
          <label for="item-icon-checkbox" style="margin-left: 10px">
            <b>Show image in showcase: </b>
          </label>
          <input
            id="item-icon-checkbox"
            @change="itemDataUpdate"
            type="checkbox"
            v-model="itemShowIconInShowcase"
          />
          <label style="margin-left: 10px">
            <b>Image size: </b>
          </label>
          <select @change="itemDataUpdate" v-model="itemImageSize">
            <option disabled value="">Please select one</option>
            <option>auto</option>
            <option>sm</option>
            <option>md</option>
            <option>lg</option>
            <option>xlg</option>
          </select>
        </p>
        <p v-show="itemDisplayMode != `Showcase`">
          <label><b>Custom label text: </b></label>
          <textarea
            @change="itemDataUpdate"
            type="text"
            v-model="itemCustomLabelText"
            rows="1"
          />
        </p>
        <p>
          <label><b>Image url</b></label>
          <br />
          <textarea @change="itemDataUpdate" v-model="itemImageUrl" rows="3" />
        </p>
        <p>
          <label><b>Item data</b></label>
          <br />
          <textarea @change="itemDataUpdate" v-model="itemData" rows="10" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PoeItemShowcase from "@/path-of-exile/components/poe-item-showcase.vue";
import PoeNodeShowcase from "@/path-of-exile/components/poe-node-showcase.vue";

export default {
  name: "App",
  components: {
    PoeItemShowcase,
    PoeNodeShowcase,
  },
  data() {
    return {
      nodeOptions: {
        dataObject: {
          name: "Acrobatics",
          type: "keystone",
          description: [
            "30% Chance to Dodge Attack Hits.",
            "50% less Armour, 30% less Energy Shield, 30% less Chance to Block Spell and Attack Damage.",
          ],
        },
        imageSrc:
          "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/1/1a/KeystoneAcrobatics_passive_skill_icon.png",
      },
      nodeProps: {
        customLabelText: "",
        displayMode: "Icon",
        showIconInShowcase: false,
      },
      itemCustomLabelText: "",
      itemDisplayMode: "Icon",
      itemShowIconInShowcase: false,
      itemImageSize: "auto",
      itemData: `Rarity: Rare
Woe Road
Hydrascale Boots
--------
Quality: +20% (augmented)
Armour: 161 (augmented)
Evasion Rating: 175 (augmented)
--------
Requirements:
Level: 70
Str: 155
Dex: 56
Int: 68
--------
Sockets: R-R R-R
--------
Item Level: 73
--------
70% increased Mana Regeneration Rate if you've cast a Spell Recently (enchant)
--------
+27 to Dexterity
+28 to Armour
+40 to Evasion Rating
+82 to maximum Life
+42% to Lightning Resistance
30% increased Movement Speed
24% increased Stun and Block Recovery
--------
Corrupted
`,
      itemImageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/5/56/Harlequin_Mask_inventory_icon.png`,
    };
  },
  methods: {
    nodeDataUpdate() {
      if (window.HoradricHelper.nodeShowcases) {
        window.HoradricHelper.nodeShowcases.applyOptionsByReference(
          "node-demo",
          this.nodeOptions
        );
      }
    },
    itemDataUpdate() {
      if (window.HoradricHelper.itemShowcases) {
        window.HoradricHelper.itemShowcases.applyOptionsByReference(
          "item-demo",
          {
            rawData: this.itemData,
            imageUrl: this.itemImageUrl,
            displayMode: this.itemDisplayMode,
            showIconInShowcase: this.itemShowIconInShowcase,
            labelText: this.itemCustomLabelText,
            imageSize: this.itemImageSize,
          }
        );
      }
    },
  },
  mounted() {
    this.nodeDataUpdate();
    this.itemDataUpdate();
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: rgb(39, 39, 39);
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: row;
  & input[type="checkbox"],
  & input[type="radio"] {
    vertical-align: middle;
    position: relative;
    bottom: 1px;
  }
  & textarea {
    resize: vertical;
  }
}
.poe-node-demo {
  display: flex;
  flex-direction: column;
  width: 50%;

  & .poe-node-demo-control-panel,
  & .poe-item-demo-control-panel {
    margin-left: 25px;
    margin-right: 25px;
    padding: 20px;
    background-color: #313131;
    border-radius: 16px;
    box-shadow: 1px 1px 20px 0px rgb(0 0 0 / 20%);

    & h2 {
      font-size: 22px !important;
      margin-top: 10px;
      text-transform: uppercase;
    }
    & label,
    & h2 {
      color: white;
      font: 400 13.3333px Arial;
    }
    & textarea {
      width: 100%;
    }
    & textarea,
    & select {
      margin-top: 10px;
      background-color: rgb(39, 39, 39);
      color: white;
    }
  }
  & .poe-node-showcase-demo,
  & .poe-item-showcase-demo {
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 250px;
    margin-top: 20px;
    margin-bottom: 20px;

    & .poe-node-showcase,
    & .poe-item-showcase {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
