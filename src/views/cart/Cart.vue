<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{this.Length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex';
export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // 两种语法使用对象展开运算符将 getter 混入 computed 对象中
    //1.普通
    // ...mapGetters(['cartLength'])
    // 2.使用对象给getter中的计算属性赋别名
    ...mapGetters({
      Length:'cartLength'
    })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>