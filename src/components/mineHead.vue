<template>
  <mt-header>
    <mt-button icon="back" @click.native="gotoback" slot="left"></mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</template>

<script>
export default {
  name: "myHead",
  data() {
    return {
      value: "",
    };
  },
  methods:{
    gotoback(){
      this.$router.back(-1)
    }
  }
};
</script>

<style  scoped>
.mint-header {
  background: #fafafa;
  color: black;
  font-size: 16px;
}
</style>

