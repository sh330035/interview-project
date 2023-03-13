<template>
  <div class="bg-white flex flex-col h-screen">
    <NavbarComponent :showModal="showModal" @open="openModalPare"></NavbarComponent>
    <LoginComponent v-if="showModal" :show="showModal" :isProcessing="isProcessing" @close="closeModalPare" @after-form-submit="afterFormSubmit" ></LoginComponent>
    
    <div id="main" class="w-auto tablet:max-w-screen-xl flex justify-center bg-neutral-50">
      <div class="container max-w-7xl flex flex-col tablet:flex-row tablet:mt-[70px] justify-between z-0">
        <div id="cart" class="container flex flex-col tablet:w-2/3">
          <h1 class="my-[20px] mx-3 text-Gray-title tablet:text-2xl">購物車</h1>
          <div class="container flex flex-col w-auto mx-[15px] shadow-md rounded-lg bg-white">
            <div class="hidden tablet:flex justify-between border-b-[1px] pt-3 pb-1">
              <p class="text-base text-gray-500 ml-[12px]">項目</p>
              <p class="text-base text-gray-500 flex-grow pr-[180px] text-right">售價</p>
              <p class="text-base text-gray-500 mr-[75px]">結帳金額</p>
            </div>
            <div v-for="course in dummyData_courses" :key="course.id" class="flex flex-col tablet:flex-row justify-between px-[15px] py-2 border-b-[1px]">
              <div class="flex tablet:my-[20px] tablet:w-1/2">
                <img :src="course.image" width="62px" height="34px" class="tablet:hidden rounded" alt="">
                <img :src="course.image" width="120px" height="68px" class="hidden tablet:block rounded-md" alt="">
                <p class="mx-3 text-sm flex-grow tablet:text-base tablet:ml-3 tablet:mr-1">{{ course.title }}</p>
                <img src="../src/images/delete.svg" width="24px" height="24px" class="tablet:hidden" alt="">
              </div>
              <div class="flex justify-between mt-2 mb-1 tablet:flex-grow ">
                <p class="text-xs tablet:text-lg tablet:py-[30px] tablet:ml-[55px] text-neutral-500">{{ course.prices[0].price }}</p>
                <p class="text-sm tablet:text-xl tablet:py-[30px] tablet:flex-grow tablet:text-right tablet:mr-[40px] text-neutral-600">{{ course.fixed_price }}</p>
                <img src="../src/images/delete.svg" width="24px" height="24px" class="hidden tablet:block mr-[8px]" alt="">
              </div>
            </div>
          </div>
        </div>
        <div id="subtotal" class="container flex flex-col tablet:w-1/3 tablet:mb-[235px]">
          <h1 class="my-[20px] mx-3 text-Gray-title tablet:text-2xl">小計</h1>
          <div class="container flex flex-col w-auto mx-[15px] px-[15px] shadow-md rounded-lg bg-white">
            <div class="flex flex-col border-b-2">
              <p class="text-base text-neutral-500 mt-4">輸入折扣代碼</p>
              <div class="flex justify-between">
                <input type="text" class="block my-3 py-2 px-3 rounded border-[1px] outline-none flex-grow tablet:mr-3">
                <button class="hidden tablet:block my-3 py-2 px-3 bg-[#FFE5E5] text-red-500 rounded h-[40px] w-1/4">確認</button>
              </div>
              <div class="mb-[80px] tablet:mb-[15px] flex">
                <a class="text-lg text-neutral-600 underline underline-offset-[3px]" href="">選擇抵用券</a>
                <img src="../src/images/arrow-down.svg" height="20px" width="20px" class="ml-1" alt="">
              </div>
            </div>
            <div class="flex flex-col py-4">
              <div class="flex justify-between">
                <p class="text-base text-neutral-500">金額</p>
                <p class="text-base text-neutral-500 before:content-['$']">{{ subtotle }}</p>
              </div>
              <p class="mt-[50px] text-[28px] tablet:mt-[10px] text-right text-neutral-700 before:content-['$']">{{ subtotle }}</p>
              <button class="bg-red-500 text-white text-base py-2 px-10 my-2 rounded-md">前往結帳</button>
              <p class="text-xs text-gray-500">
                點擊上方按鈕即表示您已閱讀並同意
                <a href="/" class="underline">「HiSKIO購買與退費政策」</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="fundraisingCourse" class="bg-neutral-100 w-auto tablet:max-w-screen-xl flex justify-center">
      <div class="container max-w-7xl">
        <h1 class="my-[20px] mx-3 text-Gray-title tablet:text-2xl tablet:mt-[45px]">募資課程</h1>
        <div class="flex flex-col tablet:flex-row tablet:ml-3">
          <div v-for="fund_course in dummyData_fundraising_courses" :key="fund_course.id" class="flex flex-col mx-3 tablet:mx-0 tablet:mr-[15px]">
            <!-- mobile -->
            <div class="container flex flex-col mb-2 bg-white p-2 rounded-md shadow-md tablet:hidden">
              <div class="flex justify-between">
                <img :src="fund_course.image"  class="w-5/12 rounded-md" alt="">
                <div class="flex flex-col flex-grow justify-between my-1 mx-2">
                  <p class="text-sm text-[#898989]">已募資{{  }}</p>
                  <div id="bar" class="h-[6px] w-1/3 rounded-full bg-[#F0F0F0]">
                    <div class="h-[6px] rounded-full bg-red-500" style="width: 45%"></div>
                  </div>
                  <p class="inline-block before:content-['$']">{{ fund_course.prices[0].price }} <span class="before:content-['$'] text-[#BFBFBF] line-through">{{ fund_course.fixed_price }}</span></p>
                </div>
                <div>
                  <img :src="fund_course.lectures[0].avatar" width="23px" height="23px" class="mt-1 mr-1 object-contain rounded-full" alt="">
                </div>
              </div>
              <p  class="mt-[10px] text-base text-[#454545] flex-grow">{{ fund_course.title }}</p>
            </div>
            <!-- pc -->
            <div class="hidden container tablet:flex flex-col w-[280px] mb-2 bg-white rounded-md shadow-md">
              <div>
                <img :src="fund_course.image"  class="w-full rounded-t-md h-[153px] object-fill" alt="">
              </div>
              <div>
                <p  class="text-xl text-[#454545] mx-[15px] mt-[15px] mb-[5px]">{{ fund_course.title }}</p>
                <div class="flex">
                  <img :src="fund_course.lectures[0].avatar" width="37px" height="37px" class="object-contain rounded-full mx-[15px]" alt="">
                  <p class="text-[#8C8C8C] text-base pt-1.5">{{ fund_course.lectures[0].username }}</p>
                </div>
                <div class="flex justify-between mx-[15px] my-[5px]">
                  <p class="text-sm text-left text-[#595959]">剩 3 天</p>
                  <p class="text-sm text-right text-[#595959]">已募資</p>
                </div>
                <div class="flex flex-col mx-[15px] mb-[5px]">
                  <div id="bar" class="h-[10px] w-full rounded-full bg-[#F0F0F0]">
                    <div class="h-[10px] rounded-full bg-red-500" style="width: 45%"></div>
                  </div>
                  <p class="text-xl text-gray-700 inline-block before:content-['$'] mt-[10px]">{{ fund_course.prices[0].price }} <span class="text-sm before:content-['$'] text-[#BFBFBF] line-through">{{ fund_course.fixed_price }}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../plugins/api'
