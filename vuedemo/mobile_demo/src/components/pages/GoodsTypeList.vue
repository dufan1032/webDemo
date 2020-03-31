<template>
    <div>
        <div class="typeList-nav">
            <van-nav-bar title="商品列表" />
        </div>
        <div class="goods">
            <van-row>
                <van-col span='6'>
                    <ul class="leftNav">
                        <li v-for='(item,index) in typeInfo' :key='index' :class="{categoryActive:typeIndex==index}" @click="clickType(index)">
                            {{ item.MALL_CATEGORY_NAME }}
                        </li>
                    </ul>
                </van-col>
                <van-col span='18' class="type-info">
                    <div class="type-sub">
                        <van-tabs v-model="typeSubIndex" @click="getGoods(typeSubIndex)">
                            <van-tab v-for="(item,index) in typeSubInfo" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <van-list v-model="loading" :finished='finished' :immediate-check="false" class="goods-list" @load="onload()">
                        <div class="list-item" v-for="(item,index) in goodsList" :key='index' @click="goodsDetail(item.id)">
                            <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg" /></div>
                            <div class="list-item-text">
                                <div>{{item.NAME}}</div>
                                <div class="">￥{{item.PRESENT_PRICE | moneyFilter}}(¥{{ item.ORI_PRICE | moneyFilter }})</div>
                            </div>
                        </div>
                    </van-list>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Url from '@/config/server.config'
import {Toast} from 'vant'
import {toMoney} from '@/filters/moneyFilter'
export default {
    data (){
        return{
            typeInfo : [],      // 所有大类内容
            typeIndex : 0,      // 当前第几大类
            typeSubInfo : [],   // 每大类下子分类的内容
            typeSubIndex : 0,   // 当前大类下的第几个小类
            goodsList : [],     // 商品信息内容
            goodsPages : 1,     // 当前商品页数
            finished : false,   // 上拉加载，商品是否没有数据了
            loading  : false,    // 下拉刷新
            errorImg:'this.src="' + require('../../../static/images/icon/errorimg.png') + '"', // 失效图片替换
        }
    },
    methods : {
        // 请求商品大类函数
        getType(getUrl){
            axios({
                url : getUrl,
                method : 'get',
            })
                .then(data=>{
                    if(data.data.code == 200 && data.data.message){
                        this.typeInfo = data.data.message;
                        this.clickType(0)
                    }else{
                        Toast.fail('请求服务器数据出错');
                    }
                })
                .catch(err=>{
                    Toast.fail('请求服务器数据出错');
                });
        },
        // 根据id请求内容函数
        getInfo(getUrl,getId,fn){
            axios({
                url : getUrl,
                method : 'post',
                data : { typeId : getId , pages : this.goodsPages }
            })
                .then(data=>{
                    if(data.data.code == 200 && data.data.message.length > 0){
                        fn(data.data.message)
                    }else{
                        Toast.fail('请求服务器数据出错');
                    }
                })
                .catch(err=>{
                    Toast.fail('请求服务器数据出错');
                });
        },
        // 点击大类，根据当前大类索引获取小类
        clickType(index){
            this.typeIndex = index;
            this.getInfo(Url.typeSub,this.typeInfo[this.typeIndex].id,(data)=>{
                this.typeSubInfo = data;
                this.typeSubIndex = 0;
                this.getInfo(Url.typeSubList,this.typeSubInfo[this.typeSubIndex].id,(data)=>{
                    this.pages++;
                    this.goodsList = data;
                });
            });
        },
        // 点击小类，根据小类id获取数据
        getGoods(typeSub){
            this.pages = 1;
            this.goodsList = [];
            this.getInfo(Url.typeSubList,this.typeSubInfo[typeSub].id,(data)=>{
                this.pages++;
                this.goodsList = this.goodsList.concat(data);
            });
        },
        // 下拉加载函数
        onload(){
            setTimeout(()=>{
                this.getInfo(Url.typeSubList,this.typeSubInfo[this.typeSubIndex].id,(data)=>{
                    this.pages++;
                    this.goodsList = this.goodsList.concat(data);
                    this.finished = true;
                    this.loading = true;
                })
            },2000);
        },
        // 商品链接页面
        goodsDetail(id){
            this.$router.push({
                name : 'Goods',
                params : {
                    goodsId : id
                }
            })
        },
    },
    created(){
        this.getType(Url.getType);
    },
    mounted(){
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let spacingHeight = document.getElementsByClassName('type-sub')[0].offsetHeight;
        document.getElementsByClassName('goods-list')[0].style.height = winHeight - spacingHeight*3 + 'px';
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }  
    },
}
</script>

<style scoped>
.goods{
    background-color: aliceblue;
}
.leftNav li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #ffffff;
}

.type-info{
    background: #fff;
}

.list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
}
.goods-list{
    overflow: scroll;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
</style>