<template>
  <div>
    <div><img :src='goodsData.image' :alt='goodsData.name' width="100%" /></div>
    <div class="goods-name">{{ goodsData.name }}</div>
    <div>¥{{ goodsData.price | moneyFilter }}(¥{{ goodsData.mallPrice | moneyFilter }})</div>
  </div>
</template>

<script>
import { toMoney } from '@/filters/moneyFilter.js'
export default {
  props : ['goodsData'],
  filters : {
      moneyFilter : function(money){
          return toMoney(money);
      },
  },
}
</script>

<style>
.goods-name{
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
}
</style>