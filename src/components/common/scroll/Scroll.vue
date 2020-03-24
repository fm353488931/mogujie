<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:'Scroll',
    props:{
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:3,
            pullUpLoad: this.pullUpLoad
        });
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        });
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        });
        console.log('scroll挂载成功')
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll.refresh()
        }
    }
}
</script>

<style>

</style>