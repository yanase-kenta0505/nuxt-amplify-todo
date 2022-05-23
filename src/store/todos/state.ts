import { TodosType } from "~~/types/data";

const state = () => ({
  storeTodos: [] as TodosType[],
});

export default state;

export type State = ReturnType<typeof state>;
