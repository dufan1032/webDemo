<template>
    <div id="posIndex">
      <el-row>
        <el-col :span='8' class='order' id="orderHeight">
          <el-tabs type='border-card' :value='chicked' stretch>
            <el-tab-pane label='点餐' name='order'>
              <el-table :data="tableData" border :summary-method='tatol' show-summary :max-height='maxHeight' id="nnn">
                <el-table-column prop='foodName' label='商品'></el-table-column>
                <el-table-column prop='counts' label='数量' width='50'></el-table-column>
                <el-table-column prop='unitPrice' label='金额' width='70'></el-table-column>
                <el-table-column label='操作' width='100' fixed='right'>
                  <template slot-scope="scope">
                    <el-button type='text' size='small' @click="delFood(scope.row)">删除</el-button>
                    <el-button type='text' size='small' @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="oper-button">
                <el-button type='success' @click="checkout()">结账</el-button>
                <el-button type='info' @click="waitCheckoutFn()">挂单</el-button>
                <el-button type='danger' @click="delOrder()">删除</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label='挂单' name='wait'>
              <el-table :data="waitCheckout" border :max-height='maxHeight' id="nnn">
                <el-table-column type='index' width='50' fixed='left'></el-table-column>
                <el-table-column prop='oddNumber' label='单号'></el-table-column>
                <el-table-column prop='price' label='金额'></el-table-column>
                <el-table-column label='操作' fixed='right'>
                  <template slot-scope="scope">
                    <el-button type='warning' size='mini' @click="delWait(scope.row)">删除</el-button>
                    <el-button type='success' size='mini' @click="checkoutWait(scope.row)">结账</el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span='16' class="foodInterface">
          <div class='often-foods'>
            <div class="title">常用食品列表</div>
            <div class="often-foods-list">
              <ul>
                <li v-for="datas in oftenFoods" @click="addOrderList(datas)">
                  <span>{{ datas.foodName }}</span>
                  <span class="o-unitPrice">¥{{ datas.unitPrice }}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="foods-list">
            <el-tabs type='border-card' stretch>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-burger"></i>主食</span>
                <ul class="foods-class">
                  <li v-for="food in stapleFood" @click="addOrderList(food)">
                    <span class="foodImg"><img :src="food.foodImg" width="100%" :alt="food.foodName"></span>
                    <span class="foodName">{{ food.foodName }}</span>
                    <span class="unitprice">¥{{ food.unitPrice }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-dessert"></i>小食</span>
                <ul class="foods-class">
                  <li v-for="food in snack" @click="addOrderList(food)">
                    <span class="foodImg"><img :src="food.foodImg" width="100%" :alt="food.foodName"></span>
                    <span class="foodName">{{ food.foodName }}</span>
                    <span class="unitprice">¥{{ food.unitPrice }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-ice-drink"></i>饮品</span>
                <ul class="foods-class">
                  <li v-for="food in drinks" @click="addOrderList(food)">
                    <span class="foodImg"><img :src="food.foodImg" width="100%" :alt="food.foodName"></span>
                    <span class="foodName">{{ food.foodName }}</span>
                    <span class="unitprice">¥{{ food.unitPrice }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-food"></i>套餐</span>
                <ul class="foods-class">
                  <li v-for="food in setMeal" @click="addOrderList(food)">
                    <span class="foodImg"><img :src="food.foodImg" width="100%" :alt="food.foodName"></span>
                    <span class="foodName">{{ food.foodName }}</span>
                    <span class="unitprice">¥{{ food.unitPrice }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from 'axios' 
export default {
  name : 'posIndex',
  data (){
    return {
      tableData : [],
      waitCheckout : [],
      chicked : 'order',
      oftenFoods : [],
      stapleFood : [],
      snack : [],
      drinks : [],
      setMeal : [],
      maxHeight : 0,
      totalNumber : 0,
      totalMonery : 0,
    }
  },
  methods : {
    tatol : function(param){
      const { columns, data } = param;
      const sum = ['总计',0,0];
      columns.forEach((column,index)=>{
        if(index === 0 || index === 3){
          return false;
        }
        const value = data.map(item => Number(item[column.property]));
        if(index === 1){
          sum.count = value;
        }else if(index === 2){
          for(let i=0;i<value.length;i++){
            sum[1] += sum.count[i];
            sum[2] += sum.count[i] * value[i];
          }
          sum.count = null;
        }
      });
      this.totalNumber = sum[1];
      this.totalMonery = sum[2];
      return sum;
    },
    addOrderList : function(data){
      // 根据数据进行判断，该商品在订单列表中是否存在
      let isExist = false;  // 默认该商品不存在
      for(let i=0;i<this.tableData.length;i++){ // 循环订单列表
        if(this.tableData[i].foodName === data.foodName){ 
          // 如果商品名一致，修改默认为 存在
          isExist = true;
        }
      }
      // 根据判断结果，操作订单列表
      if(isExist){
        // 如果商品存在，找到商品数量，然后 +1
        let foodCount = this.tableData.filter(el =>el.foodName == data.foodName);
        foodCount[0].counts ++;
      }else{
        // 如果不存在，则在订单列表里添加此商品
        let newFoods = {foodName : data.foodName , counts : 1 ,unitPrice : data.unitPrice};
        this.tableData.push(newFoods);
      }
      this.chicked = 'order';
    },
    delFood : function(data){
      if(data.counts > 1){
        // 商品数量大于1，减少一个商品数量
        let foodCount = this.tableData.filter(el => el.foodName == data.foodName);
        foodCount[0].counts --;
      }else{
        // 商品数量等于1，删除此商品
        this.tableData = this.tableData.filter(el => el.foodName != data.foodName);
      }
    },
    delOrder : function(){
      this.tableData = [];
    },
    checkout : function(){
      if(this.tableData == false){
        this.$message.error('您还没添加商品，请添加商品后再结账');
      }else{
        let warn = window.confirm('是否继续结单！');
        if(!warn) return false;
        axios.post('https://www.fastmock.site/mock/4d18e6d41cb67832e81ec52b914f7a05/vueDemoPos/checkout',{
          'billDatsa' : this.tableData
        })
          .then(response => {
            // console.log(response.data);
            if(response.data.data.stuta == 1){
              this.tableData = [];
              this.$message({
                message : '账单提交成功，感谢您的配合！',
                type : 'success'
              });
            }
          })
          .catch(err => console.log(err));
      }
    },
    waitCheckoutFn : function(){
      if(this.tableData == false){
        this.$message.error('您还没添加商品，请添加商品后再挂单');
      }
      let newait = { oddNumber : new Date().getTime(), price : this.totalMonery , orderData : this.tableData};
      this.waitCheckout.push(newait);
      this.storageData(this.waitCheckout);
      this.tableData = [];
      this.chicked = 'wait';
    },
    delWait : function(data){
      let wait = window.confirm('确认删除' + data.oddNumber +'\n挂单？');
      if(wait){
        this.delWaitFn(data);
      }
    },
    checkoutWait : function(data){
      let checkout = window.confirm('确认结算' + data.oddNumber +'挂单!');
      if(checkout){
        this.tableData = data.orderData;
        this.chicked = 'order';
        this.delWaitFn(data);
      }
    },
    delWaitFn : function(data){
      let localData = JSON.parse(localStorage.getItem("waitOrders"))['waitOrder'];
      for(let i=0;i<localData.length;i++){
        if(localData[i].oddNumber == data.oddNumber){
          localData.splice(i,1);
          this.waitCheckout.splice(i,1);
        }
      }
      if(localData == false) return false;
      this.storageData(localData);
    },
    storageData : function(data){
      localStorage.clear();
      localStorage.setItem('waitOrders', JSON.stringify({'waitOrder' : data}));
    }
  },
  created : function(){
    this.maxHeight = document.body.clientHeight * 0.85;

    localStorage.clear();
    if(JSON.parse(localStorage.getItem("waitOrders")) != null){
      this.waitCheckout = JSON.parse(localStorage.getItem("waitOrders"))['waitOrder'];
    }

     // 常用食品列表
     axios.get('https://www.fastmock.site/mock/4d18e6d41cb67832e81ec52b914f7a05/vueDemoPos/oftenFoods')
     .then(response => {
       this.oftenFoods = response.data.oftenFoods;
     })
     .catch(err => {
       alert(err);
     });

    //  商品列表列表
     axios.get('https://www.fastmock.site/mock/4d18e6d41cb67832e81ec52b914f7a05/vueDemoPos/goodsList')
     .then(response => {
       this.stapleFood = response.data.stapleFood;
       this.snack = response.data.snack;
       this.drinks = response.data.drinks;
       this.setMeal = response.data.setMeal;
     })
     .catch(err => {
       alert(err);
     });
  },
  mounted : function(){
    const orderHeight = document.body.clientHeight;
    document.getElementById('orderHeight').style.height = orderHeight + 'px';
    document.getElementsByClassName('foodInterface')[0].style.height = orderHeight + 'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}
a {
  color: #42b983;
}
.order{
  background: #409EFF;
}
.order .oper-button{
  text-align: center;
  margin-top: 15px;
}

.foodInterface {
  background: #4099dd;
}
.often-foods .title{
  height: 20px;
  border-bottom: 1px solid #D3DCE6;
  background: #F9FAFC;
  padding: 1%;
}
.often-foods-list ul li{
  float: left;
  border: 1px solid #E5E9F2;
  background: #FFF;
  padding: 1%;
  margin: 10px;
}
.often-foods-list .o-unitPrice{
  color: #58B7FF;
}

.foods-list {
  clear: both;
}
.foods-class li {
  width: 20%;
  border: 1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background: #ffffff;
  padding: 5px;
  margin: 10px;
}
.foods-class li span{
  width: 45%;
  float: left;
}
.foods-class .foodImg{
  height: 70px;
}
.foods-class .foodName{
  font-size: 16px;
  padding-left: 10%;
  color:brown;
}
.foods-class .unitprice{
  font-size: 16px;
  padding-left: 10%;
  padding-top:10px;
}
</style>
