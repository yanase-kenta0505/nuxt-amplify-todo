import { actionTree } from "typed-vuex"
import state from "~/store/amplifyTodos/state";
import mutations from "~/store/amplifyTodos/mutations";
import { createTodo, deleteTodo, updateTodo } from "~/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "~/graphql/queries";
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from "~/graphql/subscriptions";
import { CreateTodoInput, DeleteTodoInput, UpdateTodoInput } from "~/API";
import Observable from 'zen-observable'

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
          commit('changeTodo', todo)
        }
      })
    },

    async addTodo(_, input: CreateTodoInput) {
      await API.graphql(graphqlOperation(createTodo, { input }))
    },

    async deleteTodo(_, input: DeleteTodoInput) {
      await API.graphql(graphqlOperation(deleteTodo, { input }))
    },

    async updateToDo(_, input: UpdateTodoInput) {
      console.log(input)
      try {
        await API.graphql(graphqlOperation(updateTodo, { input }))
      } catch (error) {
        console.log(error)
      }
    }
  }
);