import NavbarComponent from '~/components/navbarComponent.vue'
import LoginComponent from "~/components/loginComponent.vue";

export default {
    name: "IndexPage",
    components: { NavbarComponent ,LoginComponent},
    data() {
        return {
            // 防止使用者重複點擊
            isProcessing: false,
            dummyData_courses: [
                {
                    "id": 1,
                    "title": "區塊鏈開發實戰｜零基礎也能打造資產管理系統",
                    "image": "https://thumbnails.f5ezcode.in/eyJidWNrZXQiOiJjZG4uaGlza2lvLmNvbSIsImtleSI6ImNvdXJzZXNcLzM4cGxvemJieW45YzZ1NCIsImVkaXRzIjp7InBuZyI6eyJxdWFsaXR5Ijo4MH0sInJlc2l6ZSI6eyJmaXQiOiJjb250YWluIiwid2lkdGgiOjMwMH19fQ==",
                    "fixed_price": 1000,
                    "fundraising_tickets": 30,
                    "consumers": 15,
                    "prices": [
                        {
                            "fundraising": true,
                            "price": 1000,
                            "schedule_at": "2021-02-20 00:00:00"
                        }
                    ],
                    "lectures": [
                        {
                            "id": 1,
                            "username": "John",
                            "avatar": "https://cdn.hiskio.com/users/1854/avatar/YUuL0KBABvsro5p"
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "SQL Server實戰效能調校第四部曲：縱橫交易處理",
                    "image": "https://thumbnails.f5ezcode.in/eyJidWNrZXQiOiJjZG4uaGlza2lvLmNvbSIsImtleSI6ImNvdXJzZXNcLzM4cGxvemJieW45YzZ1NCIsImVkaXRzIjp7InBuZyI6eyJxdWFsaXR5Ijo4MH0sInJlc2l6ZSI6eyJmaXQiOiJjb250YWluIiwid2lkdGgiOjMwMH19fQ==",
                    "fixed_price": 1000,
                    "fundraising_tickets": 30,
                    "consumers": 15,
                    "prices": [
                        {
                            "fundraising": true,
                            "price": 1000,
                            "schedule_at": "2021-02-20 00:00:00"
                        }
                    ],
                    "lectures": [
                        {
                            "id": 1,
                            "username": "John",
                            "avatar": "https://cdn.hiskio.com/users/1854/avatar/YUuL0KBABvsro5p"
                        }
                    ]
                }
            ],
            dummyData_fundraising_courses: [
                {
                    "id": 1,
                    "title": "區塊鏈開發實戰｜零基礎也能打造資產管理系統",
                    "image": "https://thumbnails.f5ezcode.in/eyJidWNrZXQiOiJjZG4uaGlza2lvLmNvbSIsImtleSI6ImNvdXJzZXNcLzM4cGxvemJieW45YzZ1NCIsImVkaXRzIjp7InBuZyI6eyJxdWFsaXR5Ijo4MH0sInJlc2l6ZSI6eyJmaXQiOiJjb250YWluIiwid2lkdGgiOjMwMH19fQ==",
                    "fixed_price": 1000,
                    "fundraising_tickets": 30,
                    "consumers": 15,
                    "prices": [
                        {
                            "fundraising": true,
                            "price": 1000,
                            "schedule_at": "2021-02-20 00:00:00"
                        }
                    ],
                    "lectures": [
                        {
                            "id": 1,
                            "username": "John",
                            "avatar": "https://cdn.hiskio.com/users/1854/avatar/YUuL0KBABvsro5p"
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "SQL Server實戰效能調校第四部曲：縱橫交易處理",
                    "image": "https://thumbnails.f5ezcode.in/eyJidWNrZXQiOiJjZG4uaGlza2lvLmNvbSIsImtleSI6ImNvdXJzZXNcLzM4cGxvemJieW45YzZ1NCIsImVkaXRzIjp7InBuZyI6eyJxdWFsaXR5Ijo4MH0sInJlc2l6ZSI6eyJmaXQiOiJjb250YWluIiwid2lkdGgiOjMwMH19fQ==",
                    "fixed_price": 1000,
                    "fundraising_tickets": 30,
                    "consumers": 15,
                    "prices": [
                        {
                            "fundraising": true,
                            "price": 1000,
                            "schedule_at": "2021-02-20 00:00:00"
                        }
                    ],
                    "lectures": [
                        {
                            "id": 1,
                            "username": "John",
                            "avatar": "https://cdn.hiskio.com/users/1854/avatar/YUuL0KBABvsro5p"
                        }
                    ]
                }
            ],
            subtotle: 10000,
            showModal: false,
        };
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
    computed:{
      ...mapState({
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
