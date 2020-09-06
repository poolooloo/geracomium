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
    XCoordinate: 118.956324,
    YCoordinate: 40.413546,
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
    this.$EventBus.$on("SHOW_MARKER_INFO", (item) => {
      this.centerMap(item);
    });
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
      this.renderIndexMap();
    },
    renderIndexMap() {
      const zoom = this.map.getZoom();
      this.renderEmptyMap(zoom < 10 ? 15 : zoom);
    },
    renderEmptyMap(zoom) {
      if (!this.map) {
        return;
      }
      const { XCoordinate, YCoordinate } = this.position;
      const BaiduMap = this.BaiduMap;
      const map = this.map;

      map.clearOverlays && map.clearOverlays();
      map.centerAndZoom(new BaiduMap.Point(XCoordinate, YCoordinate), zoom);
      // map.setMapStyle({ style: "dark" });
      // 自定义主题
      // map.setMapStyle({ styleJson: customMapConfig });
      map.setMapStyleV2({
        styleId: "b67216402d439fdbb4f8110ed73bf567",
      });

      // 定位
      const govList = this.pieDatum.screeninstitution.institutionList;
      const pointMap = { gov: [], country: [], home: [] };
      govList.forEach((item) => {
        switch (item.InstitutionType) {
          case "养老机构":
            pointMap["gov"].push(item);
            break;
          case "居家养老服务中心":
            pointMap["country"].push(item);
            break;
          case "农村幸福院":
            pointMap["home"].push(item);
            break;
          default:
        }
      });

      Object.keys(pointMap).forEach((type) => {
        this.renderPointInBaiduMap(pointMap[type], type);
      });

      // 隐藏 BAIDU LOGO
      setTimeout(() => {
        const logo = document.querySelectorAll(".anchorBL");
        logo.forEach((elem) => {
          elem.style = "display: none;";
        });
      }, 1e3);
    },

    renderPointInBaiduMap(pointList, type) {
      this.$nextTick(() => {
        pointList &&
          pointList.length &&
          pointList.forEach((item) => {
            this.addMapMarker(item, type);
          });
      });
    },

    addMapMarker(item, type) {
      const BaiduMap = this.BaiduMap;
      const map = this.map;
      const { XCoordinate, YCoordinate } = item;
      const point = new BaiduMap.Point(XCoordinate, YCoordinate);
      const marker = new BaiduMap.Marker(point, {
        icon: new BaiduMap.Icon(
          `./images/${type}-min.png`,
          new BaiduMap.Size(25, 25)
        ),
      }); // 创建标注
      map.addOverlay(marker);
      const label = new BaiduMap.Label(item.InstitutionName, {
        offset: new BaiduMap.Size(20, -10),
      });

      label.setStyle({
        fontSize: "12px", //字号
        color: "#da7804",
        width: "60px",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
        overflow: "hidden",
        cursor: "pointer",
        border: "0 none",
        background: "transparent",
      });

      marker.setLabel(label);

      // 先画图标再设置图标动画
      marker.addEventListener("click", () => {
        this.$EventBus.$emit("SHOW_MARKER_INFO", item);
      });
    },

    centerMap(item) {
      const { XCoordinate, YCoordinate } = item;
      const BaiduMap = this.BaiduMap;
      const map = this.map;

      const allOverlay = map.getOverlays();
      allOverlay.some((item) => {
        if (item.getLabel) {
          const dot = item.getLabel();
          if (dot && dot.content === "danceDot") {
            map.removeOverlay(item);
            true;
          }
        }
      });

      const poniter = new BaiduMap.Point(XCoordinate, YCoordinate);
      map.centerAndZoom(poniter, 15);
      const marker = new BaiduMap.Marker(poniter); // 创建标注

      const label = new BaiduMap.Label("danceDot", {
        offset: new BaiduMap.Size(20, -10),
      });

      label.setStyle({
        fontSize: "12px", //字号
        color: "transparent",
        border: "0 none",
        background: "transparent",
      });

      marker.setLabel(label);
      map.addOverlay(marker);
      marker.setAnimation(2);
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
    left: 40%;
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