<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="topTab" v-show="showTabControl" class="tab-control"></tab-control>
    <Scroll class="wrapper"
            :probe-type="3"
            :pull-up-load="true"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <HomeSwiper ref="hSwiper" :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <FeatureView></FeatureView>
      <TabControl ref="tabControl" class="tab-control" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="showGoodsList"></GoodsList>
    </Scroll>
    <BackTop v-show="showBackTop" @click.native="backTop"></BackTop>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/common/scroll/Scroll";
  import {getHomeMultidata,getProductData} from "network/home";
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        showBackTop: false,
        showTabControl: false,
        tabOffsetTop: 0,
        saveY: 0,
        test: [],
        copy: [],
        copy2: {},
        copy3: [],
        copy4: []
      }
    },
    computed: {
      showGoodsList() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1. 请求多个数据
      this.getMultiData()
      //2.请求商品数据
      this.getProductData('pop')
      this.getProductData('new')
      this.getProductData('sell')
    },
    mounted() {
      //1.监听图片加载完成事件
      this.$bus.$on('imgLoad',() =>{
        this.$refs.scroll.refresh()
      })
      //2.获取offsetTop
      /* console.log(this.$refs.tabControl.$el)*/
      //console.log(this.$refs.tabControl.$el.offsetTop)
    },
    methods: {
      // 请求多个数据
      getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          console.log("banners",this.banners)
          this.recommends = res.data.recommend.list
          this.test = this.banners
          console.log("test1",this.test)
          // this.copy2 = this.test[0]
          // console.log("copy2",this.copy2)
          // this.copy2.height = 300;
          // console.log("copy2",this.copy2)
          // this.test = res.data.recommend.list
          // this.test = ["aa"]
          this.test[0].height = 300
          console.log("test2",this.test)
          console.log("banners",this.banners)
          this.copy3 = ["1","2"]
          console.log("copy3",this.copy3)
          this.copy4 = this.copy3
          console.log("copy4",this.copy4)
          this.copy4.push("3")
          console.log("copy3",this.copy3)
        })
      },
      // 请求商品数据
      getProductData(type) {
        const page = this.goods[type].page+1;
        getProductData(type,page).then(res => {
          const newList = res.data.list;
          this.goods[type].list.push(...newList);
          this.goods[type].page += 1;
          //加载完做一次刷新操作
          this.$refs.scroll.finishPullUp()
        })
      },
      // 事件监听
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      // 滚动监听
      contentScroll(position) {
        // console.log(position)
        //显示隐藏回到顶部按钮
        this.showBackTop = (-position.y) > 1000
        //显示隐藏tabcontrol
        this.showTabControl = (-position.y) >= this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        // console.log('上拉加载更多');
        this.getProductData(this.currentType);
      },
      // 回到顶部
      backTop() {
        // console.log("回到顶部");
        this.$refs.scroll.scrollTo(0,0,500)
      },
      // 轮播图加载完毕即计算高度
      swiperImageLoad() {
        //获取offsetTop 用于控制tabControl显示隐藏
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      }
    },
    // 监听进入首页
    activated() {
      // console.log("进入首页");
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    // 监听离开首页
    deactivated() {
      // console.log("离开首页");
      this.saveY = this.$refs.scroll.scroll.y
    },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
    padding-top: 44px;
  }
  .wrapper {
    /*设置范围*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
