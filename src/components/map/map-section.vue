<template>
  <div class="component-map-section">
    <div class="component-map-widgets top"></div>
    <div class="component-map-widgets bottom"></div>
    <baidu-map />
  </div>
</template>
<script>
import BaiduMap from "@/baidu-map/baidu-map";
export default {
  components: {
    BaiduMap,
  },
};
</script>
<style lang="scss">
.component-map-section {
  position: relative;
  padding: 10px;
  margin-bottom: 33px;
  min-height: 647px;
  height: px2vh(647);
  .component-map-widgets {
    position: absolute;
    width: 100%;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
    }
  }
  .top {
    top: 0;
    left: 0;
    &::before {
      content: "";
      left: 0px;
      top: 0px;
      border-top: 3px solid #d97703;
      border-left: 3px solid #d97703;
    }
    &::after {
      content: "";
      right: 0px;
      top: 0px;
      border-top: 3px solid #d97703;
      border-right: 3px solid #d97703;
    }
  }
  .bottom {
    bottom: 14px;
    left: 0;
    &::before {
      content: "";
      left: 0px;
      top: 0px;
      border-left: 3px solid #d97703;
      border-bottom: 3px solid #d97703;
    }
    &::after {
      content: "";
      right: 0px;
      top: 0px;
      border-right: 3px solid #d97703;
      border-bottom: 3px solid #d97703;
    }
  }
}
</style>