import  state from '~/store/todos/state'
import  mutations from '~/store/todos/mutations'

 const todos = {
  namespace: true,
  state,
  mutations
}

export default todos
