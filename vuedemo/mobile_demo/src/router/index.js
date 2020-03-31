import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/shoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/login'
import Goods from '@/components/pages/goods'
import GoodsTypeList from '@/components/pages/GoodsTypeList'
import Cart from '@/components/pages/shoppingCart'
import MyShop from '@/components/pages/myShop'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods/:goodsId/:name',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children : [
        {
          path: '/ShoppingMall',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path: '/typelist',
          name: 'GoodsTypeList',
          component: GoodsTypeList
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/myshop',
          name: 'MyShop',
          component: MyShop
        },
      ]
    },
  ]
})