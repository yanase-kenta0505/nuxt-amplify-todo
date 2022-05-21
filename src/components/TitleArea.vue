<template>
  <v-card v-bind="titleAreaWidth" tile>
    <div class="d-flex justify-center">
      <slot v-if="show" name="owner" :ownerName="ownerName" :message="message">
        <p class="text-h3 text-center">TODO LIST</p>
      </slot>

      <slot name="activator" :on="on"></slot>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const ownerName = {
      firstName: "YANASE",
      lastName: "KENTA",
    };

    const message: string = "CONFIRM YOUR TASK";

    const show = ref(true);

    const on = () => {
      show.value = !show.value;
    };

    const titleAreaWidth = {
      width: "600px",
      class: "mx-auto mt-10 blue white--text",
      elevation: "100",
    };

    return {
      ownerName,
      message,
      show,
      titleAreaWidth,
      on,
    };
  },
});
</script>
