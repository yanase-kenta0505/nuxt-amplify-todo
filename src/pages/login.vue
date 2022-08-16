<template>
  <v-app>
    <v-container fluid fill-height >
      <v-row justify="center">
        <v-col cols="4" align-self="center" d-flex justify="center">
          <v-card class="elevation-12" width="100%" height="300">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" prepend-icon="mdi-account-circle" name="email" label="email" type="text">
                </v-text-field>
                <v-text-field v-model="password" id="password"
                  :prepend-icon="hiddenPassword ? 'mdi-lock' : 'mdi-lock-open'" name="password"
                  label="Password" :type="hiddenPassword ? 'password' : 'text'"
                  @click:prepend="hiddenPassword = !hiddenPassword">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login(email, password)">Login</v-btn>
              <v-btn color="primary" to="/signup">Signup画面へ</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">

import { defineComponent, ref } from "@nuxtjs/composition-api";
import { Auth } from "aws-amplify";

export default defineComponent({
  setup(_, context) {
    const email = ref('')
    const password = ref('')
    const hiddenPassword = true

    const login = async (username, password) => {
      console.log(username, password)
      try {
        const user = await Auth.signIn(username, password)
        if (user) {
          console.log(user)
          context.root.$router.push(`/user/${user.username}`)
        }
      } catch (error) {
        alert('emailかpasswordが一致しません')
      }
    }


    return {
      email,
      password,
      login,
      hiddenPassword
    }
  }
})
</script>

