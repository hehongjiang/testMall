<template>
  <div class="goods-list">
    <goods-list-item
            v-for="item in goods"
            :goods-item="item" class="item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    /*包裹*/
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }
  .goods-list .item {
    width: 48%;
  }

</style>