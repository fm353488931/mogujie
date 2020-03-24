<template>
        <div class='tab-bar-item' @click="itemClick">
            <slot name='item-icon'></slot>
            <div :class="{active:isActive}">
                <slot name='item-text'></slot>
            </div>
        </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path: String
    },
    data(){
        return{}
    },
    computed:{
        isActive(){
            return this.$route.path===this.path
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
        }
    }
}
</script>>
<style>
.tab-bar-item{
    flex:1;
    text-align:center;
    height: 49px;
    font-size:12px;
}
.tab-bar-item img{
    width:22px;
    height:22px;
    margin-top:4px;
}
.active{
    color:red
}
</style>