<template>
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
            <div v-for="course in cartCourses" :key="course.id" class="flex flex-col tablet:flex-row justify-between px-[15px] py-2 border-b-[1px]">
              <div class="flex tablet:my-[20px] tablet:w-1/2">
                <img :src="course.image" width="62px" height="34px" class="tablet:hidden rounded" alt="">
                <img :src="course.image" width="120px" height="68px" class="hidden tablet:block rounded-md" alt="">
                <p class="mx-3 text-sm flex-grow tablet:text-base tablet:ml-3 tablet:mr-1">{{ course.title }}</p>
                <img src="../src/images/delete.svg" width="24px" height="24px" class="tablet:hidden cursor-pointer" alt="" @click="removeCourse(course.id)">
              </div>
              <div class="flex justify-between mt-2 mb-1 tablet:flex-grow ">
                <p class="text-xs tablet:text-lg tablet:py-[30px] tablet:ml-[55px] text-neutral-500">{{ course.price }}</p>
                <p class="text-sm tablet:text-xl tablet:py-[30px] tablet:flex-grow tablet:text-right tablet:mr-[40px] text-neutral-600">{{ course.prices[course.prices.length-1].price }}</p>
                <img src="../src/images/delete.svg" width="24px" height="24px" class="hidden tablet:block mr-[8px] cursor-pointer" alt="" @click="removeCourse(course.id)">
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
                <p class="text-base text-neutral-500 before:content-['$']">{{ saleTotal }}</p>
              </div>
              <p class="mt-[50px] text-[28px] tablet:mt-[10px] text-right text-neutral-700 before:content-['$']">{{ cartTotal }}</p>
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
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:'CartComponent',
    inject:['reload'],
    props:{
        isAuthenticated: Boolean,
    },
    data(){
        return{
            emptyCourses:{
                "items": [
                    {
                        "id": 1,
                        "coupon": ""
                    }
                ],
            },
        }
    },
    methods: {
        fetchCartCoursesFromLocal(){

        },

        removeCourse(id){
            if(this.isAuthenticated){
                const courseData = this.emptyCourses
                courseData.items[0].id = id
                this.$store.dispatch('removeCourseFromApi', courseData)
                this.reload()
            } else {
                console.log('111')
            }
        },
    },
    mounted(){
        if(!this.isAuthenticated){
            this.fetchCartCoursesFromLocal()
        } else {
            this.$store.dispatch('fetchCartCoursesFromApi')
        }
    },
    computed:{
        ...mapState({
            cartCourses: state => state.cartCourses
        }),
        saleTotal() {
            let total = 0
            for (let i = 0; i < this.cartCourses.length; i++) {
            total += this.cartCourses[i].price
        }
            return total
        },
        cartTotal() {
            let total = 0
            for (let i = 0; i < this.cartCourses.length; i++) {
            const length = this.cartCourses[i].prices.length-1
            total += this.cartCourses[i].prices[length].price
        }
            return total
        }
    },
}
</script>