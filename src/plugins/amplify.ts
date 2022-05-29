import {Amplify} from 'aws-amplify'
import type { Plugin } from '@nuxt/types'
import {applyPolyfills,defineCustomElements} from '@aws-amplify/ui-components/loader'

//default exportなので名前は自由
import awsconfig from '~/aws-exports'

// Amplifyの設定を行う
const AmplifyPlugin: Plugin = (Context,inject) => {
  Amplify.configure(awsconfig)
}

applyPolyfills().then(() => {
  defineCustomElements(window);
});

export default AmplifyPlugin
