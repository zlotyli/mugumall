
<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图相关组件
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  // 注册轮播图组件
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      // console.log("-----");
      if(!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
  
}
</script>

<style>

</style>