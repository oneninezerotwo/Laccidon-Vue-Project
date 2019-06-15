<template>
	<ul class="clearfix">
		<li v-for="item in navslist" :key="item.name" @click="goto(item.type)">
			<img :src="item.url"/>
			<p>{{item.name}}</p>
		</li>
	</ul>
</template>

<script>
export default {
	name:"navlist",
	props:["navs"],
	data(){
     return {
			 navslist:[]
		 }
	},
	methods: {
    goto(type) {
      this.$router.push({path:"/list",query:{type}});
    }
	},
	mounted(){
		let type = this.navs
		this.$axios.get('/list',{params:{type:type}}).then(({data})=>{
				this.navslist = data.data
				this.navslist.forEach(item => {
					  if(item.url){
               item.url = require('../'+item.url)
						}
				});
		});
	}
}
</script>

<style scoped>
.clearfix:before,.clearfix:after {  /*清楚浮动*/
    content:"";
    display:table;
}
.clearfix:after{clear:both;}
.clearfix{
    *zoom:1;/*IE/7/6*/
}
ul{
	padding-top:10px;
	list-style:none;
}
li{
	width: 90px;
	float:left;
	text-align: center;
	list-style:none;
}
img{
	width: 50px;
	height: 50px;
	border:0; vertical-align:middle;
}
</style>
