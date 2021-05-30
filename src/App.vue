<template>
  <div id="app">
    <h1>Poe items</h1>
    <br />
    <div class="poe-demo">
      <poe-item-demo />
    </div>
    <h1>Poe passives</h1>
    <br />
    <div class="poe-demo">
      <poe-passive-demo />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import PoeItemDemo from "./path-of-exile/components/item/demo/poe-item.demo.vue";
import PoePassiveDemo from "./path-of-exile/components/passive/demo/poe-passive.demo.vue";

export default {
  name: "App",
  components: { PoeItemDemo, PoePassiveDemo },
};
</script>

<style lang="scss">
body {
  background-color: #1a1c1e;
}
html,
body {
  height: 100%;
}
h1 {
  text-align: center;
  color: #b9b9b9;
}
.poe-demo,
.poe-demo > div {
  display: flex;
  align-items: baseline;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
}
</style>
