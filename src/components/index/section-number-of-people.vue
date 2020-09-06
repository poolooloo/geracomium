<template>
  <index-section
    class="component-number-of-people"
    :title="pieDatum && pieDatum.screeninstitution.institutionPeople ? pieDatum.screeninstitution.institutionPeople.EnumName : '养老人数分布'"
  >
    <echart-wrapper class="flex-box">
      <echart-view
        v-if="finish"
        class="component-number-of-people-chart"
        canvas-name="number-of-people"
        :canvas-options="option"
      />
      <div class="echart-data-info" v-if="finish">
        <div class="flex-box item" v-for="(item, index) in sourceData" :key="index">
          <div class="flex-box">
            <span class="color"></span>
            <span class="name">{{ item.code }}</span>
          </div>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";

const option = {
  color: ["#54c6e7", "#2988E4", "#da7804"],
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
        const data = this.pieDatum.screeninstitution.institutionPeople.EnumList;
        this.sourceData = data;
        this.echartsData.legendData = data.map((item) => item.code);
        this.echartsData.seriesData = data.map((item) => ({
          name: item.code,
          value: item.value,
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
.component-number-of-people {
  .echart-data-info {
    width: 225px;
    margin: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .flex-box {
    display: flex;
    margin-bottom: 17px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .item {
    justify-content: space-between;
    &:first-child {
      .color {
        background-color: $blue-level2;
      }
    }
    &:nth-child(2) {
      .color {
        background-color: $blue-level1;
      }
    }
    &:last-child {
      .color {
        background-color: $orange;
      }
    }
  }
  .color {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }
  .name {
    color: #cfebff;
  }
  .value {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
  }
}
</style>
