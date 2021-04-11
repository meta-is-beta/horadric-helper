import defaultOptions from "@/shared/default-options/default-node-options";

export default {
  data: function () {
    return {
      options: { ...defaultOptions },
      node: {},
      showNode: false,
    };
  },
  props: {
    id: { type: String, default: "" },
    reference: { type: String, default: "" },
    wrapperClass: { type: String, default: "" },
    tooltipWrapperClass: { type: String, default: "" },
  },
  mounted() {
    this.registerShowcase();
  },
  methods: {
    applyOptions(options) {
      this.options = {
        ...this.options,
        ...options,
      };
    },
    registerShowcase() {
      window.nodeShowcases = window.nodeShowcases || {
        nodes: [],
        applyOptionsByReference(reference, options) {
          const nodes = window.nodeShowcases.nodes[reference];
          if (!nodes) {
            return;
          }

          nodes.forEach((node) => {
            node.applyOptions(options);
          });
        },
        applyOptionsById(nodeId, options) {
          const nodes = Object.values(window.nodeShowcases.nodes);
          if (!nodes) {
            return;
          }

          const nodesWithId = nodes.find((x) => x.id === nodeId);
          if (!nodesWithId) {
            return;
          }

          nodesWithId.applyOptions(options);
        },
      };

      const nodeObject = {
        instance: this,
        applyOptions: this.applyOptions,
        reference: this.reference,
        id: this.id,
      };

      if (window.nodeShowcases.nodes[this.reference]) {
        window.nodeShowcases.nodes[this.reference].push(nodeObject);
      } else {
        window.nodeShowcases.nodes[this.reference] = [nodeObject];
      }
    },
    processNodeData() {
      throw new Error();
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function (options) {
        try {
          this.node = this.processNodeData(options.nodeData);
          this.showNode = true;
        } catch (e) {
          this.showNode = false;
        }
      },
    },
  },
};
