<template>
  <div>
    <div class="nav-goods">
      <van-nav-bar
        :title="name"
        left-text=''
        left-arrow
        @click-left="clickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}(¥{{ goodsInfo.ORI_PRICE | moneyFilter }})</div>
    <div>
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL">

            </div>
          </van-tab>
          <van-tab title="评价">
            <div style="height:100rem;">正在制作中</div>
          </van-tab>
        </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger" @click="buy">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Url from '@/config/server.config'
import {toMoney} from '@/filters/moneyFilter'
import { Toast } from 'vant'
export default {
  data (){
    return{
        goodsId : '', // 传递过来的商品id
        name : '',    // 传递过来的商品name
        goodsInfo : [] //  从服务端获取的信息
    }
  },
  methods : {
      clickLeft(){
        this.$router.go(-1);
      },
      // 获取商品信息
      getInfo(){
        axios({
          url : Url.getGoodsInfo,
          method : 'post',
          data : {
              goodsId : this.goodsId
          }
        })
            .then(response=>{
              if(response.data.code == 200 && response.data.message){
                this.goodsInfo = response.data.message;
              }else{
                Toast.fail('服务器错误，数据取得失败');
              }
            })
            .catch(error=>{
                console.log(error)
            });
      },
      // 将商品添加到购物车
      addCart(){
        // 取出购物车内商品数据: 数据不存在则为空数组
        let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) :[];
        // 判断商品是否存在，存在返回第一个查到的数据，不存在返回undefined
        let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId)

        if(!isHaveGoods){
          // 购物车内没有此商品数据，直接添加到购物内
          cartInfo.push({
            goodsId : this.goodsInfo.id,
            name : this.goodsInfo.NAME,
            price : this.goodsInfo.PRESENT_PRICE,
            image : this.goodsInfo.IMAGE1,
            count : 1,
          });
          Toast.success('添加成功');
        }else{
          // 购物有此商品数据则数量+1
          isHaveGoods.count += 1;
          Toast.success('商品已经存在,数量+1');
        }
        // 将购物数据存储到本地存贮中
        localStorage.cartInfo = JSON.stringify(cartInfo);
      },
      // 直接购买
      buy(){
        // 将商品添加到购物车
        this.addCart();
        // 直接跳转到购物车
        this.$router.push('/cart');
      }
  },
  filters : {
    moneyFilter(money){
      return toMoney(money);
    }
  },
  created(){
    this.goodsId = this.$route.params.goodsId;
    this.name = this.$route.params.name;
    this.$route.params.goodsId && this.getInfo(this.goodsId);
  }
}
</script>

<style scoped>
.detail{
  font-size:0px;
}
.goods-name{
  background-color: #fff;
}
.goods-price{
  background-color: #fff;
}
.goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;

    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex:1;
    padding:5px;
}
</style>