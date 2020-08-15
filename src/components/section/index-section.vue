<template>
  <section class="component-index-section">
    <section-header :title="title">
      <slot name="section-select" />
    </section-header>
    <slot />
  </section>
</template>
<script>
import SectionHeader from "@/components/section/index-section-header";
export default {
  props: {
    title: String,
  },
  components: {
    SectionHeader,
  },
};
</script>
<style lang="scss">
.component-index-section{
  margin-bottom: 36px;
}
</style>