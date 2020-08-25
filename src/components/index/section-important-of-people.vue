<template>
  <index-section class="component-important-of-people" title="全县五保老人统计">
    <echart-wrapper class="flex-box">
      <div class="echarts flex-box">
        <echart-view
          v-if="finish"
          class="component-important-of-people-chart"
          canvas-name="important-of-people-right"
          :canvas-options="option1"
          width="150"
          height="150"
          ref="echart"
        />
        <echart-view
          v-if="finish"
          class="component-important-of-people-chart"
          canvas-name="important-of-people-right"
          :canvas-options="option2"
          width="150"
          height="150"
          ref="echart"
        />
      </div>
      <div class="echart-data-info" v-if="finish">
        <div class="item">
          <p class="count">{{ dataMap.CountyWuBao.PeopleNum }}</p>
          <p class="name">{{ dataMap.CountyWuBao.Name }}</p>
        </div>
        <div class="item">
          <p class="count">{{ dataMap.CountyWuBaoShiNeng.PeopleNum }}</p>
          <p class="name">{{ dataMap.CountyWuBaoShiNeng.Name }}</p>
        </div>
      </div>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";

const option1 = {
  legend: {
    orient: "vertical",
    left: 10,
    data: [], // api
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
      data: [],
    },
  ],
};
const option2 = {
  legend: {
    orient: "vertical",
    left: 10,
    data: [], // api
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
      data: [],
    },
  ],
};
export default {
  components: {
    IndexSection,
  },
  data() {
    return {
      option1,
      option2,
      finish: false,
      echartsData1: {
        legendData: [],
        seriesData: [],
      },
      echartsData2: {
        legendData: [],
        seriesData: [],
      },
      dataMap: {},
    };
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      try {
        const data = this.pieDatum.peopleNums[1].List;
        const allPeople = this.pieDatum.peopleNums[0].List.find(
          (item) => item.Code === "CountyPeople"
        );

        data.forEach((item) => {
          this.dataMap[item.Code] = item;
        });
        this.echartsData1.legendData = [
          allPeople.Name,
          this.dataMap.CountyWuBao.Name,
        ];
        this.echartsData1.seriesData = [
          {
            name: allPeople.Name,
            value: allPeople.PeopleNum,
          },
          {
            name: this.dataMap.CountyWuBao.Name,
            value: this.dataMap.CountyWuBao.PeopleNum,
          },
        ];
        this.echartsData2.legendData = [
          this.dataMap.CountyWuBao.Name,
          this.dataMap.CountyWuBaoShiNeng.Name,
        ];
        this.echartsData2.seriesData = [
          {
            name: this.dataMap.CountyWuBao.Name,
            value: this.dataMap.CountyWuBao.PeopleNum,
          },
          {
            name: this.dataMap.CountyWuBaoShiNeng.Name,
            value: this.dataMap.CountyWuBaoShiNeng.PeopleNum,
          },
        ];
        this.option1.legend.data = this.echartsData1.legendData;
        this.option1.series[0].data = this.echartsData1.seriesData;
        this.option2.legend.data = this.echartsData2.legendData;
        this.option2.series[0].data = this.echartsData2.seriesData;
        this.finish = true;
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss">
.component-important-of-people {
  flex: 1;
  .component-important-of-people-chart {
    margin-right: 30px !important;
  }
  .echart-data-info {
    width: 200px;
    margin: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .flex-box {
    display: flex;
  }
  .item {
    margin-bottom: 30px;
    .count {
      margin-bottom: 8px;
      font-size: 20px;
      color: #2fc1ff;
      font-weight: bold;
    }
    .name {
      font-size: 12px;
      color: #ababbf;
    }
  }
}
</style>
