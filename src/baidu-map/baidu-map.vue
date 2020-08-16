<template>
  <div class="component-baidu-map">
    <div id="container"></div>
  </div>
</template>

<script>
// import customMapConfig from "@/baidu-map/custom-map-config.json";

const position = [
  {
    x: 121.47,
    y: 31.23,
  },
];

export default {
  name: "baidu-map",
  mounted() {
    this.init();
  },
  data() {
    return {
      BaiduMap: null,
      map: null,
      position: position[0],
    };
  },
  methods: {
    init() {
      if (!window.BMap) {
        return;
      }

      const BaiduMap = (this.BaiduMap = window.BMap);
      this.map = new BaiduMap.Map("container");
      // 鼠标滚动缩放
      this.map.enableScrollWheelZoom(true);
      this.renderBaiduMap();
    },
    renderBaiduMap() {
      this.renderIndexMap();
    },
    renderIndexMap() {
      const zoom = this.map.getZoom();
      this.renderEmptyMap(zoom < 10 ? 12 : zoom);
    },
    renderEmptyMap(zoom) {
      if (!this.map) {
        return;
      }
      const { x, y } = this.position;
      const BaiduMap = this.BaiduMap;
      const map = this.map;

      map.clearOverlays && map.clearOverlays();
      map.centerAndZoom(new BaiduMap.Point(x, y), zoom);
      console.log("Render Baidu Map");
      map.setMapStyle({ style: 'dark'});
      // map.setMapStyle({ styleJson: customMapConfig });
    },
  },
};
</script>

<style lang="scss">
.component-baidu-map {
  width: 100%;
  height: 100%;
  #container {
    height: 100%;
  }
}
</style>