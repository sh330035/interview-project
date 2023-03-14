<template>
  <div class="bg-white flex flex-col h-screen">
    <NavbarComponent :showModal="showModal" @open="openModalPare"></NavbarComponent>
    <LoginComponent v-if="showModal" :show="showModal" :isProcessing="isProcessing" @close="closeModalPare" @after-form-submit="afterFormSubmit" ></LoginComponent>
    
    <CartComponent v-if="isRouterAlive && (isAuthenticated!==undefined)" :isAuthenticated="isAuthenticated"></CartComponent>
    <FundraisingCourse></FundraisingCourse>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../plugins/api'
import NavbarComponent from '~/components/navbarComponent.vue'
import LoginComponent from "~/components/loginComponent.vue";
import CartComponent from "~/components/cartComponent.vue";
import FundraisingCourse from "~/components/fundraisingCourse.vue";

export default {
    name: "IndexPage",
    components: { NavbarComponent, LoginComponent, CartComponent, FundraisingCourse},
    provide(){
      return{
        reload: this.reload
      }
    },
    data() {
        return {
            // 防止使用者重複點擊
            isProcessing: false,
            showModal: false,
            isRouterAlive: true,
        };
    },
    methods:{
      openModalPare(val){
        this.showModal = val
      },
      closeModalPare(val){
        this.showModal = val
      },
      reload(){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }, 
      async afterFormSubmit(accountDetail){
        try{
          this.isProcessing = true;
          const res = await api.login({
            account: accountDetail.account,
            password: accountDetail.password,
            confirm: accountDetail.confirm
          })
          const { data } = res;

          localStorage.setItem("token", data.access_token);
          this.$store.dispatch('fetchCartCoursesFromApi')

          this.getCurrentUser()
          this.isProcessing = false;

          this.$router.push('/');

        } catch(e){
          console.log(e);
          this.isProcessing = false;
        }
      },
      async getCurrentUser(){
        try{
          const {data} = await api.getCurrentUser()
          const userData = {
            username: data.username,
            avatar: data.avatar
          }
          this.$store.commit("setCurrentUser", userData);
          console.log(data)
          
        } catch(e) {
          console.error(e.message)
        }
      }
    },
    computed:{
      ...mapState({
        isAuthenticated: state => state.isAuthenticated,
        username: state => state.currentUser.username,
        avatar: state=> state.currentUser.avatar
      })
    },
    mounted(){
      const checkLogin = localStorage.getItem("token")
      if(checkLogin){
        this.$store.commit("setAuth", true);
        this.getCurrentUser();
      }
    }
}
</script>
