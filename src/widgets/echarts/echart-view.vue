<template>
  <div class="component-echart-view">
    <canvas class="canvas"
      :ref="canvasName"
      v-if="canvasName"
      :width="width"
      :height="height"></canvas>
  </div>
</template>
<script>
export default {
  name: "echart-view",
  props: {
    width: {
      type: String,
      default: () => "205",
    },
    height: {
      type: String,
      default: () => "150",
    },
    canvasName: String,
    canvasOptions: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      myChart: null,
      activeIndex: 1,
    };
  },
  mounted() {
    this.canvasName && this.canvasOptions && this.renderChart();
  },
  methods: {
    renderChart() {
      try {
        const canvasElem = this.$refs[this.canvasName];
        this.myChart = this.$echarts.init(canvasElem, "custom");
        this.myChart.setOption(this.canvasOptions);
        this.init();
      } catch (e) {}
    },
    init() {
      const myChart = this.myChart;
      let index = this.activeIndex;

      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 1,
      });

      myChart.on("mouseover", function (e) {
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: 1,
        });

        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index,
          });
        }

        if (e.dataIndex == 0) {
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          });
        }
      });

      //当鼠标离开时，把当前项置为选中
      myChart.on("mouseout", (e) => {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
      });
    },
  },
};
</script>
<style lang="scss">
.component-echart-view {
  position: relative;
  width: 205px;
  .canvas {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>