// 在这个地方引入按需加载的组件
// lazyload components here
import React from 'react'

import HomePage from 'bundle-loader?lazy&name=Home!pages/Home'
import HotPage from 'bundle-loader?lazy&name=Hot!pages/Hot'

import Bundle from '../components/Lazyload'
const DefaultLoading = () => <div style={{height: '100px'}}>正在加载</div>
const loadComponent = (Component, Loading = DefaultLoading) => () => (
  <Bundle load={Component}>
    {
    (Component) => Component ? <Component /> : <Loading />
    }
  </Bundle>
  )
const NAV__LOGIN = [
  {
    title: '首页',
    route: '/index',
    component: loadComponent(HomePage),
    exact: true,
    // hidden:true
  },
  {
    title: '首页',
    route: '/index/:id',
    component: loadComponent(HomePage),
    hidden: true ,//隐藏该导航，用于做首页参数路由
    exact: false
  },
  {
    title: '热门',
    route: '/hot',
    component: loadComponent(HotPage)

    // child: [
    //   {
    //     title: 'Sub1',
    //     route: '/page1/sub1',
    //     component: loadComponent(Sub1)
    //   }, {
    //     title: 'Sub2',
    //     route: '/page1/sub2',
    //     component: loadComponent(Sub2)
    //   }
    // ]
  }
]

const NAV__LOGOUT = [
  {
    title: '首页',
    route: '/',
    component: loadComponent(HotPage)
  },
]

const TYPES = [
  {
    title:'所有',
    id:'all'
  },
  {
    title:'学生',
    id:'students'
  },
  {
    title:'教职工',
    id:'staff'
  },
  {
    title:'学生会',
    id:'student-union'
  },
  {
    title:'社团',
    id:'community'
  },
  {
    title:'学校组织',
    id:'school-organization'
  }, {
    title:'自建组织',
    id:'cus-organization'
  },
]
export {NAV__LOGIN,NAV__LOGOUT,TYPES}
