<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" 
                    class="check-button"
                    @click.native="clickCheck"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/contend/checkButton/CheckButton';
import { mapGetters } from 'vuex';

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+ this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price * item.count
      },0).toFixed(2);
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length;
    },
    isSelectAll(){
      if(!this.cartList.length) return false;
      // 方法一---find函数
      // return !(this.cartList.find(item=>!item.checked))
      // 方法二---filter函数
      return !(this.cartList.filter(item=>!item.checked).length)
    }
  },
  methods:{
    clickCheck(){
      if(this.isSelectAll){
        // 当全部都选中时---使所有的都不选中
        this.cartList.forEach(item=>item.checked = false)
      }else{
        // 当有部分或全部都不选中时---使所有都选中
        this.cartList.forEach(item=>item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000);
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price{
  margin-left: 30px;
  font-size: 14px;
  flex: 1;
}
.calculate{
  width: 100px;
  color: #fff;
  background-color: var(--color-tint);
  text-align: center;
}
</style>