<template>
  <swiper>
    <swiper-item v-for="(item, index) in images"
                 :key="index" class="swiper-item">
      <img :src="item"  alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    props: {
      images: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .swiper-item {
    height: 300px;
  }
</style>
