<template>
    <div class="fixed z-10 inset-0  mt-[50px] tablet:max-w-xl justify-center">
        <div class="flex justify-center min-h-screen">
            <div class="fixed inset-0 bg-white mt-[50px] shadow-inner">
                <div class="bg-[#EFF5F8]">
                    <div v-if="isAuthenticated" class="py-[30px] mx-[18px] border-b-2 flex">
                        <img :src="avatar" width="40px" height="40px" class="rounded-full" alt="">
                        <p class="text-[#434343] text-base ml-[25px] pt-1 leading-loose">{{username}}</p>
                    </div>
                    <div v-if="isAuthenticated">
                        <ul>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]">我的課程</li>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]">我的抵用券</li>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]">任務版</li>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]">訂單記錄</li>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]">帳戶設定</li>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]">我開設的課</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="mt-[20px] w-full">
                        <ul>
                            <li class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]">探索課程</li>
                            <li v-if="!isAuthenticated" class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]">企業方案</li>
                        </ul>
                        <div class="border-b-2 mt-[10px] mx-[18px]"></div>
                    </div>
                    <div class="mt-[20px] w-full">
                        <ul>
                            <li v-if="!isAuthenticated" class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]" @click="openLoginModal">登入</li>
                            <li v-if="!isAuthenticated" class="px-[18px] py-[10px] w-full text-base text-[#178FAC] cursor-pointer active:bg-[#F5F5F5]">註冊</li>
                            <li v-if="isAuthenticated" class="px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]" @click="logout">登出</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default{
    name: "MenuComponent",
    props:{
        isAuthenticated: Boolean,
        username: {
            type: String,
            default: ""
        },
        avatar:{
            type: String,
            default: ""
        }
    },
    methods:{
        logout() {
            this.$store.commit("revokeAuthentication");
            this.$router.push("/");
        },
        openLoginModal(){
            this.$emit('open')
        }
    }
}
</script>