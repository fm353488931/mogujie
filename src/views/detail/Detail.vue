<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type='3'>
         <detail-swiper :topImages='topImages'></detail-swiper>
         <detail-base-info :goods='goods'></detail-base-info>
         <detail-shop-info :shop='shop'></detail-shop-info>
         <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
         <detail-param-info ref='params' :param-info='paramInfo'></detail-param-info>
         <detail-comment-info ref='comment' :comment-info='commentInfo'></detail-comment-info>
         <goods-list ref='recommend' :goods='recommends'></goods-list>
      </scroll>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message='message' :show='show'></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Toast from 'components/common/toast/Toast'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
import {BACK_POSITION} from "common/const";

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        Toast,
        GoodsList
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            message:'',
            show:false
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created(){
        // 1.保存iid
        this.iid = this.$route.params.iid
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            // 1.轮播图数据
            const data = res.result;
            this.topImages = data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // 3.创建店铺信息
            this.shop= new Shop(data.shopInfo)
            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo
            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            // 6.获取评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
        })
        getRecommend().then(res=>{
            this.recommends = res.data.list
        })
        this.getThemeTopY = debounce(()=>{
            this.themeTopYs=[]
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },100)
    },
    destroyed(){
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position){
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i=0;i<length;i++){
                if(this.currentIndex!==i &&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i]))){
                    this.currentIndex=i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            this.isShowBackTop=(-position.y)>BACK_POSITION
        },
        addToCart(){
            const product={}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            this.$store.dispatch('addCart',product).then(
                res=>{
                    this.show=true;
                    this.message=res;
                    setTimeout(() => {
                        this.show=false;
                        this.message=''
                    }, 1500);
                }
            )
        }

    }
}
</script>

<style scoped>
#detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 9;

}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    position: absolute;
    top: 44px;
    bottom: 60px
}
</style>