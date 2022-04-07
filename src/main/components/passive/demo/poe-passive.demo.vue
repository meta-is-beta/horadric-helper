<script>
/* eslint-disable no-unused-vars */
import PoePassive from "../poe-passive.vue";
import data from "./poe-passive.data.json";

export default {
  name: "PoePassiveDemo",
  components: {
    PoePassive,
  },
  data() {
    return {
      passives: data.passives,
    };
  },
  mounted() {
    window.HoradricHelper.PathOfExile.applyConfig(
      this.passives.map((n) => n.config)
    );
  },
  render: function (h) {
    return (
      <div>
        {this.passives.map((passive, i) => (
          <PoePassive
            reference={passive.config.reference}
            props={{ ...passive.props }}
          />
        ))}
      </div>
    );
  },
};
</script>

<style>
.poe-passive-showcase {
  margin: 20px;
}
</style>
