<template>
  <div class="component-baidu-map">
    <div id="container"></div>
    <map-info />
    <map-icon-bar />
    <map-aside />
  </div>
</template>

<script>
// 自定义主题 json
// import customMapConfig from "@/baidu-map/custom-map-config.json";
import { mapState } from "vuex";
import mapAside from "./map-aside";
import mapIconBar from "./map-icon-bar";
import mapInfo from "./map-info";

const position = [
  {
    x: 118.956324,
    y: 40.413546,
  },
];

export default {
  name: "baidu-map",
  components: {
    mapAside,
    mapIconBar,
    mapInfo,
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
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
      map.setMapStyle({ style: "dark" });
      // 自定义主题
      // map.setMapStyle({ styleJson: customMapConfig });

      // 定位
      const govList = this.pieDatum.screeninstitution.institutionList;
      console.log(govList)

      // 隐藏 BAIDU LOGO
      setTimeout(() => {
        const logo = document.querySelectorAll(".anchorBL");
        logo.forEach((elem) => {
          elem.style = "display: none;";
        });
      }, 1e3);
    },
  },
};
</script>

<style lang="scss">
.component-baidu-map {
  position: relative;
  width: 100%;
  height: 100%;
  #container {
    height: 100%;
  }
  .map-info,
  .map-icon-bar,
  .map-aside {
    position: absolute;
    z-index: 1;
  }

  .map-info {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .map-icon-bar {
    left: 20px;
    bottom: 24px;
  }

  .map-aside {
    width: 178px;
    max-height: calc(100% - 48px);
    top: 24px;
    right: 24px;
  }
}
</style>