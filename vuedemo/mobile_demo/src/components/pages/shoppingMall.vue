<template>
  <div>
    <!-- 头部搜索栏 -->
    <div class="search-header">
        <van-row>
            <van-col span='3'><a href="#"><img :src="locationUrl" :alt="locationUrl" class="search-img" /></a></van-col>
            <van-col span='16'><input type="text" :value="value" :placeholder="placeholder" class="search-input" /></van-col>
            <van-col span='5'><van-button size='small' round class="search-button">查找</van-button></van-col>
        </van-row>
    </div>

    <!-- 头部banner轮播图 -->
    <div class="banner-header">
        <van-swipe :autoplay='slidesTime'>
            <van-swipe-item v-for="(banner,index) in slides" :key="index">
                <a href="javascript:;" ><img :src="banner.image" width="100%" :alt="banner.image" /></a>
            </van-swipe-item>
        </van-swipe>
    </div>

    <!-- 分类导航 -->
    <div class="category">
        <div v-for="(cate,index) in category" :key="index">
            <img v-lazy='cate.image' alt="cate.mallCategoryName" width="90%" />
            <span>{{ cate.mallCategoryName }}</span>
        </div>
    </div>

    <!-- banner广告 -->
    <div class="ad-banner">
        <a href="javascript:;"><img v-lazy="advertesPicture" :alt="advertesPicture" width="100%" /></a>
    </div>

    <!-- 商品推荐 -->
    <div class="recommend-goods">
        <div class="recommend-title">商品推荐</div>
        <div class="recommend-body">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in recommend" :key="index">
                    <div class="recommend-item" @click="goodsDetail(item)">
                        <img :src="item.image" alt="item.goodsName" width="80%" />
                        <div>{{ item.goodsName }}</div>
                        <div>¥{{ item.price | moneyFilter }}(¥{{ item.mallPrice | moneyFilter }})</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>

    <!-- 商品楼层 -->
    <div class="floor">
        <!-- 商品楼层1 : 休闲食品 -->
        <floor-index :floorData='floor1' :floorName='floorName.floor1'></floor-index>

        <!-- 商品楼层2 : 新鲜水果 -->
        <floor-index :floorData='floor2' :floorName='floorName.floor2'></floor-index>

        <!-- 商品楼层3 : 新鲜水果 -->
        <floor-index :floorData='floor3' :floorName='floorName.floor3'></floor-index>
    </div>

    <!-- 热卖商品 -->
    <div class="host-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
            <van-list>
                <van-row gutter='20'>
                    <van-col span='12' v-for="(item,index) in hotGoods" :key="index"  @click="goodsDetail(item)">
                        <goods-info class="goodsInfo" :goodsData='item'></goods-info>
                    </van-col>
                </van-row>
            </van-list>
        </div>
    </div>
  </div>
</template>

<script>
import aixos from "axios";
import Url from '@/config/server.config' // 请求路径配置文件
import { swiper, swiperSlide } from 'vue-awesome-swiper'    // swiper
import 'swiper/dist/css/swiper.css'
import floorIndex from '../commons/floorIndex'       // 商品楼层模块组件
import goodsInfo from '../commons/goodsInfoTemplate' // 商品信息组件
import { toMoney } from '@/filters/moneyFilter.js'   // 金钱数字过滤器：保留2位小数
export default {
  name : "",
  components : {swiper, swiperSlide, floorIndex, goodsInfo},
  data (){
    return{
        swiperOption : {        // swiper 配置
            slidesPerView : 3,
        },
        locationUrl : require('../../../static/images/icon/location.png'), // 顶部广告图
        placeholder : '查找', // 头部搜索框的预设信息
        value : '',           // 头部搜索框的值
        slides : [],          // 头部轮播图,图片地址数据
        slidesTime : 3000,    // 头部banner 滚动时间
        category : [],        // 商品分类数据
        advertesPicture : {}, // banner广告
        recommend : [], // 推荐商品数据
        floorName : {}, // 楼层名称集合
        floor1 : [],    // 楼层1数据
        floor2 : [],    // 楼层2数据
        floor3 : [],    // 楼层3数据
        hotGoods : [],  // 热卖商品
    }
  },
  filters : {
      moneyFilter : function(money){
          return toMoney(money);
      }
  },
  methods : {
       goodsDetail(goodsInfo){
           this.$router.push({
               name : 'Goods',
               params : {
                   goodsId : goodsInfo.goodsId,
                   name : goodsInfo.name || goodsInfo.goodsName
               }
           });
       },
  },
  created : function(){
      aixos.get(Url.getShoppingMallInfo)
        .then(response => {
            let _data = response.data.data;
            this.slides = _data.slides;       // 头部轮播图
            this.category = _data.category;   // 商品分类
            this.advertesPicture = _data.advertesPicture.PICTURE_ADDRESS;  // banner广告
            this.recommend = _data.recommend; // 推荐商品
            this.floorName = _data.floorName; // 楼层名称
            this.floor1 = _data.floor1;       // 楼层1
            this.floor2 = _data.floor2;       // 楼层2
            this.floor3 = _data.floor3;       // 楼层2
            this.hotGoods = _data.hotGoods    // 热卖商品
        })
        .catch(err => {
            console.log(err);
        });
  },
}
</script>

<style scoped>
*{ margin: 0; padding: 0; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; }
/* 顶部搜索栏 */
.search-header{
    height: 2.2rem;
    line-height: 2.2rem;
    background: #e5017d;
    overflow: hidden;
}
.search-header .search-img{
    width: 80%;
    padding: 0.15rem 0 0 0.2rem;
}
.search-header .search-input{
    width: 100%;
    height: 1.5rem;
    font-size: 0.7rem;
    color: #ffffff;
    background-color: #e5017d;
    border: 0;
    border-bottom: 1px solid #ffffff;
    padding-left: 0.5rem;
}
.search-header .search-button{
    font-size: 0.7rem;
    background:#ebedf0;
    float: right;
    margin: 0.35rem 0.35rem;
}

/* 顶部导航 */
.banner-header{
    width: 100%;
    clear: both;
}

/* 商品分类 */
.category{
    font-size: 14px;
    background: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.category div{
    width: 20%;
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
}

/* 商品推荐 */
.recommend-goods{
    background: #fff;
    margin-top: .3rem;
}
.recommend-goods .recommend-title{
    color: #e5017d;
    font-size: 16px;
    padding: 0.2rem;
    border-bottom: 1px solid #eeeeee;
}
.recommend-goods .recommend-body{
    border-bottom: 1px solid #eee;
}
.recommend-goods .recommend-item{
    width: 99%;
    font-size: 13px;
    text-align: center;
    border-right: 1px solid #eee;
}

/* 热卖商品 */
.hot-title{
    font-size: 16px;
    font-weight: bolder;
    text-align: center;
    height: 1.8rem;
    line-height: 1.8rem;
}
.goodsInfo{
    margin-bottom: 0.4rem;
}
</style>