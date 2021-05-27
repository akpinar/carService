import Vue from 'vue'
import Vuex from 'vuex'
import deneme from '@/services/UserService'
import {auth} from './auth.module'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  settings: null,
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  setUsers (state,users){
    state.users=users;
  },
  getUsers (state){
    return state.users;
  },
  setSettings (state,settings){
    state.settings = settings;
  },
  getSettings (state){
    return state.settings;
  },
}
const actions = {

  authentication(){
      deneme.authentication();
    },
  getSettings:() => {
    return Promise.resolve(state.settings);
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    auth
  }
})