<template>
  <div class="bg-white flex flex-col h-screen">
    <div class="w-auto tablet:max-w-screen-xl min-h-[50px] shadow-md flex justify-center z-10">
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
          <input type="text" name="" id="" class="hidden border-hidden tablet:block mx-1 px-2 w-auto  min-w-0 flex-grow rounded-none bg-white text-hi-block min-md:text-sm outline-none" placeholder="搜尋">
        </div>
        <div class="flex">
          <ul class="hidden tablet:flex items-center">
            <li>
              <a href="/" class="block py-[10px] mx-2 text-blueGray-4 hover:font-semibold">我想開課</a>
            </li>
            <li v-if="login">
              <a href="/" class="block py-[10px] mx-2 text-blueGray-4 hover:font-semibold">我的學習</a>
            </li>
            <li>
              <img src="../src/images/cart.svg" class="mx-2" width="20" height="20" alt="">
            </li>
            <li v-if="login">
              <button class="block">
                <img src="../src/images/david.png" class="avatar-32" alt="">
              </button>
            </li>
            <li v-if="!login" class="flex-shrink-0 min-md:block min-xl:ml-[29px] min-md:ml-[25px]">
              <button @click="openModal" class="ml-6 w-16 h-8 rounded border-default text-sm leading-8 border-[1px] border-cyan-600 text-cyan-600 bg-white">登入</button>
            </li>
            <li v-if="!login" class="flex-shrink-0 min-md:ml-[10px] min-md:block">
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
            <MeunComponent v-if="isMenuOpen" :show="isMenuOpen"></MeunComponent>
          </ul>
        </div>
      </div>
    </div>
    <LoginComponent v-if="showModal" :show="showModal" @close="closeModalPare"></LoginComponent>
    
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
            <div v-for="course in dummyData_courses" v-bind:key="course.id" class="flex flex-col tablet:flex-row justify-between px-[15px] py-2 border-b-[1px]">
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
          <div v-for="fund_course in dummyData_fundraising_courses" v-bind:key="fund_course.id" class="flex flex-col mx-3 tablet:mx-0 tablet:mr-[15px]">
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
import LoginComponent from "~/components/loginComponent.vue";
import MeunComponent from "~/components/menuComponent.vue"

export default {
    name: "IndexPage",
    components: { LoginComponent, MeunComponent },
    data() {
        return {
            login: false,
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
            isMenuOpen: false,
            email: '',
            password: ''
        };
    },
    methods:{
      openModal() {
        this.showModal = true
      },
      openMenu(){
        this.isMenuOpen = !this.isMenuOpen
      },
      closeModalPare(val){
        this.showModal = val
      }
    },
}
</script>
