export const state = () => ({
  user: {}
})

export const getters = {
  getUser(state) {
    return state.user
  }
}

export const mutations = {
  SET_USER(state, val) {
    state.user = val
  }
}

export const actions = {
  setInfoUser({ commit }, val) {
    const { displayName, email, phoneNumber, photoURL, uid } = val
    commit('SET_USER', { displayName, email, phoneNumber, photoURL, uid })
  }
}
