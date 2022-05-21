//タスク（TODO）の型
export interface TodosType {
  id: string;
  taskName: string;
  selected: boolean;
  done: boolean;
}

//全てのタスク（TODOS）の型
export interface LocalTodos {
  todos: {
    storeTodos: TodosType[];
  };
}

//タスク名を変更する際にactionsに送られるidと新しいタスク名の型
export interface Item {
  id: string;
  newTaskName: string;
}
