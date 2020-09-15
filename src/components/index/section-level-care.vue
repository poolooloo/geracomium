<template>
  <index-section
    class="component-level-care"
    :title="pieDatum && pieDatum.peopleNums[2] ? pieDatum.peopleNums[2].ScreenName : '分级照护'"
  >
    <echart-wrapper class="flex-box">
      <echart-view
        v-if="finish"
        class="component-number-of-people-chart"
        canvas-name="number-of-people"
        :canvas-options="option"
        ref="echart"
      />
      <div class="echart-data-info" v-if="finish">
        <div class="content">
          <p>
            <span class="second-title">养老服务从业人员数</span>
            <span class="count">{{ count }}</span>
          </p>
          <div class="flex-box item" v-for="(item, index) in sourceData" :key="index">
            <span class="color"></span>
            <span class="name">{{ item.Name }}</span>
            <span class>{{item.Percentage * 100 + '%'}}</span>
            <span class="item-count">（{{ item.PeopleNum }}）</span>
          </div>
        </div>
      </div>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";

const option = {
  color: ["#54c6e7", "#da7804", "#2988E4"],
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
        normal: {
          show: false,
          position: "center",
          formatter: function (data) {
            return data.value + "\n\n" + data.name;
          },
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "12",
            color: "rgb(47, 194, 255)",
          },
        },
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
      option,
      sourceData: [],
      finish: false,
      echartsData: {
        legendData: [],
        seriesData: [],
      },
      dataMap: {},
      count: 0,
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
        const data = this.pieDatum.peopleNums[2].List;
        this.sourceData = data;
        this.count = data.reduce((total, item) => total + item.PeopleNum, 0);
        this.echartsData.legendData = data.map((item) => item.Name);
        this.echartsData.seriesData = data.map((item) => ({
          name: item.Name,
          value: item.PeopleNum,
        }));
        this.option.legend.data = this.echartsData.legendData;
        this.option.series[0].data = this.echartsData.seriesData;
        this.finish = true;
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss">
.component-level-care {
  .flex-box {
    display: flex;
  }
  .echart-data-info {
    width: 225px;
    margin: 0 25px;
    display: flex;
    align-items: center;
  }
  .color {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }
  .name {
    min-width: 100px;
    color: #cfebff;
    font-size: 12px;
    margin-right: 5px;
  }
  .second-title {
    margin-right: 20px;
  }
  .second-title,
  .item-count {
    color: #ababbf;
  }
  .title {
    font-size: 14px;
    margin-right: 20px;
  }
  .count {
    color: #2fc1ff;
    font-size: 16px;
  }
  .content {
    > p {
      margin-bottom: 28px;
      text-align: center;
    }
  }
  div.item {
    // justify-content: space-between;
    margin-bottom: 19px;
    .color {
      background-color: $orange;
    }
    &:nth-child(2) {
      .color {
        background-color: $blue-level2;
      }
    }
    &:last-child {
      margin-bottom: 0;
      .color {
        background-color: $blue-level1;
      }
    }
  }
}
</style>