<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick"></tab-control>
          <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "Category",
    components: {
      Scroll,
      NavBar,
      TabMenu,
      TabContentCategory,
      TabControl,
      GoodsList
    },
    data() {
      return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      //请求分类数据
      this.getCategory()
    },
    methods: {
      getCategory() {
        //1.请求分类数据
        getCategory().then(res => {
          console.log(res);
          this.categories = res.data.category.list
          //2.初始化每个类别子数据
          for(let i=0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //3.请求第一个二级分类数据
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentIndex = index
        const mailKey = this.categories[index].maitKey
        getSubcategory(mailKey).then(res => {
          console.log(res);
          //保存相关信息
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}

          //分类请求详情数据
          this.getCategoryDetail('pop')
          this.getCategoryDetail('new')
          this.getCategoryDetail('sell')
        })
      },
      getCategoryDetail(type) {
        //1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          console.log(res);
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        console.log(index)
        this.getSubcategories(index)
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType ='sell'
        }
        this.getCategoryDetail(this.currentType)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
