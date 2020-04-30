import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 管理账号信息
const USERS_KEY = 'akec_KEY';
 

const store = new Vuex.Store({
	state: {
		forcedLogin: false,
		hasLogin: false,
		id: "",
		userName: "",
		user:"",
		auditStatus:0,
	},
	mutations: {
		login(state,data) {
			state.id=data.id;
			state.userName=data.account;
			state.auditStatus=data.auditStatus;
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.id= "";
			state.auditStatus=0;
			state.hasLogin = false;
		}
	}
})

export default store
