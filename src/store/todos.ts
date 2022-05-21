// Vuexに型をつけるために使用
import { mutationTree } from "typed-vuex";
import { TodosType, Item } from "~/types/data";

export const state = () => ({
  storeTodos: [] as TodosType[],
});

export const mutations = mutationTree(state, {
  addTodo(state, newTodoItem: TodosType) {
    state.storeTodos.push(newTodoItem);
  },
  deleteTodo(state, index: number) {
    state.storeTodos.splice(index, 1);
  },
  changeTodoDone(state, id: string) {
    const changeItem = state.storeTodos.find((todo) => todo.id === id);
    if (changeItem === undefined) return;
    changeItem.done = !changeItem.done;
  },

  changeTaskName(state, item: Item) {
    const selectedIndex = state.storeTodos.findIndex(
      (todo) => todo.id === item.id
    );
    if (item.newTaskName === "") {
      state.storeTodos.splice(selectedIndex, 1);
    } else {
      state.storeTodos[selectedIndex].taskName = item.newTaskName;
      state.storeTodos[selectedIndex].selected = false;
    }
  },
  allClear(state) {
    const newTodos = state.storeTodos.filter((todo) => todo.done === false);
    state.storeTodos = newTodos;
  },
  changeTodoselected(state, index: number) {
    state.storeTodos[index].selected = !state.storeTodos[index].selected;
  },
});
