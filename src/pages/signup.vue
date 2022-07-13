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
                  label="Password" type="password" v-if="!confirm">
                </v-text-field>
                <v-text-field v-model="confirmId" id="confirmId" prepend-icon="mdi-fingerprint" name="confirmId"
                  label="ID" type="number" v-else>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" v-if="!confirm" @click="signup(email, password)">Signup</v-btn>
              <v-btn color="primary" v-else @click="confirmAuth(email, confirmId)">Confirm</v-btn>
              <v-btn color="primary" to="/login">Login画面へ</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@nuxtjs/composition-api";
import { Auth } from "aws-amplify";

export default defineComponent({
  setup(_, context) {
    const email = ref('')
    const password = ref('')
    const confirmId = ref(null)
    const confirm = ref(false)


    onMounted(() =>{
      confirm.value = false
    })

    const signup = async (username, password) => {
      try {
        const { user } = await Auth.signUp({
          // 仕様上、usernameと記載しているが実際はemail
          username,
          password,
        })

        confirm.value = !confirm.value

        console.log(user)


      } catch (error) {
        console.log('error sign up', error)
      }
    }

    const confirmAuth = async (username, code) => {
      try {
        await Auth.confirmSignUp(username, code)
        context.root.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }


    return {
      email,
      password,
      signup,
      confirm,
      confirmAuth,
      confirmId
    }
  }
})
</script>
