import { getAccessorType } from "typed-vuex";
import todos from "~/store/todos/index";

export const state = () => ({});
export const getters = {};
export const mutations = {};
export const actions = {};

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    todos,
  },
});
