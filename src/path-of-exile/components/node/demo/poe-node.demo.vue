<script>
/* eslint-disable no-unused-vars */
import PoeNode from "../poe-node.vue";
import data from "./poe-node.data.json";

export default {
  name: "PoeNodeDemo",
  components: {
    PoeNode,
  },
  data() {
    return {
      nodes: data.nodes,
    };
  },
  mounted() {
    window.HoradricHelper.applyConfig(this.nodes.map((n) => n.config));
  },
  render: function (h) {
    return (
      <div>
        {this.nodes.map((node, i) => (
          <PoeNode
            reference={node.config.reference}
            props={{ ...node.props }}
          />
        ))}
      </div>
    );
  },
};
</script>

<style>
.poe-node-showcase {
  margin: 20px;
}
</style>
