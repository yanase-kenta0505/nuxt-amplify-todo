import { getAccessorType } from "typed-vuex";
import * as todos from "~/store/todos";

export const accessorType = getAccessorType({
  modules: {
    todos,
  },
});
