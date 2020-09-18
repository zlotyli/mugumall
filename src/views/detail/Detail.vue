<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="detail-content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性传值时用：属性：topImages,传入值：top-images -->
      <detail-swiper :top-images="topImages" @topImageLoad="topImageLoad"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
// 导入详情页的导航条组件
import DetailNavBar from './childComps/DetailNavBar';
// 导入详情页的轮播图组件
import DetailSwiper from './childComps/DetailSwiper';
// 导入详情页的商品基本信息
import DetailBaseInfo from './childComps/DetailBaseInfo';
// 导入详情页的商铺信息
import DetailShopInfo from './childComps/DetailShopInfo';
// 导入详细页商品的详细信息
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
// 导入详情页商品的参数信息
import DetailParamInfo from './childComps/DetailParamInfo';
// 导入详情页商品评论信息
import DetailCommentInfo from './childComps/DetailCommentInfo';
// 导入详情页商品评论信息
import DetailBottomBar from './childComps/DetailBottomBar';




// 导入Scroll组件
import Scroll from 'components/common/scroll/Scroll';
// 导入GoodsList组件---用于展示商品推荐信息
import GoodsList from 'components/contend/goods/GoodsList'
// 导入回到顶部的BackTop组件
import BackTop from 'components/contend/backTop/BackTop'

// 导入混路中的内容
import {itemListenerMixin} from 'common/mixin'
// 导入防抖函数
import {debounce} from "common/utils"

// 导入详情页的网络请求模块，以及不同数据的集合类
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
export default {
  name:'Detail',
  // 使用mixins
  mixins:[itemListenerMixin],
  data(){
    return{
      iid:null,
      // 定义变量保存获取请求到的数据
      // 保存详细页上的轮播图图片信息
      topImages:[],
      // 保存详细页上商品基本信息
      goods:{},
      // 保存店铺信息
      shop:{},
      // 保存商品的详细信息
      detailInfo:{},
      // 保存商品参数信息
      paramInfo:{},
      // 保存评论信息
      commentInfo:{},
      // 保存推荐信息
      recommends:[],
      // 保存导航条上的title对应的滚动距离
      themeTopYs:[],
      // 将赋值themeTopYs封装在防抖函数中
      getThemeTopY:null,
      // 记录滚动到对应title的时候的index
      currentIndex:0,
      // 返回顶部的设置
      isShowBackTop:false
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  created(){
    // 1.保存传入的iid---该iid已经在当前详情页的路由中
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      // 此时获取到res的为一个大的数据集，从中分离保存要展示的数据
      const data = res.result;
      // 1.获取顶部轮播图图片数据
      this.topImages = res.result.itemInfo.topImages;
      // 2.获取商品基本信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详细数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 6.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0];
      }

      // 第一次获取值不对---this.$refs.dom压根没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);

      // this.$nextTick(()=>{
      //   // 第二次获取---图片没有计算在内
      //   // 根据最新的数据，对应的dom是已经被渲染完成
      //   // 但是图片并没有加载完(目前获取到的offsetTop并不包含其中的图片的)
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // })
    });
    // 3.请求商品推荐信息
    getRecommend().then(res=>{
      this.recommends = res.data.list;
      // console.log(res);
    })
    // 4.给getThemeTopY赋值--对this.themeTopYs的赋值操作进行防抖
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);
    },200)
  },
  methods:{
    detailImageLoad () {
      this.refresh();
      // console.log('-----')
      this.getThemeTopY();
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
    },
    // 自加
    topImageLoad(){
      this.refresh();
    },
    // 监听子组件发送来的滚动事件
    contentScroll(position){
      // console.log(position);
      // 1.获取滚动到的y值
      const positionY = -position.y
      // 2.将当前滚动的y值与主题定位的y值进行对比
      let length = this.themeTopYs.length;
      for(let i = 0;i<length; i++){
        if(this.currentIndex !== i&&
            ((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||
            (i===length-1&&positionY>=this.themeTopYs[i]))){
          // console.log(i)
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;

        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = positionY > 1200;
    },
    // 返回顶部点击事件监听
    backClick(){
      // 通过this.$refs来父访问子组件中的数据
      this.$refs.scroll.scrollTo(0,0);
    },
    // 监听子组件发送过来的addToCart
    addToCart(){
      // console.log('----');
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc =  this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中
      // this.$store.commit('addCart',product)//使用mutations来注册事件来修改state中的值
      this.$store.dispatch('addCart',product).then(res=>{
        // console.log(res);
        this.$toast.show(res,2000);
      })//使用actions来发送事件，再在mutations中修改state

    }
  },
  mounted(){
    // 以下内容由混路完成

    // // 图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,200)

    // // 对监听事件的处理进行保存
    // this.itemImgListener = ()=>{
    //   // this.$refs.scroll.refresh()
    //   refresh();
    // }
    // // 监听item中图片加载完成---当每次加载完成后会调用下方的方法---需要进行防抖动处理
    // this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content{
  height: calc(100% - 93px);
  position: relative;
  /* overflow: hidden; */
}
</style>