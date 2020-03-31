<template>
    <div>
        <div class="main">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        
        <!-- 底部 -->
        <van-tabbar v-model="actived" @change="changeTabbar(actived)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
            <van-tabbar-item icon="contact">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data (){
        return{
            actived : 0,
        }
    },
    created(){
        this.changeActived();
    },
    updated(){
        this.changeActived();
    },
    methods : {
        changeActived(){
            if(this.$route.path == '/cart') this.actived = 2;
            else if(this.$route.path == '/typelist') this.actived = 1;
            else if(this.$route.path == '/ShoppingMall') this.actived = 0;
        },
        changeTabbar(actived){
            switch(actived){
                case 0 : this.$router.push({ name : 'ShoppingMall'}); break;
                case 1 : this.$router.push({ name : 'GoodsTypeList'}); break;
                case 2 : this.$router.push({ name : 'Cart'}); break;
                case 3 : this.$router.push({ name : 'MyShop'}); break;
            }
        }
    },
}
</script>

<style scoped>
</style>