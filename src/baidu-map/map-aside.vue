<template>
  <div class="map-aside">
    <p class="flex-box">
      <span class="title">机构列表({{ count }})</span>
      <svg-icon icon="triangle"></svg-icon>
    </p>
    <ul class="gov-list">
      <li class="gov-item" v-for="(item, i) in govList" :key="i">
        <svg-icon icon="gov"></svg-icon>
        <span class="gov-item-name">{{ item.InstitutionName }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      count: 0,
      govList: [],
    };
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
  mounted() {
    try {
      const govList = this.pieDatum.screeninstitution.institutionList;
      this.govList = govList;
      this.count = this.govList.length;
    } catch (e) {}
  },
};
</script>
<style lang="scss">
.map-aside {
  display: flex;
  flex-direction: column;
  padding: 12px;
  color: #cfebff;
  background: rgba(0, 21, 52, 0.9);
  border: 1px solid #3a71bc;
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .gov-list {
    flex: 1;
    margin-top: 12px;
    overflow: auto;
  }
  .gov-item {
    display: flex;
    align-items: center;
    height: 28px;
    padding-left: 8px;
    margin-bottom: 3px;
    line-height: 28px;
    font-size: 12px;
    background: rgba(21, 54, 103, 0.5);
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .gov-item-name {
    margin-left: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>