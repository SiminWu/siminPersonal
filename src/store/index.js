import Vuex from 'vuex'
import * as states from './states';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

const modules = {
	moduleA: {
	  state: states.moduleA,
	  mutations: mutations.moduleA,
	  getters: getters.moduleA
	},
	moduleB: {
	  state: states.moduleB,
	  mutations: mutations.moduleB,
	  actions: actions.moduleB
	}
}

export default new Vuex.Store({
    modules
});