<template>
  <div class="wrapper" ref="wrapper">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType, //侦测
        click: true, //点击
        pullUpLoad: this.pullUpLoad //上拉加载更多
      })
      //2.监听滚动的区域
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
      /*this.scroll.scrollTo(0,0)*/
      //3.上拉加载更多
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    },
    methods: {
      //回到顶部
      scrollTo(x,y,time=100) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      //完成上拉刷新
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        // console.log('完成更新')
      },
      //加载完图片刷新
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }

</style>
