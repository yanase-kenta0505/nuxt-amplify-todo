<template>
  <v-card width="600px" class="mx-auto mt-10 d-flex" tile>
    <all-clear-btn @all-clear="allClear" class="align-self-center ml-2" />
    <v-text-field
      :value="value"
      @input="$emit('input', $event)"
      @keydown.enter="addTodo"
      autofocus
      autocomplete="off"
      clearable
      color="primary"
      hide-details="auto"
      maxlength="20"
      placeholder="What needs to be done?"
      solo
      flat
      height="70px"
    ></v-text-field>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const addTodo = () => {
      emit("add-todo", {
        id: new Date().getTime().toString(16),
        taskName: props.value,
        selected: false,
        done: false,
      });
    };

    const allClear = () => {
      emit("all-clear");
    };

    return {
      addTodo,
      allClear,
    };
  },
});
</script>

<style>
.v-input__slot {
  width: 95% !important;
}
</style>
