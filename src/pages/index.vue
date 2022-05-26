<template>
    <v-app>
      <v-card
        class="d-flex flex-column justify-center align-center"
        width="100%"
        height="100%"
      >
        <v-btn
          nuxt
          to="/todos"
          elevation="13"
          width="200"
          height="100"
          class="blue mb-10 white--text text-h5"
        >
          <!-- <v-btn>内に<h2>が入るのはHTML的によろしくない -->
          <!-- Text and Typographでtext-**を使う -->
          localStorage式タスク管理
        </v-btn>

        <v-btn
        >
          Amplify式タスク管理
        </v-btn>
      </v-card>
    </v-app>
</template>

<!-- <script lang="ts">
// <v-btn nuxt to="url">でページ遷移できるので、このコードブロックが不要になる

import { defineComponent } from "@nuxtjs/composition-api";
import { useRouter } from "@nuxtjs/composition-api";


export default defineComponent({
  setup() {
    const router = useRouter();

    return { router };
  },
});
</script> -->
