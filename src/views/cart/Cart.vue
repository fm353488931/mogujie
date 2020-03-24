<template>
<div class="cart">
    <nav-bar class="nav-bar">
        <div slot="center">购 物 车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
</div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
    name:'Cart',
    components:{
        NavBar,
        CartList,
        CartBottomBar
    }
}
</script>
<style scoped>
#cart {
    height: 100vh;
}
.nav-bar{
    background-color:var(--color-tint);
    color:#fff;
    z-index: 9;
}
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>