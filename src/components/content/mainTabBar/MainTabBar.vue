<template>
<div id="app">
    <tab-bar>
        <tab-bar-item path="./home">
            <img slot='item-icon' src="../../../assets/img/home.svg" alt="">
            <div slot='item-text'>首页</div>
        </tab-bar-item>
        
        <tab-bar-item path="./category">
            <img slot='item-icon' src="../../../assets/img/category.svg" alt="">
            <div slot='item-text'>分类</div>
        </tab-bar-item>
        
        <tab-bar-item path="./cart">
            <img slot='item-icon' src="../../../assets/img/cart.svg" alt="">
            <div slot='item-text'>购物车</div>
        </tab-bar-item>
        
        <tab-bar-item path="./profile">
            <img slot='item-icon' src="../../../assets/img/profile.svg" alt="">
            <div slot='item-text'>我的</div>
        </tab-bar-item>
    </tab-bar>
</div>
</template>
<script>
import TabBar from 'components/common/TabBar/TabBar.vue'
import TabBarItem from 'components/common/TabBar/TabBarItem.vue'
export default {
    name:'App',
    components:{
        TabBar,
        TabBarItem
    }
}
</script>
<style>
    @import '../../../assets/css/base.css';
</style>