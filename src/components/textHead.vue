<template>
  <mt-header  :title="title">
    <mt-button icon="back" @click.native="gotoback" slot="left" v-show="$route.path=='/cart' || '/find'"></mt-button>
    <mt-button slot="right" v-show="$route.path=='/cart'" @click="cartedit">{{$store.state.text}}</mt-button>
  </mt-header>
  
</template>

<script>
export default {
  name: "cartHead",
  data() {
    return {
      routerHead: ["发现", "购物车"],
      routerPath: ["/find", "/cart"]
    };
  },
  methods:{
    cartedit(){
       this.$store.commit('cartEdit')
       this.$store.commit('changeText')
    },
    gotoback(){
      this.$router.back(-1)
    }
  },
  
  computed: {
    // text(){
    //   return this.$store.state.text;
    // },
    title() {
      let i = this.routerPath.indexOf(this.$route.path);
      return this.routerHead[i];
    }
  }
};
</script>

<style  scoped>
.mint-header {
  /* height: 10%; */
  background: #fafafa;
  color: black;
  font-size: 16px;
}
</style>

