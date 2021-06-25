<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div :class="`poe-sockets ` + (showBackground ? `poe-icon-label` : ``)">
    <template v-for="(socket, index) in socketsList">
      <div v-if="socketReferences && socketReferences[index + 1]">
        <poe-item
          :key="`${index}-item`"
          :reference="socketReferences[index + 1]"
          show-as-text
          icon-inside
          :classes="`poe-socketed-item poe-socket poe-item-socket-${socket}`"
          label-text="◉"
          :ref="`poe-item-${index}`"
        />
      </div>
      <div
        :key="`${index}-socket`"
        :class="getSocketClasses(socket, index)"
      ></div>
      <div
        v-if="linksList[index]"
        :key="`${index}-link`"
        class="socket-link"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: "PoeItemSockets",
  components: {
    "poe-item": () => import("./poe-item.vue"),
  },
  data: function () {
    return {
      socketedItemsPassiveStatus: {},
    };
  },
  props: {
    sockets: { type: String, reqired: true },
    showBackground: { type: Boolean, default: true },
    socketReferences: { type: Object, default: () => {} },
  },
  mounted() {
    if (this.socketReferences) {
      Object.values(this.socketReferences).forEach((r) => {
        let referencedItem = window.HoradricHelper.PathOfExile.showcases[r];
        if (!referencedItem) {
          return;
        }

        this.socketedItemsPassiveStatus[r] =
          (referencedItem.data.class &&
            referencedItem.data.class.startsWith("Support")) ||
          (referencedItem.data.baseName &&
            referencedItem.data.baseName.includes("Support"));
      });
    }
  },
  methods: {
    getSocketClasses(socket, index) {
      let classes = `poe-socket poe-socket-${socket} `;

      if (!this.socketReferences || !this.socketedItemsPassiveStatus) {
        return classes;
      }

      let socketIsPassive = this.socketedItemsPassiveStatus[
        this.socketReferences[index + 1]
      ];

      if (socketIsPassive) {
        classes += "poe-socketed-passive";
      } else {
        classes += "poe-socketed-nonpassive";
      }

      return classes;
    },
  },
  computed: {
    socketsList() {
      return this.sockets.split(/ |-/);
    },
    linksList() {
      return this.sockets
        .split(/[A-Z]+/)
        .filter((x) => !!x)
        .map((x) => x === "-");
    },
  },
};
</script>

<style lang="scss">
.poe-sockets {
  display: flex;
  transform-origin: center;
  width: max-content;
  margin-left: auto;
  margin-right: auto;

  & .socket-link {
    background-image: url(./../../assets/Socket-link.png);
    width: 20px;
    height: 14px;
    background-size: 20px;
    margin-top: 10px;
    z-index: 20;
    margin-left: -9px;
    margin-right: -9px;
  }

  &.poe-icon-label {
    background-color: rgba(1, 1, 1, 0.5);
  }

  & div {
    padding: 0 !important;
    line-height: 0 !important;
  }

  & > .poe-socket {
    height: 27px;
    width: 27px;
    background-image: url(./../../assets/Sockets.png);
    background-size: 83px;
    margin: 3px;
    &.poe-socketed-nonpassive {
      background-position-x: -28px;
    }
    &.poe-socketed-passive {
      background-position-x: -56px;
    }
  }

  .poe-socket-R {
    background-position-y: 0px;
  }
  .poe-socket-B {
    background-position-y: -27px;
  }
  .poe-socket-G {
    background-position-y: -54px;
  }
  .poe-socket-W {
    background-position-y: -82px;
  }
  .poe-socket-A {
    background-position-y: -272px;
    &.poe-socketed-passive {
      background-position-x: -28px !important;
    }
  }
  .poe-socket-D {
    background-position-y: -300px;
    &.poe-socketed-passive {
      background-position-x: -28px !important;
    }
  }

  .poe-socketed-item {
    margin: 0 !important;
    position: absolute;
    transform: translate(10px, 7px);
    .poe-item-link {
      color: transparent !important;
      cursor: pointer !important;
      height: 25px !important;
      width: 25px !important;
      line-height: 0px !important;
      font-size: 0px !important;

      &:hover {
        box-shadow: -0.5px -0.5px 5px 2px rgb(255 255 255 / 70%),
          inset 0 0 4px rgb(255 255 255 / 70%);
        border-radius: 14px;
      }
    }
  }

  .poe-item-socket-R .poe-item-link {
    transform: translate(-6.5px, -7px);
  }
  .poe-item-socket-B .poe-item-link {
    transform: translate(-5.5px, -6.5px);
  }
  .poe-item-socket-G .poe-item-link {
    transform: translate(-6px, -7px);
  }
  .poe-item-socket-W .poe-item-link {
    transform: translate(-6px, -7.5px);
  }
  .poe-item-socket-D .poe-item-link {
    transform: translate(-6px, -7.5px);
  }
  .poe-item-socket-A .poe-item-link {
    transform: translate(-5.5px, -7px);
    &:hover {
      box-shadow: -0.5px -0.5px 5px 2px rgb(0 0 0 / 70%),
        inset 0 0 4px rgb(0 0 0 / 70%);
    }
  }
}
</style>
