<template>
  <scroll class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  export default {
    name: "CartList",
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Scroll,
      CartListItem
    }
  }
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
</style>
