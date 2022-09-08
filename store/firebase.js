import { signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const state = () => ({
  user: null,
  loading: false
})

export const getters = {
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  }
}

export const mutations = {
  SET_USER (state, val) {
    state.user = val
  },
  SET_LOADING (state, val) {
    state.loading = val
  }
}

export const actions = {
  async setUser ({ commit }, val) {
    commit('SET_LOADING', true)
    const { displayName, email, photoURL, uid } = val
    let user = {}
    const docRef = doc(this.$db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      user = docSnap.data()
    } 
    else {
      user = {
        displayName,
        email,
        photoURL,
        uid,
        bio: null,
        phone: null
      }
      await setDoc(docRef, user)
    }
    commit('SET_USER', user)
    commit('SET_LOADING', false)
    this.$router.push('/')
  },
  logout ({ commit }) {
    signOut(this.$auth)
      .then(() =>  {
        commit('SET_USER', null)
        this.$router.push('/login')
      })
      .catch(err => this.handleFirebaseError(err))
  }
}
