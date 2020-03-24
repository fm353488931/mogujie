import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data(){
        return {
            itemImgListener: null,
            newRefresh: null,
        }
    },
    mounted(){
        this.newRefresh = debounce(this.$refs.scroll.refresh)

        this.itemImgListener = () => {
            this.newRefresh()
            this.$router.go(0);
        }

        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        }
    }
}