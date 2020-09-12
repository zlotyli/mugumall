<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']" 
                  @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>

// 公共组件的导入
// 可复用与其他项目的组件
// 导入头部导航栏
import NavBar from 'components/common/navbar/NavBar';
// 导入顺滑滚动的组件Scroll
import Scroll from 'components/common/scroll/Scroll'

// 业务相关公共组件
// 导入中间的导航条
import TabControl from 'components/contend/tabControl/TabControl'
// 导入总的商品组件--其中已经包裹了每个单独的完整商品组件
import GoodsList from 'components/contend/goods/GoodsList'
// 导入回到顶部的BackTop组件
import BackTop from 'components/contend/backTop/BackTop'


// 导入与该Home文件相关的childComps中的组件
import HomeSwiper from './childComps/HomeSwiper';//轮播图组件
import RecommendView from './childComps/RecommendView';//轮播图下法四张图组件
import FeatureView from './childComps/FeatureView';//本周流行组件



// 导入网络请求的模块
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home";


export default {
  name:'Home',
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false
    }
  },
  computed:{
    // 通过该计算属性来替换长语句
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components:{
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
    
  },
  // 组件创建好后调用网路请求
  created(){//只写主要逻辑---具体处理逻辑在methods中 
    // 1.请求多个数据（轮播图以及下方图）
    this.getHomeMultidata()
    // 请求商品数据--最开始需要请求三个数据，并且都是第一页的数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    
  },
  methods: {
    // 推荐栏点击事件监听相关的方法
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
      }
    },
    // 返回顶部点击事件监听
    backClick(){
      // 通过this.$refs来父访问子组件中的数据
      this.$refs.scroll.scrollTo(0,0);
    },
    // 实现BackTop的显示与隐藏
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = -position.y>1000
    },
    // 上拉加载更多
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
    },
    // 网路请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      // 请求下一页
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        // 此时的res为请求到type的前三十条(一页)数据
        // 将该请求到的数据添加到对应的goods中的对应type的list中
        this.goods[type].list.push(...res.data.list)
        // 添加完毕后需要将当前page更新即加一
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>