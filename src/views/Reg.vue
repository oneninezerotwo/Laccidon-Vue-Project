<template>

    <div>
        <myHead></myHead>
        <h1>注册</h1>
        <div class="denglu-input">
            <mt-field  placeholder="用户名" v-model="ruleForm.username" :state="nameStatus" @blur.native.capture="checkName(ruleForm.username)"></mt-field>
            <p>{{nameTip}}</p>
            <mt-field  placeholder="请输入密码" type="password" v-model="ruleForm.password" :state="passwordStatus" @blur.native.capture="checkPassword(ruleForm.password)"></mt-field>
            <p>{{passwordTip}}</p>
            <mt-field  placeholder="请再次输入密码" type="password" v-model="ruleForm.passwordAgain" :state="passwordAgainStatus"  @blur.native.capture="checkPasswordAgain(ruleForm.passwordAgain,ruleForm.password)"></mt-field>
            <p>{{passwordAgainTip}}</p>
        </div>
        <div class="denglubtn"><mt-button type="danger" size="large" @click.native.capture="reg(ruleForm.username,ruleForm.password)">立即注册</mt-button></div>
    
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
    name:"reg",
    data(){
        return {
            ruleForm: {
                password: "",
                username: "",
                passwordAgain:""
            },
            nameStatus:"",
            nameTip:"",
            passwordStatus:"",
            passwordTip:"",
            passwordAgainStatus:"",
            passwordAgainTip:""
        }
    },
    methods: {
        goto(path){ 
        this.$router.push(path)
        },
        checkName(value){
            //   console.log(value);
            if(!/^\w{3,10}$/i.test(value)){
            //   console.log(111);
                this.nameStatus = 'error';
                this.nameTip = '长度在 3 到 10 个字符';
            }else{
                  this.$axios.get('/reg/check',{
                    params:{
                        uname:value
                    }
                }).then(({data})=>{
                    if(data.status===200){
                        this.nameStatus = 'success';
                        this.nameTip = '';
                    }else if(data.status==400){
                        this.nameStatus = 'error';
                        this.nameTip = '用户名已存在';
                    }
                })
                
               
            }
        },
        checkPassword(value){
            //   console.log(value);
            if(!/^\w{3,8}$/i.test(value)){
            //   console.log(111);
                this.passwordStatus = 'error';
                this.passwordTip = '长度在 3 到 8 个字符';
            }else{
                this.passwordStatus = 'success';
                this.passwordTip = '';
            }
        },
        checkPasswordAgain(value1,value2){
            //   console.log(value);
            if(value1!=value2){
            //   console.log(111);
                this.passwordAgainStatus = 'error';
                this.passwordAgainTip = '两次输入密码不一致';
            }else{
                this.passwordAgainStatus = 'success';
                this.passwordAgainTip = '';
            }
        },
        reg(value1,value2){
            if(this.nameStatus=='success' &  this.passwordStatus=='success' & this.passwordAgainStatus=='success'){
                let uname = value1;
                let password = value2;
                // console.log('加密前：',password)

                // 对password进行加密
                let key = 'laoxie1234567890';//密钥
                let iv = 'laoxielaoxie6666';//初始向量

                key  = CryptoJS.enc.Utf8.parse(key);
                iv   = CryptoJS.enc.Utf8.parse(iv);
                var encrypted =CryptoJS.AES.encrypt(password,key,{iv});
                password = encrypted.toString();    //返回的是base64格式的密文（后端要与之匹配）

                // console.log('加密后：',password)
                this.$axios.post('/reg',{uname,password})
                .then(({data})=>{
                    if(data.status===200){
                        this.$router.replace("/login");
                    }else if(data.status==400){
                        console.log('注册失败')
                    }
                })
            }
           
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
}
p{
    color:red;
    font-size:14px;
    padding:10px 15px;
}
</style>
