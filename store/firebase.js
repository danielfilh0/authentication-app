import Vue from 'vue'
import { updateEmail, updatePassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const state = () => ({
  user: null,
  loading: false,
  errors: [
    { 'auth/email-already-in-use': 'Email already exists.' },
    { 'auth/invalid-email': 'Email not valid.' },
    { 'auth/operation-not-allowed': 'Operation not allowed.' },
    { 'auth/weak-password': 'Weak password.' },
    { 'auth/wrong-password': 'Wrong password.' },
    { 'auth/account-exists-with-different-credential': 'Email already exists.' }
  ]
})

export const getters = {
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  errors (state) {
    return state.errors
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
    const { displayName, email, photoURL, uid } = val
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

  async updateUser ({ getters, commit, dispatch }, val) {
    const { bio, displayName, email, password, phone, photo } = val
    try {
      commit('SET_LOADING', true)
      if (email !== getters.user.email) {
        await updateEmail(this.$auth.currentUser, email)
      }
      if (password) {
        await updatePassword(this.$auth.currentUser, password)
      }
      const photoURL = await dispatch('getPhotoURL', photo)
      const docRef = doc(this.$db, 'users', getters.user.uid)
      await updateDoc(docRef, {
        bio, displayName, email, phone, photoURL
      })
      commit('SET_USER', {
        bio,
        displayName,
        email,
        phone, 
        photoURL,
        uid: getters.user.uid
      })
      dispatch('handleFeedback', { type: 'success', message: 'User updated.' })
    } catch (err) { dispatch('handleFirebaseError', err) }
    finally { commit('SET_LOADING', false) }
  },

  async getPhotoURL ({ getters }, val) {
    if (val) {
      const storageRef = ref(this.$storage, 'photos/' + getters.user.uid)
      await uploadBytes(storageRef, val)
      const url = await getDownloadURL(storageRef)
      return url
    }
    return state.user.photoURL
  },

  async logout ({ commit, dispatch }) {
    try {
      await signOut(this.$auth)
      commit('SET_USER', null)
      this.$router.push('/login')
    } catch (err) { dispatch('handleFirebaseError', err) }
  },

  handleFirebaseError ({ getters, dispatch }, val) {
    const { message } = val
    const result = getters.errors.find((error) => {
      for(const prop in error) {
        if (message.includes(prop)) {
          return error[prop]
        }
      }
      return false
    })
    const error = result ? Object.values(result)[0] : 'Unknown error.'
    dispatch('handleFeedback', { type: error, message: error })
  },

  handleFeedback (_, val) {
    const { type, message } = val
    Vue.$toast[type](message, {
      position: 'top-right'
    });
  },

  handleAuth ({ commit, dispatch }) {
    onAuthStateChanged(this.$auth, (user) => {
      if (user) {
        dispatch('setUser', user)
      } else {
        commit('SET_USER', null)
        this.$router.push('/login')
      }
    })
  }
}
