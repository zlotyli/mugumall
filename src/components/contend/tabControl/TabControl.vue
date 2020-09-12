<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
          :key="index" class="tab-control-item" 
          :class="{active:index === currentIndex}"
          @click="itemClick(index)">
      <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    // 在此传入要显示的文字---只是文字不一样的时候没必要用插槽
    titles:{
      type:Array,
      default() {
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      // 向父组件传递信息--通过自定义事件
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1; 
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>