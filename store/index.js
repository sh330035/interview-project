import Vuex from "vuex";
import api from "~/plugins/api";

const createStore =() =>{
    return new Vuex.Store({
        state: {
            isAuthenticated: Boolean,
            currentUser:{
                username:'',
                avatar:''
            },
            token: '',
            cartCourses: [],
        },
        getters: {
          getUser: state => state.currentUser,
        },
        mutations: {
          // user 設定，登入&登出
          setCurrentUser(state, currentUser) {
            state.currentUser = {
              ...state.currentUser,
              ...currentUser
            }
            state.isAuthenticated= true
          },
          setAuth(state, Auth){
            state.isAuthenticated = Auth
          },
          revokeAuthentication(state) {
            state.currentUser = {}
            state.isAuthenticated = false
            state.token = ''
            localStorage.removeItem('token')
          },
          setCartCourses(state, courseData){
            state.cartCourses.splice(0,state.cartCourses.length)
            for(let i=0; i<courseData.length; i++){
              state.cartCourses.push(courseData[i].courses[0])
            }
          }
        },
        actions: {
          setCurrentUser(context, currentUser) {
            context.commit('setCurrentUser', currentUser);
          },
          async fetchCartCoursesFromApi({commit}) {
            try{
              const {data} = await api.addToCart()
              const courseData = data.data
              commit('setCartCourses', courseData)
            } catch(e){
              console.error(e)
            }
          },
          async removeCourseFromApi({commit}, courseDataQS){
            try{
              await api.removeFromCart(courseDataQS)
              const {data} = await api.addToCart()
              const courseData = data.data
              commit('setCartCourses', courseData)
            }catch(e){
                console.error(e.message)
            }
          },
          async addCourseFromApi({commit}, courseDataQS){
            try{
              const {data} = await api.addToCart(courseDataQS)
              const courseData = data.data
              commit('setCartCourses', courseData)
            }catch(e){
                console.error(e.message)
            }
          },
        },
    })
}

export default createStore;