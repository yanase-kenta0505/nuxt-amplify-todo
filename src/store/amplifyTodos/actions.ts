import { actionTree } from "typed-vuex"
import { TodosType } from "~~/types/data";
import state from "~/store/amplifyTodos/state";
import mutations from "~/store/amplifyTodos/mutations";

export default actionTree(
  { state, mutations },
  {

    addTodo(context, newTodoItem: TodosType): void {
      console.log('actioms')
    },


  }
);
