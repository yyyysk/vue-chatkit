import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

const INSTANCE_LOCATOR = 'v1:us1:6c46ce1c-8a18-4488-9b1c-3c90791af3c6'
const TOKEN_URL = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c46ce1c-8a18-4488-9b1c-3c90791af3c6/token'
// const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10

let currentUser = null
// let activeRoom = null;

async function connectUser (userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  })
  currentUser = await chatManager.connect()
  return currentUser
}

export default {
  connectUser
}
