<template>
  <v-app>
    <title-area>
      <!-- scoped slotを使用して子コンポーネントのデータを受け取るÏ -->
      <template #owner="{ ownerName, message }">
        <h2 class="text-center">
          HELLO {{ ownerName.firstName }}
          {{ ownerName.lastName }}
          <br />
          {{ message }}
        </h2>
      </template>
      <!-- scoped slotを使用して親コンポーネントのボタンから子コンポーネントのonメソッドを発火する -->
      <template #activator="{ on }">
        <v-btn class="mt-5 ml-5" @click="on">表示切替</v-btn>
      </template>
    </title-area>

    <add-task-field
      v-model="newTaskName"
      @all-clear="allClear"
      @add-todo="addTodo"
    />
    <v-card class="mx-auto mt-10" width="600" tile>
      <v-list dense flat>
        <v-subheader class="mb-3 d-flex justify-space-between">
          <div class="text-h6 blue--text ml-2">
            <p class="ma-0">{{ findDoneItemLength }} Items Left</p>
          </div>
          <div>
            <v-btn-toggle
              tile
              color="blue align-self-center"
              group
              v-model="toggleStatus"
              mandatory
            >
              <v-btn :value="Status.All">All</v-btn>
              <v-btn :value="Status.Active">Active</v-btn>
              <v-btn :value="Status.Completed">Completed</v-btn>
            </v-btn-toggle>
          </div>
        </v-subheader>
        <v-divider />
        <v-list-item-group
          v-for="(todo, index) in filteredTodos"
          :key="todo.id"
        >
          <v-list-item class="pt-3 pb-3">
            <v-list-item-action>
              <v-checkbox
                :input-value="todo.done"
                :disabled="todo.selected"
                @click="changeTodoDone(todo.id)"
              />
            </v-list-item-action>
            <v-list-item-content
              :class="[todo.done ? 'text-decoration-line-through' : '']"
            >
              <v-text-field
                id="taskName"
                autocomplete="off"
                hide-details="auto"
                maxlength="20"
                solo
                flat
                height="30px"
                :outlined="todo.selected && !todo.done"
                :disabled="!todo.selected || todo.done"
                :value="todo.taskName"
                class="red--text"
                @blur="changeTaskName(todo.id, $event)"
                @keydown.enter="changeTaskName(todo.id, $event)"
              />
            </v-list-item-content>
            <v-list-item-icon>
              <edit-btn @edit-task-name="changeTodoselected(index)" />
              <delete-btn @delete-item="deleteTodo(index)" />
            </v-list-item-icon>
          </v-list-item>
          <v-divider />
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card width="600px" height="50" class="mx-auto mt-5">
      <ReturnTopPage />
    </v-card>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@nuxtjs/composition-api";

import type { TodosType } from "~~/types/data";
import { Status } from "~/enums/Status";
import { useAccessor } from "~/hooks/useAccessor";
import ReturnTopPage from "~/components/ReturnTopPage.vue";

export default defineComponent({
  setup() {
    const accessor = useAccessor();
    //v-text-fieldに入力された値が反映される
    const newTaskName = ref("");
    const toggleStatus = ref(Status.All);
    let storeTodos = computed(() => {
      const state_storeTodos = accessor.todos.storeTodos;
      return JSON.parse(JSON.stringify(state_storeTodos));
    });
    //絞り込みのボタンが押されるたびに（toggleStatusの内容が変わるたびに）表示するタスクを変更
    const filteredTodos = computed(() => {
      switch (toggleStatus.value) {
        case Status.Active:
          return storeTodos.value.filter(
            (todo: TodosType) => todo.done === false
          );
        case Status.Completed:
          return storeTodos.value.filter(
            (todo: TodosType) => todo.done === true
          );
        case Status.All:
          return storeTodos.value;
      }
    });
    //完了していないタスクの個数を集計する
    const findDoneItemLength = computed(() => {
      const findDoneItem = storeTodos.value.filter(
        (todo: TodosType) => !todo.done
      );
      return findDoneItem.length;
    });
    const changeTodoDone = (id: string) => {
      accessor.todos.changeTodoDone(id);
    };
    const addTodo = (newTask: TodosType) => {
      if (newTask.taskName === "") return;
      accessor.todos.addTodo(newTask);
      newTaskName.value = "";
    };
    const deleteTodo = (index: number) => {
      accessor.todos.deleteTodo(index);
    };
    const changeTodoselected = (index: number) => {
      if (storeTodos.value[index].done) return;
      accessor.todos.changeTodoselected(index);
    };
    const changeTaskName = (id: string, e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        accessor.todos.changeTaskName({
          id: id,
          taskName: e.target.value,
        });
      }
    };
    const allClear = () => {
      accessor.todos.allClear();
    };
    return {
      toggleStatus,
      newTaskName,
      storeTodos,
      filteredTodos,
      findDoneItemLength,
      Status,
      changeTodoDone,
      addTodo,
      deleteTodo,
      changeTodoselected,
      changeTaskName,
      allClear,
    };
  },
  components: { ReturnTopPage },
});
</script>

<style scoped>
::v-deep .v-application--wrap {
  min-height: initial;
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border: none;
}

::v-deep .v-list {
  padding-bottom: 0 !important;
}

::v-deep .v-ripple__container {
  display: none !important;
}

::v-deep .v-input #taskName {
  font-size: 20px !important;
  color: blue !important;
}

.v-list-item__content {
  overflow: initial;
}
</style>
