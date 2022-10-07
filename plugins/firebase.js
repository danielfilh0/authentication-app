import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NUXT_ENV_VERCEL_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_ENV_VERCEL_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NUXT_ENV_VERCEL_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_VERCEL_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_VERCEL_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_VERCEL_FIREBASE_APP_ID
}

const firebase = initializeApp(firebaseConfig)

const auth = getAuth()

const db = getFirestore(firebase)

const storage = getStorage(firebase)

export default ({ app }, inject) => {
  inject('firebase', firebase)
  inject('auth', auth)
  inject('db', db)
  inject('storage', storage)
}
