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
    this.nodes.forEach((node) => {
      window.HoradricHelper.applyConfig(node.reference, node.data);
    });
  },
  render: function (h) {
    return (
      <div>
        {this.nodes.map((node, i) => (
          <PoeNode reference={node.reference} props={{ ...node.props }} />
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
