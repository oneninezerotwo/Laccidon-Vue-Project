<template>
  <component :is="head"></component>
</template>

<script>
import search from "./search.vue";
import textHead from "./textHead.vue";
import mineHead from "./mineHead.vue";

export default {
  name: "myheader",
  data() {
    return {
      routerHead: [search, search,textHead,textHead,mineHead, mineHead,search],
      routerPath: ["/", "/nav","/find","/cart","/details", "/mine","/list"]
    };
  },
  computed: {
    head() {
      let i = this.routerPath.indexOf(this.$route.path);
      return this.routerHead[i];
    }
  }
};
</script>

