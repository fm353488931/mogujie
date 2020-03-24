<template>
  <div class="bottom-bar">
    <div class="check-content">
        <checkButton class="check-button" :is-checked='isSelectAll' @click.native="checkClick"/>
        <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            return !(this.$store.state.cartList.filter(item => !item.checked).length)
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => {
                    item.checked = false                    
                });
            }else{
                this.$store.state.cartList.forEach(item => {
                    item.checked = true                    
                })
            }
        }
    },
    props:{
        
    }
}
</script>

<style scoped>
.bottom-bar{
    width: 100%;
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    line-height: 40px;
    display: flex;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
}
.check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px
}
.price{
    margin-left: 20px;
    flex:1;
}
.calculate{
    width: 90px;
    background-color: var(--color-tint);
    color:white;
    text-align: center;
}
</style>