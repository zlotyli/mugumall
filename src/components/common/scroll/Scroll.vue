<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入better-scroll
import BScroll from 'better-scroll'
// import Pullup from '@better-scroll/pull-up'
// // 安装下拉加载插件
// BScroll.use(Pullup);

export default {
  name: 'Scroll',
  data(){
    return {
      scroll: null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 开启点击侦测
      click:true,
      // 为了照顾到复用时是否需要监听滚动的距离，故该属性通过用户赋值决定
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
        // console.log(position);
        // 通过子组件滚动时发送事件给父组件，告诉父组件我滚动了，通过父组件来获取子组件滚动的值来进行相关操作
          this.$emit('scroll', position);
        })
    }

    // 3.监听上拉加载更多事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多');
        this.$emit('pullingUp');
        // this.scroll.finishPullUp();
      })
    }
    
    // 可以通过this.scroll.scrollTo(0,0,500)返回顶部
    // this.scroll.scrollTo(0,0) ;
    // .scrollTo(x,y,time):参数为x坐标，y坐标以及所用时间
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    refresh(){
      // console.log('-----');
      this.scroll && this.scroll.refresh();
      // this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y:0;
    }
  }
}
</script>

<style scoped>
</style>