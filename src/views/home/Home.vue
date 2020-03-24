<template>
<div id='home'>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','综合','销量']"
                    @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll" 
            :pull-up-load="true" @pullingUp='loadMore'>
        <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','综合','销量']"
                    @tabClick="tabClick" ref="tabControl2"/>
        <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
    name:'Home',
    components:{
        NavBar,
        Scroll,
        TabControl,
        HomeSwiper,
        RecommendView,
        FeatureView,
        GoodsList,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            tabOffsetTop:0,
            isTabFixed:false,
        }
    },
    created(){
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted(){
    },
    deactivated(){
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
        /*
        事件监听相关方法
        */
       tabClick(index){
           switch(index){
               case 0:
                   this.currentType='pop';
                   break;
               case 1:
                   this.currentType='new';
                   break;
               case 2:
                   this.currentType='sell';
                   break;
           }
           if(this.$refs.tabControl1 !== undefined){
            this.$refs.tabControl1.currentIndex= index;
            this.$refs.tabControl2.currentIndex= index;
           }
       },
       contentScroll(position){
        this.isShowBackTop=(-position.y)>1000
        this.isTabFixed=(-position.y)>this.tabOffsetTop
       },
       loadMore(){
           this.getHomeGoods(this.currentType)
       },
       swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
       },
        /*
        网络请求相关方法
        */
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
            console.log(res)
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
        })
        },
        getHomeGoods(type){
            const page = this.goods[type].page+1
            getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1
                this.$refs.scroll.finishPullUp()
        })
        }
    }
}
</script>
<style scoped>
#home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color:var(--color-tint);
    color: white;
}

.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
.tab-control{
    position: relative;
    z-index: 9;
}
</style>