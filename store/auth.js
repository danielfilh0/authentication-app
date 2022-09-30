import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

export const actions = {
  async signInOrCreateUser ({ commit, dispatch }, val) {
    commit('ui/SET_LOADING', true, { root: true })
    const { email, password, callback } = val
    try {
      const user = await callback(this.$auth, email, password)
      await dispatch('setUser', user, { root: true })
    }
    catch (err) { dispatch('ui/handleError', err, { root: true }) } 
    finally { commit('ui/SET_LOADING', false, { root: true }) }
  },

  async loginWithSocialMedia({ commit, dispatch }, val) {
    const Callback = val
    const provider = new Callback()
    try {
      const user = await signInWithPopup(this.$auth, provider)
      dispatch('setUser', user, { root: true })
    }
    catch (err) { dispatch('ui/handleError', err, { root: true }) }
    finally { commit('ui/SET_LOADING', false, { root: true }) }
  },

  async logout ({ commit, dispatch }) {
    try {
      await signOut(this.$auth)
      commit('SET_USER', null, { root: true })
      this.$router.push('/login')
    } catch (err) { dispatch('ui/handleError', err, { root: true }) }
  },

  handleAuth ({ commit, dispatch }) {
    onAuthStateChanged(this.$auth, (user) => {
      if (user) {
        dispatch('setUser', user, { root: true })
      } else {
        commit('SET_USER', null, { root: true })
        this.$router.push('/login')
      }
    })
  }
}