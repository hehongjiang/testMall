<template>
  <div class="tab-control">
    <div class="tab-control-item"
            v-for="(item,index) in titles"
         @click="itemClick(index)"
         :class="{active: currentIndex === index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles : {
        type: Array,
        default() {
          return ['流行', '新款', '精选']
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        // console.log("===========")
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control span {
    padding: 5px;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>