<template>
    <div>
        <myHead></myHead>
        <h1>登录</h1>
        <div class="denglu-input">
            <mt-field  placeholder="用户名" v-model="ruleForm.username"></mt-field>
            <mt-field  placeholder="请输入密码" type="password" v-model="ruleForm.password"><p>忘记密码</p></mt-field>
        </div>
        <span>{{dengluCheck}}</span>
        <div class="denglubtn"><mt-button type="danger" size="large" @click.native.capture="denglu(ruleForm.username,ruleForm.password)">登录</mt-button></div>
        <div class="reg" @click="goto('/reg')">新用户注册</div>
    </div>
    
</template>

<script>
import Vue from "vue";
import { Field } from 'mint-ui';
import { Button } from 'mint-ui';
import myHead from "../components/mineHead.vue";
import CryptoJS from 'crypto-js';
Vue.component(Button.name, Button)
Vue.component(Field.name, Field);
export default {
    name:"login",
    data(){
        return {
            ruleForm: {
                password: "",
                username: ""
            },
            dengluCheck:""
        }
    },
    methods: {
        goto(path){ 
        this.$router.push(path);
        },
        denglu(value1,value2){
            //   if(this.ruleForm.autoLogin){
            // 获取本地token
            let token = localStorage.getItem('Authorization');//null/string
            // 判断本地是否存在token
            if(token){
              // 校验token判断是否过期
            }
        //   }
             let key = 'laoxie1234567890';//密钥
            let iv = 'laoxielaoxie6666';//初始向量

            key  = CryptoJS.enc.Utf8.parse(key);
            iv   = CryptoJS.enc.Utf8.parse(iv);
            var encrypted =CryptoJS.AES.encrypt(value2,key,{iv});
            value2 = encrypted.toString();    //返回的是base64格式的密文（后端要与之匹配）
            this.$axios.get('/login',{
               params:{
                uname:value1,
                password:value2
               }
            })
            .then(({ data }) => {
                if(data.status === 200){

                if (typeof data.data === "string") {
                  let token = data.data;
                // console.log('token:',token)
                  // 保存token到本地
                localStorage.setItem("Authorization", token);
                localStorage.uname=value1;
                  // 保存token到store
                  this.$store.commit("login", token);
                //   console.log(this.$store.state.dengluStatus)
                }

                // 登录成功后跳转目标页面/否则跳转首页
                    // console.log(this.$route.query.redirect);
                this.dengluCheck = "";    
                let uname = this.ruleForm.username;
                // console.log(uname)
                this.$store.commit('changeuser',uname)
                // console.log('已登录:'+111);
                this.$store.commit('changeDenglu',false);
                // console.log(this.$store.state.user)
                
                this.$router.replace("/mine");
                this.$store.commit('removeGoods');
                this.$axios.get('/cart',{params:{uname:value1}})
                .then(({data})=>{
                    // console.log(data)
                    if(data.status===200){
                        console.log('111:',data.data)
                        data.data.forEach(item=>{
                             this.$store.commit('add2cart',item)
                        })
                      
                    }else if(data.status==400){
                        console.log('400')
                    }
                })
                } else {
                    this.dengluCheck = "用户名或密码错误";
                }
            })
            
        }
    },
    components:{
        myHead
    }
}
</script>

<style scoped>
h1{
    font-size:22px;
    height: 50px;
    line-height: 50px;

}

.mint-field-other p{
    font-size:14px;
}
#mymain{
  margin:0 3%;
}
.denglubtn{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom:20px;
}
.mint-button{
    width: 300px;
    height: 40px;
}
.mint-cell .mint-cell-wrapper{
    margin-bottom:20px;
}
.denglu-input{
    margin-bottom:20px;
}
.reg{
    font-size:14px;
    text-align: right;
    width: 70px;
    float: right;
}
span{
    display: block;
    color:red;
    font-size:14px;
    padding:7px 15px;
    margin-bottom:10px;
}
</style>
