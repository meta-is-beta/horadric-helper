<template>
  <div>
    <div
      ref="trigger"
      @mouseover="showPopover"
      @mouseleave="hidePopover"
      :class="`${triggerClasses}`"
    >
      <slot name="trigger"></slot>
    </div>
    <div ref="content" :class="`${contentClasses}`">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import {
  computePosition,
  autoPlacement,
  offset,
  flip,
  shift,
} from "@floating-ui/dom";

const validPlacements = ["bottom", "top", "right", "left"];

export default {
  name: "GenericPopover",
  props: {
    triggerClasses: { type: String, default: `` },
    contentClasses: { type: String, default: `` },
    placement: { type: String, default: `auto` },
  },
  mounted() {
    this.$root.$el.appendChild(this.$refs["content"]);
    this.updateStyles({ show: false });
  },
  methods: {
    showPopover() {
      this.updateStyles({ show: true });
    },
    hidePopover() {
      this.updateStyles({ show: false });
    },
    updateStyles({ show }) {
      const _this = this;

      if (!_this.$refs["trigger"] || !_this.$refs["content"]) {
        return;
      }

      const applyStyles = function (props) {
        if (!_this.$refs["content"]) {
          return;
        }

        Object.assign(_this.$refs["content"].style, {
          position: props?.strategy || "absolute",
          left: `${props?.x || 0}px`,
          top: `${props?.y || 0}px`,
          display: `${props?.show ? "block" : "none"}`,
        });
      };

      applyStyles({ show });

      const placementConfig = validPlacements.includes(this.placement)
        ? {
            placement: this.placement,
            middleware: [offset(10), shift(), flip()],
          }
        : {
            middleware: [offset(10), autoPlacement(), shift()],
          };

      computePosition(
        this.$refs["trigger"],
        this.$refs["content"],
        placementConfig
      ).then((props) => applyStyles({ ...props, show }));
    },
  },
};
</script>

<style></style>
