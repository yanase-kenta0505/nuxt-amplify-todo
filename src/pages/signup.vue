<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" prepend-icon="mdi-account-circle" name="email" label="email" type="text">
                </v-text-field>
                <v-text-field v-model="password" id="password" prepend-icon="mdi-lock-outline" name="password"
                  label="Password" type="password">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signup(email, password)">Signup</v-btn>
              <v-btn color="primary" to="/login">Login画面へ</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
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



    const signup = async (username, password) => {
      try {
        const { user } = await Auth.signUp({
          // 仕様上、usernameと記載しているが実際はemail
          username,
          password,
        })

        console.log(user)

        context.root.$router.push('/login')

      } catch (error) {
        console.log('error sign up', error)
      }
    }


    return {
      email,
      password,
      signup
    }
  }
})
</script>
