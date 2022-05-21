import { getAccessorType } from 'typed-vuex'

import * as todos from '~/store/todos'

export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {}

export const accessorType = getAccessorType({
    state,
    getters,
    mutations,
    actions,
    modules: {
        todos,
    },
})
