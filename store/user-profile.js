import { updateEmail, updatePassword } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const actions = {
  async updateUser ({ commit, dispatch }, val) {
    const { email, password, photoURL } = val
    try {
      commit('ui/SET_LOADING', true, { root: true })
      await dispatch('updateEmailOrPass', { email, password })
      await dispatch('updatePhoto', photoURL)
      await dispatch('updateProfile', val)
      dispatch('ui/handleFeedback',
        { type: 'success', message: 'User updated.' },
        { root: true }
      )
    }
    catch (err) { dispatch('ui/handleError', err, { root: true })  }
    finally { commit('ui/SET_LOADING', false, { root: true }) }
  },

  async updateProfile ({ rootState, commit }, val) {
    const db = this.$db
    let obj = {}
    for(const prop in val) {
      obj[prop] = val[prop] ? val[prop] : rootState.user[prop]
    }
    delete obj.password
    obj = { ...obj, photoURL: rootState.user.photoURL }
    const docRef = doc(db, 'users', rootState.user.uid)
    await updateDoc(docRef, obj)
    commit('UPDATE_USER', obj, { root: true })
  },

  async updatePhoto ({ rootState, commit }, val) {
    if (val) {
      debugger
      const storageRef = ref(this.$storage, 'photos/' + rootState.user.uid)
      await uploadBytes(storageRef, val)
      const url = await getDownloadURL(storageRef)
      commit('UPDATE_VALUE', { key: 'photoURL', value: url }, { root: true })
    }
  },

  async updateEmailOrPass({ commit }, val) {
    const { email, password } = val
    if (email)  {
      await updateEmail(this.$auth.currentUser, email)
      commit('UPDATE_VALUE', { key: 'email', value: email }, { root: true })
    }
    if (password) await updatePassword(this.$auth.currentUser, password)
  },
}