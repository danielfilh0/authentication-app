import { doc, getDoc, setDoc } from 'firebase/firestore'

export const state = () => ({
  user: null,
})

export const getters = {
  user (state) {
    return state.user
  }
}

export const mutations = {
  SET_USER (state, val) {
    state.user = val
  },
  UPDATE_USER (state, val) {
    state.user = { ...val, uid: state.user.uid }
  },
  UPDATE_VALUE (state, val) {
    state.user[val.key] = val.value
  }
}

export const actions = {
  async setUser ({ commit }, val) {
    const { email, photoURL, displayName, uid } = val
    let user = {}
    const docRef = doc(this.$db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      user = docSnap.data()
    } 
    else {
      user = { displayName, email, photoURL, uid, bio: null, phone: null }
      await setDoc(docRef, user)
    }
    commit('SET_USER', user)
    this.$router.push('/')
  },
}
