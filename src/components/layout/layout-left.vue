<template>
  <layout-aside class="component-layout-left">
    <slot />
  </layout-aside>
</template>
<script>
import LayoutAside from "@/components/layout/layout-aside";
export default {
  components: {
    LayoutAside,
  },
};
</script>