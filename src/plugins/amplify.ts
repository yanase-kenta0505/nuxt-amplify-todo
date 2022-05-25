import { Amplify } from 'aws-amplify'
import type { Plugin } from '@nuxt/types'

//default exportなので名前は自由
import awsconfig from '~/aws-exports'

// Amplifyの設定を行う
const AmplifyPlugin: Plugin = () => {
  Amplify.configure(awsconfig)
}

export default AmplifyPlugin
