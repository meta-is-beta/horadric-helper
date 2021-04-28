<template>
  <div id="app">
    <h1>Poe items</h1>
    <br />
    <div class="poe-demo">
      <poe-item-demo />
    </div>
    <h1>Poe nodes</h1>
    <br />
    <div class="poe-demo">
      <poe-node-demo />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import PoeItemDemo from "./path-of-exile/components/item/demo/poe-item.demo.vue";
import PoeNodeDemo from "./path-of-exile/components/node/demo/poe-node.demo.vue";

export default {
  name: "App",
  components: { PoeItemDemo, PoeNodeDemo },
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
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
