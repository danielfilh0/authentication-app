import { mapMutations, mapActions } from 'vuex'
import { signInWithPopup, signOut } from "firebase/auth"
import BaseView from '@/mixins/BaseView'

const Auth = {
  extends: BaseView,
  data: () => ({
    email: '',
    password: '',
    loading: false,
    error: false,
    errors: [
      { 'auth/email-already-in-use': 'Email already exists.' },
      { 'auth/invalid-email': 'Email not valid.' },
      { 'auth/operation-not-allowed': 'Operation not allowed.' },
      { 'auth/weak-password': 'Weak password.' },
      { 'auth/wrong-password': 'Wrong password.' },
      { 'auth/account-exists-with-different-credential': 'Email already exists.' }
    ]
  }),
  methods: {
    ...mapMutations('firebase', ['SET_USER']),
    ...mapActions('firebase', ['setUser']),

    signInOrCreateUser(Function) {
      this.loading = true
      Function(this.$auth, this.email, this.password)
        .then((success) => {
          this.setUser(success.user)
        })
        .catch(err => this.handleFirebaseError(err))
        .then(() => { this.loading = false })
    },

    loginWithSocialMedia(Function) {
      const provider = new Function()
      signInWithPopup(this.$auth, provider)
        .then((success) => {
          this.setUser(success.user)
        })
        .catch(err => this.handleFirebaseError(err))
        .then(() => { this.loading = false })
    },

    logout() {
      signOut(this.$auth)
        .then(() => this.$router.push('/login'))
        .catch(err => this.handleFirebaseError(err))
    },

    handleFirebaseError(val) {
      const { message } = val
      const result = this.errors.find((error) => {
        for(const prop in error) {
          if (message.includes(prop)) {
            return error[prop]
          }
        }
        return false
      })
      this.error = result ? Object.values(result)[0] : 'Unknown error.'
      this.$toast.error(this.error, {
        position: 'top-right'
      });
    },

    getAuth() {
      if (this.$auth.currentUser) {
        this.setUser(this.$auth.currentUser)
      } else {
        this.SET_USER(null)
      }
    },
  },
  created() {
    this.getAuth()
  }
}

export default Auth