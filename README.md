# Hiskio-interview
## 介紹
本專案使用 Nuxt.js 框架搭配 Tailwindcss 框架，以 Vuex 進行狀態管理，並使用 axios 進行 api 串接。網站具有登入、登出，身份驗證；購物車新增項目與刪除功能。

主要框架版本：

|#|框架名稱|版本|備註
|--|----|----|----
|01|Nuxt.js|2.15.8|基於 Vue 2
|02|Tailwindcss|3.2.7|----

## 專案功能
#### 一般使用者：
* 登入、登出 - 可運用 HiSKIO 帳號及密碼，登入系統，登出系統 ( 登出暫須從 mobile 模式，點選右上角，跳出選單後，點擊登出 )
* 刪除購物車內商品 - 點擊購物車右側 Delete 即可刪除
* 下方商品卡片新增、刪除商品 - 點擊下方商品卡片 Cart icon。若商品不在購物車，即加入購物車；反之，則從購物車內刪除
* 購物車商品保留 - 無論登入與否，重新整理頁面皆會保留購物車內容

## 快速使用

```bash
# install dependencies
$ cd interview-project
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).


