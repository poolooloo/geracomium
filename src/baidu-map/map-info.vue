<template>
  <div class="map-info" v-if="infoData && infoData.InstitutionName">
    <div class="info-header">
      <span>机构详情</span>
      <span @click="closeInfoData">
        <svg-icon icon="close"></svg-icon>
      </span>
    </div>
    <div class="info-content">
      <p class="info-header inner-title">
        <span class="title">{{infoData.InstitutionName}}</span>
        <span>{{infoData.Nature}}</span>
      </p>
      <div class="image-wrapper">
        <img :src="infoData.PhotoUrl[0]" alt />
      </div>
      <ul class="util-flex">
        <li>
          <span class="count font-blue">{{infoData.SumBed}}</span>
          <span class="name">总床位数</span>
        </li>
        <li>
          <span class="count font-green">{{infoData.SheckInNum}}</span>
          <span class="name">空床位数</span>
        </li>
        <li>
          <span class="count font-orange">{{infoData.Price}}</span>
          <span class="name">参考价格</span>
        </li>
      </ul>
      <p class="address">{{infoData.Address}}</p>
      <p class="tel">{{infoData.Tel}}</p>
      <p class="info">{{infoData.Synopsis}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoData: {},
    };
  },
  mounted() {
    this.$EventBus.$on("SHOW_MARKER_INFO", (item) => {
      item.PhotoUrl = JSON.parse(item.PhotoUrl);
      this.infoData = item;
      this.renderInfoDialog();
    });
  },
  methods: {
    renderInfoDialog() {
      console.log(this.infoData);
    },
    closeInfoData() {
      this.infoData = null;
    },
  },
};
</script>
<style lang="scss">
.map-info {
  width: 267px;
  padding: 12px;
  background-color: rgba(1, 22, 52, 0.5);
  border: 1px solid rgba(218, 120, 4, 1);
  .info-header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #d0ecff;
  }
  .inner-title {
    line-height: 40px;
  }
  .util-flex {
    margin-top: 10px;
    justify-content: space-between;
    li {
      display: flex;
      width: 80px;
      flex-direction: column;
    }
  }
  .title {
    font-size: 16px;
    color: #fff;
  }
  .image-wrapper {
    height: 140px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: 12px;
    color: rgba(171, 172, 192, 1);
  }
  .count {
    font-size: 16px;
    line-height: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .font-green {
    color: #6cf0b0;
  }
  .font-orange {
    color: #da7805;
  }
  .font-blue {
    color: #30c2ff;
  }
  .address {
    margin-top: 10px;
  }
  .address,
  .tel {
    font-size: 12px;
    color: #fff;
    line-height: 20px;
  }
  .info {
    margin-top: 16px;
    max-height: 60px;
    font-size: 12px;
    line-height: 16px;
    color: #abacc0;
    overflow: hidden;
  }
}
</style>