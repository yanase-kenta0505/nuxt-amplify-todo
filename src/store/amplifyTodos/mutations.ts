import { mutationTree } from "typed-vuex"
import state from "./state"

//TODO:anyを使わない方法を考える
export default mutationTree(state, {
	setTodos(state, todos: any[]) {
		state.amplifyTodos = todos
	},
	changeTodo(state, todo) {
		const changeItemIndex = state.amplifyTodos.findIndex((amplifyTodo) => {
			return amplifyTodo.id === todo.id
		})
    state.amplifyTodos.splice(changeItemIndex,1,todo)
	},
})
