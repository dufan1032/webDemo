<template>
    <div>
        <div class="cart-nav">
            <van-nav-bar left-arrow title="购物车" @click-left  ='goBack' />
        </div>
        <!-- 清空购物车 -->
        <div class="clear-cart">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <!-- 显示购物车内容商品 -->
        <div class="cart-list">
            <div class="cart-goods" v-for="(item,index) in cartInfo" :key="index">
                <div class="goods-img"><img :src="item.image" :alt="item.name" width="100%" /></div>
                <div class="goods-info">
                    <div class="goods-name">{{ item.name }}</div>
                    <div class="goods-count"><van-stepper v-model="item.count" /></div>
                    <div class="goods-price">¥{{ item.price*item.count | moneyFilter }}</div>
                </div>
            </div>
        </div>
        <!-- 购物总金额 -->
        <div class="total-money">合计：¥{{ computeMoney() | moneyFilter }}元</div>
    </div>
</template>

<script>
import {toMoney} from '@/filters/moneyFilter'
export default {
    data (){
        return{
            cartInfo : [],  // 购物车内商品
            isEmprty : false, // 购物车是否为空，空 false ，不空 true
        }
    },
    methods : {
        goBack(){
            this.$router.go(-1);
        },
        // 得到商品函数
        getCartInfo(){
            // 本地存储里是否有购物车内商品数据
            if(localStorage.cartInfo){
                // 有数据，将其放到 cartInfo 中
                this.cartInfo = JSON.parse(localStorage.cartInfo);
            }
            // 打印到控制台查看效果
            // console.log(' this.cartInfo:'+JSON.stringify( this.cartInfo));
            // cartInfo 有商品信息则将 isEmpty 设置 true，没有设为false
            this.isEmpty = this.cartInfo.length>0 ? true : false;
        },
        // 清空购物车
        clearCart(){
            localStorage.removeItem('cartInfo');
            this.cartInfo = [];
        },
        // 计算总价
        computeMoney(){
            let money = 0;
            this.cartInfo.forEach((item,index)=>{
                money += item.count * item.price;
            });
            localStorage.cartInfo = JSON.stringify(this.cartInfo);
            return money;
        }
    },
    created(){
        this.getCartInfo();
    },
    // 价格过滤器
    filters : {
        moneyFilter(money){
        return toMoney(money);
        }
    },
}
</script>

<style scoped>
.clear-cart{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
}

.cart-list{
    height: 25rem;
    background-color: #fff;
    overflow: scroll;
}
.cart-goods{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}
.goods-img{
    flex: 6;
}
.goods-info{
    flex: 18;
    padding-left: 0.85rem;
}
.goods-count{
    padding-top: 0.5rem;
}
.goods-price{
    color : red;
    padding-top: 0.5rem;
}

.total-money{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding: 0.5rem;
    position: absolute;
    bottom: 2.4rem;
    right: 0;
}
</style>