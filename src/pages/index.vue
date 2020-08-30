<template>
  <div class="page-index">
    <layout-wrapper v-if="loaded">
      <layout-left>
        <gender-of-people />
        <age-of-people />
        <area-of-people />
      </layout-left>

      <layout-center>
        <div class="page-index-title">
          <p>青龙满族自治县养老服务大数据</p>
        </div>
        <map-section />
        <div class="page-index-center__section">
          <important-of-people />
          <policy />
        </div>
      </layout-center>

      <layout-right>
        <number-of-people />
        <check-in />
        <disease-of-people />
        <level-care />
      </layout-right>
    </layout-wrapper>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import {
  getScreenBaseInfo,
  getScreenAgeDistributionByCounty,
  getOccupancyRateByCounty,
  getScreenDiseaseByInstitutionName,
} from "@/api";

import LayoutLeft from "@/components/layout/layout-left";
import LayoutRight from "@/components/layout/layout-right";
import LayoutCenter from "@/components/layout/layout-center";
import LayoutWrapper from "@/components/layout/layout-wrapper";

import GenderOfPeople from "@/components/index/section-gender-of-people";
import AgeOfPeople from "@/components/index/section-age-of-people";
import AreaOfPeople from "@/components/index/section-area-of-people";

import MapSection from "@/components/map/map-section.vue";
import ImportantOfPeople from "@/components/index/section-important-of-people";
import Policy from "@/components/index/section-policy";

import NumberOfPeople from "@/components/index/section-number-of-people";
import CheckIn from "@/components/index/section-check-in";
import LevelCare from "@/components/index/section-level-care";
import DiseaseOfPeople from "@/components/index/section-disease-of-people";

import env from "@/api/api-env";

export default {
  components: {
    LayoutLeft,
    LayoutRight,
    LayoutCenter,
    LayoutWrapper,
    NumberOfPeople,
    AgeOfPeople,
    AreaOfPeople,
    ImportantOfPeople,
    Policy,
    CheckIn,
    GenderOfPeople,
    DiseaseOfPeople,
    LevelCare,
    MapSection,
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["SET_PIE_DATA", "SET_LIQUID_FILL"]),
    async init() {
      const data = await getScreenBaseInfo();
      const data2 = await getScreenAgeDistributionByCounty({ CountyName: "" });
      const data3 = await getOccupancyRateByCounty({ CountyName: "" });
      const data4 = await getScreenDiseaseByInstitutionName({
        InstitutionName: "",
      });
      console.log({
        data2,
        data3,
        data4,
      });
      if (data.Success) {
        this.loaded = true;
        this.SET_PIE_DATA(data);
        this.SET_LIQUID_FILL(data3);
        env !== "prod" &&
          this.$nextTick(() => {
            // 缩放测试
            // document.getElementsByTagName("html")[0].style =
            //   "transform: translate(-10%,-10%) scale(0.6);";
          });
      }
    },
  },
};
</script>

<style lang="scss">
.page-index {
  .page-index-center__section {
    display: flex;
    justify-content: space-between;
  }
  .page-index-title {
    position: relative;
    top: -2px;
    margin: 0 auto 15px;
    width: 483.7px;
    height: 70.5px;
    text-indent: -200vw;
    background-color: $base-bgcolor;
    background-image: url("../assets/images/title-bg.png");
    background-size: cover;
    p {
      position: relative;
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: -1px;
        left: -60px;
        width: 60px;
        height: 5px;
        border-radius: 3px;
        background-color: $base-bgcolor;
      }
      &::after {
        content: "";
        left: inherit;
        right: -60px;
      }
    }
  }
}
</style>