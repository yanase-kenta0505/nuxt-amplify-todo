import { actionTree } from "typed-vuex"
import { TodosType } from "~~/types/data";
import state from "~/store/amplifyTodos/state";
import mutations from "~/store/amplifyTodos/mutations";
import { createTodo, deleteTodo, updateTodo } from "~/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "~/graphql/queries";
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from "~/graphql/subscriptions";

export default actionTree(
  { state, mutations },
  {
    //TODO : プロパティ 'data' は型 'GraphQLResult<any> | Observable<object>' に存在しません。
    async initTodos({ commit, state }) {
      const todos = await API.graphql(graphqlOperation(listTodos))
      commit('setTodos', todos.data.listTodos.items)


      //TODO : 型定義をする
      const subscriptionCreate = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (subscribeTodo) => {
          const todo = subscribeTodo.value.data.onCreateTodo
          commit('setTodos', [...state.amplifyTodos, todo])
        },

      })

      const subscriptionDelete = API.graphql(graphqlOperation(onDeleteTodo)).subscribe({
        next: (subscribeTodo) => {
          const todo = state.amplifyTodos.filter(amplifyTodo => amplifyTodo.id !== subscribeTodo.value.data.onDeleteTodo.id)
          commit('setTodos', todo)
        }
      })

      const subscriptionUpdate = API.graphql(graphqlOperation(onUpdateTodo)).subscribe({
        next: (subscribeTodo) => {
          const todo = subscribeTodo.value.data.onUpdateTodo
          // const newAmplifyTodos = state.amplifyTodos.filter(amplifyTodo => amplifyTodo.id !== todo.id)
          commit('changeTodo',todo)
        }
      })
    },

    async addTodo(context, newTodoItem: TodosType) {
      await API.graphql(graphqlOperation(createTodo, { input: newTodoItem }))
    },

    async deleteTodo(context, selectId: string) {
      await API.graphql(graphqlOperation(deleteTodo, { input: { id: selectId } }))
    },

    async changeTodoDone({ state }, selectId: string) {
      const selectedTodo = state.amplifyTodos.find(amplifyTodo => amplifyTodo.id === selectId)
      await API.graphql(graphqlOperation(updateTodo, { input: { id: selectId, done: !selectedTodo.done } }))
    },

    async changeTodoselected({ state }, selectId: string) {
      const selectedTodo = state.amplifyTodos.find(amplifyTodo => amplifyTodo.id === selectId)
      await API.graphql(graphqlOperation(updateTodo, { input: { id: selectId, selected: !selectedTodo.selected } }))

    },
    async changeTaskName({ state }, items: any) {
      const selectedTodo = state.amplifyTodos.find(amplifyTodo => amplifyTodo.id === items.id)
      await API.graphql(graphqlOperation(updateTodo, { input: { id: items.id, taskName: items.taskName } }))
    }


  }
);

