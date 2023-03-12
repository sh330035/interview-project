/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      'tablet': '768px',
      // => @media (min-width: 768px) { ... }

      'mid-tablet': '800px',

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage:{
        'accountImg': "url('/src/images/account.svg')",
        'lockImg': "url('/src/images/lock.svg')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
