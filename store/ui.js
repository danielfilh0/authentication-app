import Vue from 'vue'

export const state = () => ({
  loading: false,
  errors: [
    { 'auth/email-already-in-use': 'Email already exists.' },
    { 'auth/invalid-email': 'Email not valid.' },
    { 'auth/user-not-found': 'User not found.' },
    { 'auth/operation-not-allowed': 'Operation not allowed.' },
    { 'auth/weak-password': 'Weak password.' },
    { 'auth/wrong-password': 'Wrong password.' },
    { 'auth/account-exists-with-different-credential': 'Email already exists.' },
    { 'auth/requires-recent-login': 'Requires recent login' }
  ]
})

export const getters = {
  loading (state) {
    return state.loading
  },
  errors (state) {
    return state.errors
  }
}

export const mutations = {
  SET_LOADING (state, val) {
    state.loading = val
  },
}

export const actions = {
  handleError ({ getters, dispatch }, val) {
    console.error(val)
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
    dispatch('handleFeedback', { type: 'error', message: error })
  },

  handleFeedback (_, val) {
    const { type, message } = val
    Vue.$toast[type](message, {
      position: 'top-right'
    });
  },
}