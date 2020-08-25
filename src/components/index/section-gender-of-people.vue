<template>
  <index-section class="component-gender-of-people" title="全县老人数及性别占比">
    <echart-wrapper class="flex-box">
      <echart-view
        v-if="finish"
        class="component-gender-of-people-chart"
        canvas-name="gender-of-people"
        :canvas-options="option"
        width="150"
        height="150"
        ref="echart"
      />
      <div class="echart-data-info">
        <div class="flex-box">
          <div class="flex-left">
            <p class="font-20">95931</p>
            <p class="font-color-gray">全县总人数</p>
          </div>
          <div class="flex-right">
            <p class="font-20">95931</p>
            <p class="font-color-gray">老人总数</p>
          </div>
        </div>
        <p class="gender-of man">
          <span class="color"></span>
          <span>男性占老人总数</span>
          <span>45%</span>
          <span>（13312人）</span>
        </p>
        <p class="gender-of woman">
          <span class="color"></span>
          <span>女性占老人总数</span>
          <span>45%</span>
          <span>（13312人）</span>
        </p>
      </div>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";

const option = {
  legend: {
    orient: "vertical",
    left: 10,
    data: [],
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
      option,
      finish: false,
      echartsData: {
        legendData: [],
        seriesData: [],
      },
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
        const data = this.pieDatum.peopleNums[0].List;
        const __otherCount = data
          .filter((item) => item.Code !== "CountyPeople")
          .reduce((total, item) => total + item.PeopleNum, 0);
        this.echartsData.legendData = data.map((item) => item.Name);
        this.echartsData.seriesData = data.map((item) => {
          if (item.Code !== "CountyPeople") {
            return {
              value: item.PeopleNum,
              name: item.Name,
            };
          } else {
            return {
              value: item.PeopleNum - __otherCount,
              name: "其他",
            };
          }
        });
        console.log(__otherCount);
        this.option.legend.data = this.echartsData.legendData;
        this.option.series[0].data = this.echartsData.seriesData;
        this.finish = true;
      } catch (e) {}
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
  .flex-box {
    display: flex;
  }
  .echart-data-info {
    width: 230px;
    margin-left: 45px;
  }
  .flex-left {
    padding-right: 25px;
    border-right: 1px solid #81a3d7;
  }
  .flex-right {
    padding-left: 32px;
  }
  .font-20 {
    margin-bottom: 8px;
    font-size: 20px;
    color: #30c2ff;
  }
  .font-color-gray {
    color: #abacc0;
  }
  .gender-of {
    display: flex;
    align-items: center;
    color: #D0ECFF;
    &.man {
      margin: 28px 0 17px;
      .color{
        background: #DA7804;
      }
    }
    &.woman {
      .color{
        background: #54C6E7;
      }
    }
    .color {
      width: 10px;
      height: 10px;
      margin-right: 10px;
    }
  }
}
</style>