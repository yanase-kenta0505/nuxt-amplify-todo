

//TODO : anyを使わないよう方法を考える
const state = () => ({
  amplifyTodos : [] as any[],
});

export default state;

export type State = ReturnType<typeof state>;