<template>
    <div id="left-nav">
        <ul>
            <li>
                <i class="icon1"></i>
                <div>收银</div>
            </li>
            <li>
                <i class="icon2"></i>
                <div>店铺</div>
            </li>
            <li>
                <i class="icon3"></i>
                <div>商品</div>
            </li>
            <li>
                <i class="icon4"></i>
                <div>会员</div>
            </li>
            <li>
                <i class="icon5"></i>
                <div>设置</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name : 'leftNav',
}
</script>

<style>
    #left-nav{
       color:#fff;
       font-size:10px;
       height:100%;
       background-color: #7D8ce0;
       float:left;
       width:5%;
    }
    #left-nav ul{
        margin: 0;
        padding: 0;
    }
    #left-nav li{
        list-style: none;
        font-size: 24px;
        text-align: center;
        border-bottom: 1px solid #20a0ff;
        padding: 10px;
    }
    #left-nav i{
        display: inline-block;
        width: 31px;
        height: 31px;
    }
    #left-nav .icon1{
        background: url('~/../../../../static/icon/goumai.png') 0 0 / 100% 100% no-repeat;
    }
    #left-nav .icon2{
        background: url('~/../../../../static/icon/dianpu.png') 0 0 / 31px 31px no-repeat;
    }
    #left-nav .icon3{
        background: url('~/../../../../static/icon/hanbao.png') 0 0 / 31px 31px no-repeat;
    }
    #left-nav .icon4{
        background: url('~/../../../../static/icon/huiyuanka.png') 0 0 / 31px 31px no-repeat;
    }
    #left-nav .icon5{
        background: url('~/../../../../static/icon/shezhi.png') 0 0 / 31px 31px no-repeat;
    }
</style>