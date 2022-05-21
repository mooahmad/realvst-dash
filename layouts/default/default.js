import Header from '../components/header/header.vue'
import SideMenu from '../components/side-menu/side-menu.vue'
export default{
    components:{
        Header,
        SideMenu
    },

   mounted(){
       console.log(this.$route.path,"nameee")
   }
}