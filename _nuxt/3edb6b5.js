(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{347:function(t,e,l){"use strict";l.r(e);var x={name:"MenuComponent",props:{isAuthenticated:Boolean,username:{type:String,default:""},avatar:{type:String,default:""}},methods:{logout:function(){this.$store.commit("revokeAuthentication"),this.$router.go(0)},openLoginModal:function(){this.$emit("open")}}},c=l(58),component=Object(c.a)(x,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"fixed z-10 inset-0 mt-[50px] tablet:max-w-xl justify-center"},[e("div",{staticClass:"flex justify-center min-h-screen"},[e("div",{staticClass:"fixed inset-0 bg-white mt-[50px] shadow-inner"},[e("div",{staticClass:"bg-[#EFF5F8]"},[t.isAuthenticated?e("div",{staticClass:"py-[30px] mx-[18px] border-b-2 flex"},[e("img",{staticClass:"rounded-full",attrs:{src:t.avatar,width:"40px",height:"40px",alt:""}}),t._v(" "),e("p",{staticClass:"text-[#434343] text-base ml-[25px] pt-1 leading-loose"},[t._v(t._s(t.username))])]):t._e(),t._v(" "),t.isAuthenticated?e("div",[t._m(0)]):t._e()]),t._v(" "),e("div",[e("div",{staticClass:"mt-[20px] w-full"},[e("ul",[e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]"},[t._v("探索課程")]),t._v(" "),t.isAuthenticated?t._e():e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]"},[t._v("企業方案")])]),t._v(" "),e("div",{staticClass:"border-b-2 mt-[10px] mx-[18px]"})]),t._v(" "),e("div",{staticClass:"mt-[20px] w-full"},[e("ul",[t.isAuthenticated?t._e():e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]",on:{click:t.openLoginModal}},[t._v("登入")]),t._v(" "),t.isAuthenticated?t._e():e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#178FAC] cursor-pointer active:bg-[#F5F5F5]"},[t._v("註冊")]),t._v(" "),t.isAuthenticated?e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#F5F5F5]",on:{click:t.logout}},[t._v("登出")]):t._e()])])])])])])}),[function(){var t=this,e=t._self._c;return e("ul",[e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]"},[t._v("我的課程")]),t._v(" "),e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]"},[t._v("我的抵用券")]),t._v(" "),e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]"},[t._v("任務版")]),t._v(" "),e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]"},[t._v("訂單記錄")]),t._v(" "),e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]"},[t._v("帳戶設定")]),t._v(" "),e("li",{staticClass:"px-[18px] py-[10px] w-full text-base text-[#434343] cursor-pointer active:bg-[#E7EEF2]"},[t._v("我開設的課")])])}],!1,null,null,null);e.default=component.exports}}]);