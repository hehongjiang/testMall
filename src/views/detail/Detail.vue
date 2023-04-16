<template>
  <div id="detail">
    <DetailNavBar :current-index="currentIndex" @titleClick="titleClick"></DetailNavBar>
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <DetailSwiper :images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info="paramInfo"  ref="param"></DetailParamInfo>
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
      <goods-list ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message='message' :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import Scroll from "components/common/scroll/Scroll";
  import DetailSwiper from './childComps/DetailSwiper'
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import Toast from 'components/common/toast/Toast'
  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Toast
    },
    data() {
      return {
        currentIndex: 0,
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTops: [],
        message: "",
        show: false
      }
    },
    created() {
      // 1. 取出iid
      this.iid = this.$route.query.iid;
      console.log("iid",this.iid);
      // 2. 发送网络请求，获取商品信息
      getDetail(this.iid).then(res => {
        console.log(res);
        // 获取顶部图片
        this.topImages = res.result.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        // console.log(this.goods)
        // 获取店铺信息
        this.shop = new Shop(res.result.shopInfo)
        // 获取商品详细信息
        this.detailInfo = res.result.detailInfo
        //获取商品参数
        this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
        // console.log("商品参数",this.paramInfo)
        //保存评论信息
        if (res.result.rate.list){
          this.commentInfo = res.result.rate.list[0];
          // console.log("评论",res.result.rate.list[0])
        }
      })
      // 3. 发送网络请求,获取推荐信息
      getRecommend().then(res => {
        // console.log(res);
        this.goodsList = res.data.list
      })
    },
    methods: {
      //每当图片加载器完成就获取offsetTop
      imageLoad() {
        this.$refs.scroll.refresh()
        // 获取对应的offsetTop
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      },
      addToCart() {
        // console.log('加入购物车');
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        this.$store.dispatch("addCart",obj).then((res) => {
          // this.$toast({message: '加入购物车成功'})
          this.$toast.show(res,1500)
        })
      },
      titleClick(index) {
        this.currentIndex = index;
        // 点击滑到对应的位置
        this.$refs.scroll.scrollTo(0,-this.themeTops[index],500)
      },
      contentScroll(position) {
        // 监听滚动到某个主题
        this._listenScrollTheme(-position.y)
      },
      _listenScrollTheme(position) {
        //对数组长度进行赋值
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++) {
          //遍历themeTops
          let iPos = this.themeTops[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           */
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  .wrapper {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
