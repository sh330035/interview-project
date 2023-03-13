import Vuex from "vuex";

const createStore =() =>{
    return new Vuex.Store({
        state: {
            isAuthenticated: false,
            currentUser:{
                username:'',
                avatar:''
            },
            token: '',
        },
        getters: {
            getUser: state => {
              return state.currentUser;
            }
          },
          mutations: {
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
          },
          actions: {
            setCurrentUser(context, currentUser) {
              context.commit('setCurrentUser', currentUser);
            },
          }
    })
}

export default createStore;