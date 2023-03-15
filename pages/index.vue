<template>
  <div class="bg-white flex flex-col h-screen">
    <NavbarComponent :show-modal="showModal" @open="openModalPare"></NavbarComponent>
    <LoginComponent v-if="showModal" :show="showModal" :is-processing="isProcessing" @close="closeModalPare" @after-form-submit="afterFormSubmit" ></LoginComponent>
    
    <CartComponent v-if="(isAuthenticated!==undefined)" :is-authenticated="isAuthenticated"></CartComponent>
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
    data() {
        return {
            // 防止使用者重複點擊
            isProcessing: false,
            showModal: false,
        };
    },
    computed:{
      ...mapState({
        isAuthenticated: state => state.isAuthenticated,
        username: state => state.currentUser.username,
        avatar: state=> state.currentUser.avatar
      })
    },
    beforeMount(){
      const checkLogin = localStorage.getItem("token")
      if(checkLogin){
        this.$store.commit("setAuth", true);
        this.getCurrentUser();
      } else {
        this.$store.commit("setAuth", false);
      }
    },
    methods:{
      openModalPare(val){
        this.showModal = val
      },
      closeModalPare(val){
        this.showModal = val
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
          
        } catch(e) {
          console.error(e.message)
        }
      }
    },
}
</script>
