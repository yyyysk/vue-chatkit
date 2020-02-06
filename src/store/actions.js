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
      // ユーザのチャットルームをストアに保存する
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }));
      commit('setRooms', rooms);

      // ユーザをルームに登録する
      const activeRoom = state.activeRoom || rooms[0];
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      });
      await chatkit.subscribeToRoom(activeRoom.id);

      // commit('setReconnect', false);
      // console.log(state.user);

      return true;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit('setLoading', false);
    }
  },

  async changeRoom ({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId)
      commit('setActiveRoom', { id, name })
    } catch (error) {
      handleError(commit, error)
    }
  }
}
