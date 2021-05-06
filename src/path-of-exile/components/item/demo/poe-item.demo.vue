<script>
/* eslint-disable no-unused-vars */
import PoeItem from "../poe-item.vue";
import data from "./poe-item.data.json";

export default {
  name: "PoeItemDemo",
  components: {
    PoeItem,
  },
  data() {
    return {
      items: data.items,
    };
  },
  mounted() {
    window.HoradricHelper.applyConfig(this.items.map((i) => i.config));
  },
  render: function (h) {
    return (
      <div>
        {this.items.map((item, i) => (
          <PoeItem
            reference={item.config.reference}
            props={{ ...item.props }}
          />
        ))}
      </div>
    );
  },
};
</script>

<style>
.poe-item-showcase {
  margin: 20px;
}
</style>
