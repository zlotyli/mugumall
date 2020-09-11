<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 动态绑定样式，activeStyle为一计算属性 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  data(){
    return{
      // isActive:true,
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{};
    }
  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  methods:{
    itemClick(){
      // console.log('itemClick');
      this.$router.push(this.path);
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 3px;
    margin-bottom: 2px;
  }
  /* .active{
    color: red;
  } */
</style>