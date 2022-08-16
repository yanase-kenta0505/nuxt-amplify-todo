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

    <add-task-field v-model="newTaskName" @all-clear="allClear" @add-todo="addTodo" />
    <v-card class="mx-auto mt-10" width="600" tile>
      <v-list dense flat>
        <v-subheader class="mb-3 d-flex justify-space-between">
          <div class="text-h6 blue--text ml-2">
            <p class="ma-0">{{ findDoneItemLength }} Items Left</p>
          </div>
          <div>
            <v-btn-toggle tile color="blue align-self-center" group v-model="toggleStatus" mandatory>
              <v-btn :value="Status.All">All</v-btn>
              <v-btn :value="Status.Active">Active</v-btn>
              <v-btn :value="Status.Completed">Completed</v-btn>
            </v-btn-toggle>
          </div>
        </v-subheader>
        <v-divider />
        <v-list-item-group v-for="(todo, index) in filteredTodos" :key="todo.id">
          <v-list-item class="pt-3 pb-3">
            <v-list-item-action>
              <v-checkbox :input-value="todo.done" :disabled="todo.selected" @click="changeTodoDone(todo)" />
            </v-list-item-action>
            <v-list-item-content :class="[todo.done ? 'text-decoration-line-through' : '']">
              <v-text-field id="taskName" autocomplete="off" hide-details="auto" maxlength="20" solo flat height="30px"
                :outlined="todo.selected && !todo.done" :disabled="!todo.selected || todo.done" :value="todo.taskName"
                class="red--text" @blur="changeTaskName(todo, $event)" @keydown.enter="changeTaskName(todo, $event)" />
            </v-list-item-content>
            <v-list-item-icon>
              <edit-btn @edit-task-name="changeTodoselected(todo, index)" />
              <delete-btn @delete-item="deleteTodo(index)" />
            </v-list-item-icon>
          </v-list-item>
          <v-divider />
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="mx-auto mt-10" width="600" tile>
      <v-btn width="100%" color="orange" @click="signout">SignOut</v-btn>
    </v-card>
  </v-app>
</template>

<script lang="ts">

import {
  defineComponent,
  ref,
  computed,
  useRouter,
  onMounted,
} from "@nuxtjs/composition-api"
import { Status } from "~/enums/Status"
import { useAccessor } from "~/composables/useAccessor"
import { CreateTodoInput, Todo, UpdateTodoInput } from "~/API"
import { Auth } from "aws-amplify"

export default defineComponent({
  middleware: 'auth',
  setup(_, { root }) {
    onMounted(async () => {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      accessor.amplifyTodos.initTodos(user.username)
    })

    const accessor = useAccessor()
    const router = useRouter()
    const newTaskName = ref("")
    const toggleStatus = ref(Status.All)
    const storeTodos = computed(() => accessor.amplifyTodos.amplifyTodos)

    //絞り込みのボタンが押されるたびに（toggleStatusの内容が変わるたびに）表示するタスクを変更
    const filteredTodos = computed(() => {
      switch (toggleStatus.value) {
        case Status.Active:
          return storeTodos.value.filter((todo: Todo) => todo.done === false)
        case Status.Completed:
          return storeTodos.value.filter((todo: Todo) => todo.done === true)
        case Status.All:
          return storeTodos.value
      }
    })
    //完了していないタスクの個数を集計する
    const findDoneItemLength = computed(() => {
      const findDoneItem = storeTodos.value.filter((todo: Todo) => !todo.done)
      return findDoneItem.length
    })
    //追加
    const addTodo = (newTask: CreateTodoInput) => {
      if (newTask.taskName === "") return
      accessor.amplifyTodos.addTodo(newTask)
      newTaskName.value = ""
    }

    //削除
    const deleteTodo = (index: number) => {
      accessor.amplifyTodos.deleteTodo({
        id: storeTodos.value[index].id
      })
    }

    const allClear = () => {
      accessor.todos.allClear()
    }

    //変更
    const changeTodoDone = (todo: UpdateTodoInput) => {
      const currentTodo = JSON.parse(JSON.stringify(todo))
      currentTodo.done = !currentTodo.done
      console.log(currentTodo)
      accessor.amplifyTodos.updateToDo(currentTodo)
    }
    const changeTodoselected = (todo: Todo, index: string) => {
      if (storeTodos.value[index].done) return
      const currentTodo = JSON.parse(JSON.stringify(todo))
      currentTodo.selected = !currentTodo.selected
      accessor.amplifyTodos.updateToDo(currentTodo)
    }
    const changeTaskName = (todo: Todo, e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        // const currentTodo = JSON.parse(JSON.stringify(todo))
        const currentTodo = { ...todo }
        currentTodo.taskName = e.target.value
        accessor.amplifyTodos.updateToDo(currentTodo)
      }
    }
    const signout = async () => {
      try {
        await Auth.signOut()
        accessor.amplifyTodos.cleanStateData()
        root.$router.push('/login')
      } catch (error) {
        console.log(error)
      }

    }

    return {
      toggleStatus,
      newTaskName,
      storeTodos,
      filteredTodos,
      findDoneItemLength,
      Status,
      router,
      changeTodoDone,
      addTodo,
      deleteTodo,
      changeTodoselected,
      changeTaskName,
      allClear,
      signout
    }
  },
})
</script>

<style scoped>
::v-deep .v-application--wrap {
  min-height: initial;
}

::v-deep .v-text-field>.v-input__control>.v-input__slot:before {
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
