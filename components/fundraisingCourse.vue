<template>
    <div id="fundraisingCourse" class="bg-neutral-100 w-auto tablet:max-w-screen-xl flex justify-center">
      <div class="container max-w-7xl">
        <h1 class="my-[20px] mx-3 text-Gray-title tablet:text-2xl tablet:mt-[45px]">募資課程</h1>
        <div class="flex flex-col tablet:flex-row tablet:ml-3 overflow-scroll">
          <div v-for="fund_course in fundraisingCourses" :key="fund_course.id" class="flex flex-col mx-3 tablet:mx-0 tablet:mr-[15px]">
            <!-- mobile -->
            <div class="container flex flex-col mb-2 bg-white p-2 rounded-md shadow-md tablet:hidden">
              <div class="flex justify-between">
                <img :src="fund_course.image"  class="w-5/12 rounded-md" alt="">
                <div class="flex flex-col flex-grow justify-between my-1 mx-2">
                  <p class="text-sm text-[#898989]">已募資{{ Math.floor(fund_course.consumers/fund_course.fundraising_tickets*100) }}%</p>
                  <div id="bar" class="h-[6px] w-1/3 rounded-full bg-[#F0F0F0]">
                    <div class="h-[6px] rounded-full bg-red-500" :style="calWidth(fund_course.fundraising_tickets,fund_course.consumers)"></div>
                  </div>
                  <p class="inline-block before:content-['$']">{{ formatNumber(fund_course.prices[fund_course.prices.length-1].price) }} <span class="before:content-['$'] text-[#BFBFBF] line-through">{{ formatNumber(fund_course.fixed_price) }}</span></p>
                </div>
                <div>
                  <img :src="fund_course.lecturers[0].avatar" class="mt-1 mr-1 object-cover w-[23px] h-[23px] rounded-full" alt="">
                </div>
              </div>
              <p  class="mt-[10px] text-base text-[#454545] flex-grow">{{ fund_course.title }}</p>
            </div>
            <!-- pc -->
            <div class="hidden container tablet:flex flex-col w-[280px] mb-2 bg-white rounded-md shadow-md">
              <div class="relative h-[153px]">
                <img :src="fund_course.image"  class="w-full rounded-t-md h-[153px] object-fill" alt="">
                <img src="../src/images/bookmark-border.svg" alt="" class="z-10 cursor-pointer absolute bottom-2 right-12">
                <img src="../src/images/shopping-cart.svg" class="z-10 cursor-pointer absolute bottom-2 right-2" alt="" @click="cartToggler(fund_course.id)" >
              </div>
              <div>
                <p  class="text-xl text-[#454545] mx-[15px] mt-[15px] mb-[5px] h-20">{{ fund_course.title }}</p>
                <div class="flex">
                  <img :src="fund_course.lecturers[0].avatar" class="object-cover w-[37px] h-[37px] rounded-full mx-[15px]" alt="">
                  <p class="text-[#8C8C8C] text-base pt-1.5">{{ fund_course.lecturers[0].username }}</p>
                </div>
                <div class="flex justify-between mx-[15px] my-[5px]">
                  <p class="text-sm text-left text-[#595959]">剩 3 天</p>
                  <p class="text-sm text-right text-[#595959]">已募資{{ Math.floor(fund_course.consumers/fund_course.fundraising_tickets*100) }}%</p>
                </div>
                <div class="flex flex-col mx-[15px] mb-[5px]">
                  <div id="bar" class="h-[10px] w-full rounded-full bg-[#F0F0F0]">
                    <div class="h-[10px] rounded-full bg-red-500" :style="calWidth(fund_course.fundraising_tickets,fund_course.consumers)"></div>
                  </div>
                  <p class="text-xl text-gray-700 inline-block before:content-['$'] mt-[10px]">{{ formatNumber(fund_course.prices[fund_course.prices.length-1].price) }} <span class="text-sm before:content-['$'] text-[#BFBFBF] line-through">{{ formatNumber(fund_course.fixed_price) }}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import api from '../plugins/api'
import NumberMixin from '~/mixins/global'

export default{
    name:'FundraisingCourse',
    mixins:[NumberMixin],
    data(){
        return{
            fundraisingCourses: [],
            emptyCourses:{
                "items": [
                    {
                        "id": 1,
                        "coupon": ""
                    }
                ],
            },
            isLoading: true,
        }
    },
    computed:{
        ...mapState({
            cartCourses: state => state.cartCourses,
            isAuthenticated: state => state.isAuthenticated
        }),
        chectFundraisingTicket(){
            return this.fundraisingCourses.filter(course => course.fundraising_tickets!==0)
        },
    },
    created(){
        this.isLoading = true
        this.fetchFundraisingCourseData();
    },
    methods: {
        async fetchFundraisingCourseData(){
            try {
                const {data} = await api.getCourse()
                this.fundraisingCourses = data
                this.isLoading = false

            } catch(e) {
                console.error(e)
                this.isLoading = false
            }
        },
        calWidth(tickets, consumers){
            let wRatio = (consumers/tickets)*100
            if(wRatio>100){
                wRatio = 100
            }
            const w = wRatio.toString()+"%"
            return {width: w}
        },
        cartToggler(id){
            const onClickCourseData = this.fundraisingCourses.find(course => course.id === id)
            const isExistInCarts = this.cartCourses.find(course => course.id === id)
            const isLogin = this.isAuthenticated
            if(isExistInCarts && isLogin){
                const courseData = this.emptyCourses
                courseData.items[0].id = id
                this.$store.dispatch('removeCourseFromApi', courseData)
            } else if (isExistInCarts && !isLogin) {
                this.$store.commit('removeCourseFromLocal', onClickCourseData)
            } else if (!isExistInCarts && isLogin) {
                const courseData = this.emptyCourses
                courseData.items[0].id = id
                this.$store.dispatch('addCourseFromApi', courseData)
            } else {
                this.$store.commit('addCourseFromLocal', onClickCourseData)
            }
        }
    },
}
</script>