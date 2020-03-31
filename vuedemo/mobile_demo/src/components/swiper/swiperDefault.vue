<template>
  <div>
    <swiper :options='swiperOption' class="swiper">
      <swiper-slide class="swiper-silde" v-for="(item,index) in silde" :key="index">
        silde {{ item }}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  components : {swiper, swiperSlide},
  data (){
    return{
      silde : [1,2,3,4,5,6],
      swiperOption : {
        direction : "vertical", // 竖向滚动
        loop : true, // 无缝滚动
        pagination : {
          el : '.swiper-pagination',
          clickable : true // 自由选择
        },
        freemode : true, // slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合
        mousewheel : true, // 鼠标滚轮控制
      },
    }
  },
}
</script>

<style scoped>
.swiper {
  height: 7rem;
  border-top : 1px solid red;
  border-bottom : 1px solid red;
}
.swiper-silde{
  height: 4rem;
  text-align: center;
  line-height: 7rem;
}
</style>