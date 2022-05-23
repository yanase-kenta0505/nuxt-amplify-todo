<template>
  <v-btn width="100%" height="100%" class="blue">
    <p class="white--text ma-0 pa-0 font-weight-bold" @click="router.push('/')">
      Top Page
    </p>
  </v-btn>
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
