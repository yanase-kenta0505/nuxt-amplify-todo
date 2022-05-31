import { actionTree } from "typed-vuex"
import { TodosType } from "~~/types/data";
import state from "~/store/amplifyTodos/state";
import mutations from "~/store/amplifyTodos/mutations";
import { createTodo } from "~/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "~/graphql/queries";

export default actionTree(
  { state, mutations },
  {
    //TODO : プロパティ 'data' は型 'GraphQLResult<any> | Observable<object>' に存在しません。
    async initTodos({ commit }) {
      const todos = await API.graphql(graphqlOperation(listTodos))
      commit('setTodos', todos.data.listTodos.items)
    },

    async addTodo(context, newTodoItem: TodosType) {
      console.log(newTodoItem)
      await API.graphql(graphqlOperation(createTodo, { input: newTodoItem }))
    },


  }
);

