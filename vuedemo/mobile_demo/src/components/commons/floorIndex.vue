<!-- 楼层公用组件 -->
<template>
    <div class="floor-snacks">
        <div class="title">{{ floorName }}</div>
        <div class="floor-abnormal">
            <div class="floor-one">
                <img :src="floorData0.image" :alt="floorData0.image" width="100%" />
            </div>
            <div class="floor-two">
                <div><img :src="floorData1.image" :alt="floorData1.image" width="100%" /></div>
                <div><img :src="floorData2.image" :alt="floorData2.image" width="100%" /></div>
            </div>
        </div>
        <div class="floor-rule">
            <div v-for='(item,index) in floorData.slice(3)' :key='index'>
                <img :src='item.image' :alt='item.image' width="100%" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props : ['floorData','floorName'],
  data (){
    return{
        floorData0 : {},
        floorData1 : {},
        floorData2 : {},
    }
  },
  watch : {
      floorData : function(val){
          this.floorData0 = this.floorData[0];
          this.floorData1 = this.floorData[1];
          this.floorData2 = this.floorData[2];
      }
  }
}
</script>

<style scoped>
/* 商品楼层 - 楼层标题 */
.floor .title{
    color : #b78537;
    font: 16px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
    border-bottom: 1px solid #977442;
    padding: 0.4rem;
    margin-top: 0.2rem;
}
/* 商品楼层 - 休闲食品 */
.floor-snacks .floor-abnormal,.floor-snacks .floor-rule{
    display: flex;
    flex-direction: row;
    background: #fff;
    border-bottom: 1px solid #AEAEAE;
}
.floor-snacks .floor-abnormal div,.floor-snacks .floor-rule div{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.floor-snacks .floor-one{
    border-right: 1px solid #AEAEAE;
}
.floor-snacks .floor-two div:first-child{
    border-bottom: 1px solid #AEAEAE;
}
.floor-snacks .floor-rule div:nth-child(odd){
    border-right: 1px solid #AEAEAE;
}
</style>