
import { mutationTree } from "typed-vuex";
import state from "./state";

//TODO:anyを使わない方法を考える
export default mutationTree(state, {
  setTodos(state, todos: any[]) {
    state.amplifyTodos = todos
  },
  
});



