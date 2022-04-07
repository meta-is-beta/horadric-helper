<template>
  <div>
    <div
      ref="trigger"
      @mouseover="showPopover"
      @mouseleave="hidePopover"
      @click="togglePopover"
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
  name: "PopoverWrapper",
  props: {
    triggerClasses: { type: String, default: `` },
    contentClasses: { type: String, default: `` },
    placement: { type: String, default: `auto` },
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.$root.$el.appendChild(this.$refs["content"]);
    this.show = false;
    this.updateStyles({ show: this.show });
  },
  methods: {
    showPopover(event) {
      event.stopPropagation();
      this.show = true;
      this.updateStyles({ show: this.show });
    },
    hidePopover(event) {
      event.stopPropagation();
      this.show = false;
      this.updateStyles({ show: this.show });
    },
    togglePopover(event) {
      event.stopPropagation();
      this.show = !this.show;
      this.updateStyles({ show: this.show });
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
            middleware: [offset(12), shift(), flip()],
          }
        : {
            middleware: [offset(12), autoPlacement(), shift()],
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
