<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "svg-icon",
  props: {
    icon: String,
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
  },
};
</script>