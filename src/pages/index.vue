<template>
  <div class="page-index">
    <layout-wrapper>
      <layout-left>
        <gender-of-people />
        <age-of-people />
        <area-of-people />
      </layout-left>

      <layout-center>
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
import LayoutLeft from "@/components/layout/layout-left";
import LayoutRight from "@/components/layout/layout-right";
import LayoutCenter from "@/components/layout/layout-center";
import LayoutWrapper from "@/components/layout/layout-wrapper";

import GenderOfPeople from "@/components/index/section-gender-of-people";
import AgeOfPeople from "@/components/index/section-age-of-people";
import AreaOfPeople from "@/components/index/section-area-of-people";

import ImportantOfPeople from "@/components/index/section-important-of-people";
import Policy from "@/components/index/section-policy";

import NumberOfPeople from "@/components/index/section-number-of-people";
import CheckIn from "@/components/index/section-check-in";
import LevelCare from "@/components/index/section-level-care";
import DiseaseOfPeople from "@/components/index/section-disease-of-people";

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
    LevelCare
  },
};
</script>

<style lang="scss">
.page-index{
  .page-index-center__section{
    display: flex;
    justify-content: space-between;
  }
}
</style>