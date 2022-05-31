<template>
 <amplify-authenticator>
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
        class="blue white--text text-subtitle1 mb-5"
      >
        localStorage式<br>タスク管理
      </v-btn>
      <v-btn
        nuxt
        to="/amplifytodo"
        elevation="13"
        width="200"
        height="100"
        class="blue white--text text-subtitle1"
      >
        Amplify式<br>タスク管理
      </v-btn>
    </v-card>
  </v-app>
  </amplify-authenticator>
</template>
