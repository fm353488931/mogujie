<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in $store.state.cartList" :key="index" :item-info='item'></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
    name:'CartList',
    components:{
      Scroll,
      CartListItem
    },
    activated(){
      this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart_list {
  height: calc(100% - 44px -49px - 50px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>