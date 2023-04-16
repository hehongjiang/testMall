<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        required: true
      }
    },
    data() {
      return{

      }
    },
    methods: {
      imageLoad() {
        this.$emit('swiperImageLoad')
      }
    }
  }
</script>

<style scoped>

</style>