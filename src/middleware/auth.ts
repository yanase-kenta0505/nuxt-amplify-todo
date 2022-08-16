import { Auth } from "aws-amplify";

console.log('hello')

export default async ({ redirect }) => {
  try {
    const users = await Auth.currentAuthenticatedUser()
  } catch (error) {
    redirect('/login')
  }
  // console.log(users)
  // const session = await Auth.userSession(users)
  // console.log(session)
  // if (!session?.isValid()) {
  //   console.error('セッションが無効です!')
  // } else {
  //   console.log(users)
  // }
}

// import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

// export default defineNuxtMiddleware(context => {
//   console.log(context)
// })
