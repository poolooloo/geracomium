<template>
  <index-section class="component-gender-of-people" title="全县老人数及性别占比">
    <echart-wrapper>
      <echart-view
        v-if="finish || true"
        class="component-gender-of-people-chart"
        canvas-name="gender-of-people"
        :canvas-options="option"
        width="120"
        height="120"
        ref="echart"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";

const option = {
  legend: {
    orient: "vertical",
    left: 10,
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"], // api
  },
  series: [
    {
      type: "pie",
      radius: ["60%", "80%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "12",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
    },
  ],
};

export default {
  components: {
    IndexSection,
  },
  data() {
    return {
      finish: false,
      option,
      myChart: null,
      activeIndex: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const myChart = (this.myChart = this.$refs.echart.chart);
      let index = this.activeIndex;

      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0,
      });

      myChart.on("mouseover", function (e) {
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: 0,
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
.component-gender-of-people {
  .component-gender-echarts__wrapper {
    min-height: 195px;
    height: px2vh(195);
  }
}
</style>