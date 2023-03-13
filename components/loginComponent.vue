<template>
    <div>  
      <div class="fixed z-20 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
          <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div class="bg-white rounded-lg w-[450px] h-[700px] z-30 relative">
            <img src="../src/images/bg-login.svg" alt="" class="absolute -z-10">
            <button class="top-0 right-0 mt-[28px] mr-[28px] text-[#595959] absolute" @click="closeModal" >
                    <svg class="fill-current text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                        <path d="M18 1.41L16.59 0 9 7.59 1.41 0 0 1.41 7.59 9 0 16.59 1.41 18 9 10.41 16.59 18 18 16.59 10.41 9z"/>
                    </svg>
            </button>
            <div class="flex justify-center">
                <img src="../src/images/hiskio.svg" alt="" class="w-[120px] my-[32px]">
            </div>
            <div class="px-[65px] flex justify-around">
                <div :class="['text-3xl px-2 pb-[5px] text-center cursor-pointer', {'text-[#D9D9D9]':activeTab === 'register'}, {'text-[#42A4BC] border-b-4 border-[#42A4BC] ': activeTab === 'login'}]" @click="activeTab = 'login'">登入</div>
                <div :class="['text-3xl px-2 text-center cursor-pointer', {'text-[#D9D9D9]':activeTab === 'login'}, {'text-[#42A4BC] border-b-4 border-[#42A4BC]': activeTab === 'register'}]" @click="activeTab = 'register'">註冊
                </div>
            </div>
            <div class="px-[65px] mt-[20px] flex flex-col">
                <div class="flex justify-start rounded-md border-[1px] border-[#BFBFBF] cursor-pointer py-[8px] pl-[70px] mb-[12px]">
                    <img src="../src/images/facebook.svg" alt="" height="28px" width="28px">
                    <p class="ml-[12px] text-base text-[#595959]">使用 Facebook 登入</p>
                </div>
                <div class="flex justify-start rounded-md border-[1px] border-[#BFBFBF] cursor-pointer py-[8px] pl-[70px] mb-[12px]">
                    <img src="../src/images/Google.svg" alt="" height="28px" width="28px">
                    <p class="ml-[12px] text-base text-[#595959]">使用 Google 登入</p>
                </div>
                <div class="flex justify-start rounded-md border-[1px] border-[#BFBFBF] cursor-pointer py-[8px] pl-[70px] mb-[12px]">
                    <img src="../src/images/github.svg" alt="" height="28px" width="28px">
                    <p class="ml-[12px] text-base text-[#595959]">使用 Github 登入</p>
                </div>
                <div class="flex justify-start rounded-md border-[1px] border-[#BFBFBF] cursor-pointer py-[8px] pl-[70px] mb-[12px]">
                    <img src="../src/images/linkedin.svg" alt="" height="28px" width="28px">
                    <p class="ml-[12px] text-base text-[#595959]">使用 LinkedIn 登入</p>
                </div>
            </div>
            <form  v-if="activeTab === 'login'" class="px-[65px] mt-[15px]" @submit.prevent.stop="handleFormSubmit">
                <div class="flex flex-col">
                    <p class="text-base text-[#595959] text-center mb-[25px]">使用 HiSKIO ID 登入</p>
                    <div class="relative">
                        <input id="account" v-model="accountDetail.account"  class="shadow appearance-none border-hidden rounded w-full pl-[35px] pr-4 py-2 mb-[10px] text-gray-700 text-sm bg-[#FAFAFA] leading-tight placeholder:text-[#BFBFBF]  focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"  type="" placeholder="請輸入 HiSKIO ID" required>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[7px] pb-[6px]">
                            <img src="../src/images/account.svg" alt="" class="w-6 h-6">
                        </div>
                    </div>
                    <div class="relative">
                        <input id="password" v-model="accountDetail.password"  class="shadow appearance-none border-hidden rounded w-full pl-[35px] pr-4 py-2 text-gray-700 text-sm bg-[#FAFAFA] mb-3 leading-tight placeholder:text-[#BFBFBF]   focus:outline-none focus:shadow-outline" type="password" placeholder="請輸入登入密碼" title="密碼且須含有英文與數字" required>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[7px] pb-[6px]">
                            <img src="../src/images/lock.svg" alt="" class="w-6 h-6">
                        </div>
                    </div>
                    <div class="flex my-[15px]">
                        <input id="check" type="checkbox"  class="w-5 h-5 rounded appearance-none checked:bg-[#178FAC]"  required/>
                        <p class="text-[#8C8C8C] text-sm ml-[5px]">登入註冊即代表您同意<a href="/" class="underline">使用者及隱私權政策</a></p>
                    </div>
                    <button class="bg-[#178FAC] hover:bg-[#10778F] text-white text-base py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" :disabled="isProcessing">
                    登入
                    </button>
                    <a class="text-center align-baseline pt-[15px] text-base text-[#8C8C8C] hover:text-gray-600" href="#">
                    忘記密碼
                    </a>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
    name:"LoginComponent",
    props: {
        isProcessing: {
            type: Boolean,
            required: true,
        },
        show: Boolean
    },
    data() {
        return {
            showModal: false,
            activeTab: 'login',
            accountDetail: {
                account: "",
                password: "",
                confirm: true,
            },
        }
    },
    methods: {
        closeModal() {
            this.$emit('close', false)
        },
        handleFormSubmit() {
            // formSubmit
            this.$emit("after-form-submit", this.accountDetail);
            // console.log("提交表單");
            this.closeModal()
        },
    }
}
</script>
  