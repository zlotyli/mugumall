<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
  </div>

</template>

<script>
// 导入头部导航栏
import NavBar from 'components/common/navbar/NavBar';
// 导入封装有轮播图的childComps中的HomeSwiper组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

// 导入网络请求的模块
import {getHomeMultidata} from "network/home";


export default {
  name:'Home',
  data(){
    return{
      banners:[],
      recommends:[]
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  // 组件创建好后调用网路请求
  created(){
    // 1.请求多个数据
    getHomeMultidata().then(res=>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>