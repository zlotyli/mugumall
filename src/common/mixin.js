import {debounce} from "common/utils";
export const itemListenerMixin = {
  data(){
    return {
      // 保存全局监听图片加载后执行的方法--用于取消
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    // 图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh,200)

    // 对监听事件的处理进行保存
    this.itemImgListener = ()=>{
      // this.$refs.scroll.refresh()
      this.refresh();
    }
    // 监听item中图片加载完成---当每次加载完成后会调用下方的方法---需要进行防抖动处理
    this.$bus.$on('itemImageLoad',this.itemImgListener);
  }
}
/**
 * 通过混路，可以将其中封装的生命周期以及data中的数据会自动添加到导入并使用混路的vue实例中
 */