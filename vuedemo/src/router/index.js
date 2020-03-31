import Vue from 'vue'
import Router from 'vue-router'
import posIndex from '@/components/page/posIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posIndex',
      component: posIndex
    }
  ]
})
