<template>
    <div class="w-auto tablet:max-w-screen-xl min-h-[50px] shadow-md flex justify-center z-20 sticky top-0 bg-white">
      <div class="container max-w-7xl flex justify-between">
        <a href="/" class="h-full flex-shrink-0 min-md:mr-[10px] min-md:block min-xl:mr-6 nuxt-link-exact-active nuxt-link-active block">
          <img src="../src/images/hiskio.svg" class="h-3 mt-[18px] tablet:h-4 tablet:mt-4 ml-3" alt="">
        </a>
        <a href="/" class="hidden laptop:block min-xl:mr-6 min-md:mr-[11px] mx-3 mt-1">
          <img src="../src/images/徵才header-01 7.svg" width="80" height="40" class="h-10 w-[80px] object-contain" alt="">
        </a>
        <div class="hidden tablet:flex h-full  flex-col justify-center mx-3">
          <div class="explore-box cursor-pointer min-md:relative min-md:flex min-md:h-full min-md:items-center min-md:text-gray-700 min-md:hover:text-green-1 min-md:min-w-[56px] min-xl:min-w-[58px] align-middle flex">
            <img src="../src/images/grid.svg" class="mr-[6px] svg-inline--fa fa-th-large fa-w-16" width="20" height="20" alt="">
            <p class="text-neutral-500">課程</p>
          </div>
        </div>
        <div class="flex-grow flex justify-start rounded-[25px] py-[5px] px-3">
          <img src="../src/images/search.svg" class="" width="20" height="20" alt="">
          <input id="" type="text" name=""  class="hidden border-hidden tablet:block mx-1 px-2 w-auto  min-w-0 flex-grow rounded-none bg-white text-hi-block min-md:text-sm outline-none" placeholder="搜尋">
        </div>
        <div class="flex">
          <ul class="hidden tablet:flex items-center">
            <li>
              <a href="/" class="block py-[10px] mx-2 text-blueGray-4 hover:font-semibold">我想開課</a>
            </li>
            <li v-if="isAuthenticated">
              <a href="/" class="block py-[10px] mx-2 text-blueGray-4 hover:font-semibold">我的學習</a>
            </li>
            <li>
              <img src="../src/images/cart.svg" class="mx-2" width="20" height="20" alt="">
            </li>
            <li v-if="isAuthenticated">
              <button class="block">
                <img :src="avatar" class="avatar-32" alt="">
              </button>
            </li>
            <li v-if="!isAuthenticated" class="flex-shrink-0 min-md:block min-xl:ml-[29px] min-md:ml-[25px]">
              <button class="ml-6 w-16 h-8 rounded border-default text-sm leading-8 border-[1px] border-cyan-600 text-cyan-600 bg-white" @click="openModal">登入</button>
            </li>
            <li v-if="!isAuthenticated" class="flex-shrink-0 min-md:ml-[10px] min-md:block">
              <button class="ml-3 w-16 h-8 rounded text-sm leading-8 text-white bg-cyan-600">註冊</button>
            </li>
          </ul>
          <ul class="flex mt-[11px] tablet:hidden ">
            <li>
              <a href="/"><img src="../src/images/cart.svg" class="mx-2 mt-1" width="20" height="20" alt=""></a>
            </li>
            <li>
              <div class="h-5 w-5 mx-[20px] mt-2 cursor-pointer" @click="openMenu">
                <div class="w-4 h-0.5 bg-[#8C8C8C] transition-all duration-300 transform origin-top-left" :class="{ 'rotate-45 h-0.5 w-[18px] bg-[#595959]': isMenuOpen }"></div>
                <div class="w-4 h-0.5 bg-[#8C8C8C] transition-all duration-300 transform mt-1" :class="{ 'opacity-0': isMenuOpen }"></div>
                <div class="w-4 h-0.5 bg-[#8C8C8C] transition-all duration-300 transform origin-bottom-left mt-1" :class="{ '-rotate-45 h-0.5  w-[18px] bg-[#595959]': isMenuOpen }"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <MenuComponent v-show="isMenuOpen"  :is-authenticated="isAuthenticated" :username="username" :avatar="avatar" @open="openModal"></MenuComponent>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MenuComponent from "~/components/menuComponent.vue";

export default {
    name: "NavbarComponent",
    components:{ MenuComponent },
    props:{
        showModal: Boolean,
    },
    data(){
        return{
            isMenuOpen:false
        }
    },
    computed:{
      ...mapState({
        username: state => state.currentUser.username,
        isAuthenticated: state => state.isAuthenticated,
        avatar: state => state.currentUser.avatar
      })
    },
    methods:{
        openModal() {
            this.$emit('open', true)
        },
        openMenu(){
            this.isMenuOpen = !this.isMenuOpen
        },
    },
}
</script>