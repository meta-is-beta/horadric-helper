<template>
  <div id="app">
    <div class="poe-node-demo">
      <div class="poe-node-showcase-demo">
        <poe-node-showcase reference="node-demo" />
      </div>
      <div class="poe-node-demo-control-panel">
        <h2>node settings</h2>
        <p>
          <label><b>Display mode: </b></label>
          <select @change="nodeDataUpdate" v-model="nodeDisplayMode">
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
            v-model="nodeShowIconInShowcase"
          />
        </p>
        <p v-show="nodeDisplayMode != `Showcase`">
          <label><b>Custom label text: </b></label>
          <textarea
            @change="nodeDataUpdate"
            type="text"
            v-model="nodeCustomLabelText"
            rows="1"
          />
        </p>
        <p>
          <label><b>Icon url</b></label>
          <br />
          <textarea @change="nodeDataUpdate" v-model="nodeIconUrl" rows="3" />
        </p>
        <p>
          <label><b>Node data</b></label>
          <br />
          <textarea @change="nodeDataUpdate" v-model="nodeData" rows="10" />
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
      nodeCustomLabelText: "",
      nodeDisplayMode: "Icon",
      nodeShowIconInShowcase: false,
      nodeData: `Type: Keystone
Acrobatics
--------
30% Chance to Dodge Attack Hits.
50% less Armour, 30% less Energy Shield, 30% less Chance to Block Spell and Attack Damage.`,
      nodeIconUrl:
        "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/1/1a/KeystoneAcrobatics_passive_skill_icon.png",

      itemCustomLabelText: "",
      itemDisplayMode: "Icon",
      itemShowIconInShowcase: false,
      itemImageSize: "auto",
      itemData: `Rarity: Rare
Brood Halo
Harlequin Mask
--------
Quality: +20% (augmented)
Evasion Rating: 319 (augmented)
Energy Shield: 63 (augmented)
--------
Requirements:
Level: 70
Str: 98
Dex: 155
Int: 73
--------
Sockets: G-G-R-B
--------
Item Level: 85
--------
Caustic Arrow has 20% chance to inflict Withered on Hit for 2 seconds base Duration (enchant)
--------
Grants Level 20 Aspect of the Spider Skill
83% increased Evasion and Energy Shield
+98 to maximum Life
Regenerate 26 Life per second
+47% to Lightning Resistance
+1 to Level of Socketed AoE Gems (crafted)
10% increased Area of Effect (crafted)
--------
Elder Item
--------
Has Assailum Skin. You can reclaim this by shift-clicking this item.`,
      itemImageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/5/56/Harlequin_Mask_inventory_icon.png`,
    };
  },
  methods: {
    nodeDataUpdate() {
      if (window.nodeShowcases) {
        window.nodeShowcases.applyOptionsByReference("node-demo", {
          nodeData: this.nodeData,
          iconUrl: this.nodeIconUrl,
          displayMode: this.nodeDisplayMode,
          showIconInShowcase: this.nodeShowIconInShowcase,
          labelText: this.nodeCustomLabelText,
        });
      }
    },
    itemDataUpdate() {
      if (window.itemShowcases) {
        window.itemShowcases.applyOptionsByReference("item-demo", {
          itemData: this.itemData,
          imageUrl: this.itemImageUrl,
          displayMode: this.itemDisplayMode,
          showIconInShowcase: this.itemShowIconInShowcase,
          labelText: this.itemCustomLabelText,
          imageSize: this.itemImageSize,
        });
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
