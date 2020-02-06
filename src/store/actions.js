/* eslint-disable semi */
import chatkit from '../chatkit';

// エラーメッセージ表示用のヘルパー関数
function handleError (commit, error) {
  const message = error.message || error.info.error_description
  commit('setError', message)
}

export default {
  async login ({ commit, state }, userId) {
    try {
      commit('setError', '')
      commit('setLoading', true)
      const currentUser = await chatkit.connectUser(userId)
      commit('setUser', {
        username: currentUser.disconnect,
        name: currentUser.name
      });
      commit('setReconnect', false);
      console.log(state.user);
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit('setLoading', false);
    }
  }
}
