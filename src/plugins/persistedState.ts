import createPersistedState from 'vuex-persistedstate'
import { Context } from '@nuxt/types'

export default ({ store }:Context) => {
  createPersistedState({
    key: 'LocalTodos'
  })(store)
}
