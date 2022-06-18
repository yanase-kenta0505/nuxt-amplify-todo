import { Todo } from "~/API";


//TODO : anyを使わないよう方法を考える
const state = () => ({
  amplifyTodos : <Todo[]>[]
});

export default state;

export type State = ReturnType<typeof state>;
