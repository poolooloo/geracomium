<template>
  <div class="map-icon-bar">
    <div class="bar-item" v-for="(item,i) in icons" :key="i">
      <svg-icon
        :icon="iconNames[i].name"
        :style="{
          color: iconNames[i].color
        }"></svg-icon>
      <span class="bar-item-name">{{item.code}}</span>
      <span>({{item.value}})</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      icons: [],
      iconNames: [
        {
          name: "gov",
          color: "#fdc800",
        },
        {
          name: "country",
          color: "#da4459",
        },
        {
          name: "home",
          color: "#69ef9e",
        },
      ],
    };
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
  mounted() {
    try {
      const icons = this.pieDatum.screeninstitution.institutionCount.EnumList;
      this.icons = icons;
    } catch (e) {}
  },
};
</script>
<style lang="scss">
.map-icon-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  height: 36px;
  font-size: 12px;
  line-height: 16px;
  background: rgba(35, 72, 128, 0.9);
  .bar-item {
    margin-right: 25px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  .bar-item-name {
    margin: 0 4px 0 7px;
  }
}
</style>