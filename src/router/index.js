import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {path: '/list',component:  resolve => require(['../components/list'], resolve)},  //懒加载
    {path: '/video',component:  resolve => require(['../components/video'], resolve)}
  ]
})
