<template>
  <div class="bottom-nav">
    <div class="bottom-bar-item bottom-bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bottom-bar-item bottom-bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBottomBar",
  data(){
    return {
      
    }
  },
  methods:{
    addToCart(){
      // console.log('点击了添加到购物车');
      this.$emit('addToCart');
    }
  }
}
</script>

<style scoped>
.bottom-nav{
  height: 49px;
  /* background:red; */
  /* position: relative; */
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  z-index:1000;
}
.bottom-bar-item{
  flex:1;
  display: flex;
}
.bottom-bar-item>div{
  flex: 1;
}
.bottom-bar-left .text{
  font-size: 13px;
}
.bottom-bar-left .icon{
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bottom-bar-left .service{
  background-position: 0 -54px;
}
.bottom-bar-left .shop{
  background-position: 0 -98px;
}
.bottom-bar-right{
  font-size: 15px;
  color:#fff;
  line-height: 49px;
}
.bottom-bar-right .cart{
  background-color: #ffe817;
  color: #333;
}
.bottom-bar-right .buy{
  background-color: #f69;
}

</style>