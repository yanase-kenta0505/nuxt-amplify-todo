<template>
    <v-app>
      <v-card
        class="d-flex flex-column justify-center align-center"
        width="100%"
        height="100%"
      >
        <v-btn
          @click="router.push('/todos')"
          elevation="13"
          width="200"
          height="100"
          class="blue mb-10"
        >
          <h2 class="white--text">タスク管理画面へ</h2>
        </v-btn>
        </v-card>
      </v-card>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { useRouter } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const router = useRouter();

    return { router };
  },
});
</script>
