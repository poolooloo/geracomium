<template>
  <index-section class="component-area-of-people" title="全县老人区域分布">
    <!-- ECHARTS -->
    <echart-wrapper>
      <echart-view
        v-if="finish"
        class="component-gender-of-people-chart"
        canvas-name="gender-of-people"
        :canvas-options="option"
        height="600"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";
import { xColor, grid } from "@/echarts/echart-options";

const option = {
  grid,
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

        this.option.yAxis[0].data = data.map((item) => item.StreetsName);
        this.option.series[0].data = data.map((item) => item.SumPeople);
        this.finish = true;
      } catch (e) {}
    },
  },
};
</script>
