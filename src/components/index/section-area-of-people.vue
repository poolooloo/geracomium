<template>
  <index-section class="component-area-of-people" title="全县老人区域分布">
    <!-- ECHARTS -->
    <echart-wrapper>
      <echart-view
        width="450"
        height="560"
        v-if="finish"
        canvas-name="gender-of-people"
        :canvas-options="option"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";
import { xColor } from "@/echarts/echart-options";

const option = {
  grid: {
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    height: "90%",
    width: "90%",
    containLabel: true,
  },
  color: ["#2988e4"],
  yAxis: [
    {
      type: "category",
      data: [],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: xColor,
    },
  ],
  xAxis: [
    {
      type: "value",
      axisLabel: xColor,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      type: "bar",
      barWidth: "60%",
      barGap: "-100%" /*这里设置包含关系，只需要这一句话*/,
      data: [],
      itemStyle: {
        normal: {
          color: function (params) {
            const colorList = ["#3152cd", "#2988e4", "#53c6e7"];
            return colorList[params.dataIndex % 3];
          },

          label: {
            show: true,
            position: "right",
            formatter: "{c}",
          },
        },
      },
    },
    {
      type: "bar",
      barWidth: "60%",
      data: ["47", "59", "95", "74"],
      name: "总量",
      itemStyle: {
        normal: {
          color: "rgba(255,255,255,0.03)",
        },
      },
    },
  ],
};
export default {
  components: {
    IndexSection,
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
  data() {
    return {
      option,
      finish: false,
      echartsData: {
        legendData: [],
        seriesData: [],
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      try {
        const data = this.pieDatum.streetsInfos.List.sort(
          (a, b) => a.SumPeople - b.SumPeople
        );
        const __data = data.map((item) => item.SumPeople);
        const max = Math.max(...__data);
        this.option.yAxis[0].data = data.map((item) => item.StreetsName);
        this.option.series[0].data = __data;
        this.option.series[1].data = new Array(__data.length).fill(max);
        this.finish = true;
      } catch (e) {}
    },
  },
};
</script>
<style lang="scss">
.component-area-of-people {
  .component-echart-view {
    width: 100%;
    height: 400px;
    overflow: auto;
    margin-top: 30px;
    .canvas {
      position: static;
      top: 0;
      transform: translateY(0);
    }
  }
}
</style>