<template>
  <index-section
    class="component-policy"
    :title="pieDatum && pieDatum.screenNews ? pieDatum.screenNews.ScreenName : '当地养老政策列表'"
  >
    <div class="policy-wrapper">
      <div
        class="policy-item"
        v-for="(item,i) in policyList"
        :key="i"
        @click="openPolicyInfo(item)"
      >
        <div class="flex-box">
          <svg-icon icon="file"></svg-icon>
          <p class="info">{{ item.Title }}</p>
        </div>
        <svg-icon icon="arrow"></svg-icon>
      </div>
    </div>

    <el-dialog
      title="政策详情"
      append-to-body
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <template v-if="policyInfo">
        <p class="policy-title">{{ policyInfo.Title }}</p>
        <div class="replace-table" v-html="policyInfo.Full"></div>
      </template>
    </el-dialog>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";

export default {
  components: {
    IndexSection,
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
  data() {
    return {
      policyList: [],
      dialogVisible: false,
      policyInfo: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const data = this.pieDatum.screenNews.List;
      this.policyList = data;
    },
    openPolicyInfo(item) {
      this.dialogVisible = !this.dialogVisible;
      this.policyInfo = item;
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
      this.policyInfo = null;
    },
  },
};
</script>

<style lang="scss">
.component-policy {
  flex: 1;
  .policy-wrapper {
    margin-top: 27px;
    max-height: 175px;
    overflow: auto;
  }
  .flex-box,
  .policy-item {
    display: flex;
    align-items: center;
  }
  .icon {
    color: #6c779b;
  }
  .policy-item {
    justify-content: space-between;
    margin-bottom: 5px;
    padding-left: 10px;
    line-height: 28px;
    font-size: 12px;
    color: #d0ecff;
    background: rgba(36, 54, 102, 0.5);
    overflow: hidden;
  }
  .icon-text,
  .info {
    float: left;
  }
  .info {
    margin-left: 5px;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .arrow-right {
    float: right;
  }
}
.policy-title {
  margin-bottom: 30px;
  font-size: 16px;
  color: #2fc2ff;
}
.replace-table {
  table {
    width: inherit !important;
  }
  tbody {
    td,
    tr {
      height: inherit;
    }
  }
}
</style>