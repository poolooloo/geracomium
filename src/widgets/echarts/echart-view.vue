<template>
  <canvas
    class="component-echart-view"
    :width="450"
    :height="170"
    :ref="canvasName"
    v-if="canvasName"
  ></canvas>
</template>
<script>
export default {
  name: 'echart-view',
  props: {
    canvasName: String,
    canvasOptions: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      chart: null,
    };
  },
  mounted() {
    this.canvasName && this.canvasOptions && this.renderChart();
  },
  methods: {
    renderChart() {
      try {
        const canvasElem = this.$refs[this.canvasName];
        this.chart = this.$echarts.init(canvasElem, "custom");
        this.chart.setOption(this.canvasOptions);
      } catch (e) {}
    },
  },
};
</script>
<style lang="scss">
.component-echart-view {
  display: block;
  margin: 0 auto !important;
}
</style>