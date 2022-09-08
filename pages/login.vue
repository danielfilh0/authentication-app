<template>
  <!-- eslint-disable-next-line -->
  <Login :email="email" :password="password">

    <!-- title -->
    <template #title>
      <v-card-title tag="h1" class="pa-0 mb-8 font-weight-semibold line-height-25">
        Login
      </v-card-title>
    </template>

    <!-- link -->
    <template #link>
      <v-card-text tag="p" class="text-center" color="secondary">
        Don't have an account yet?
        <NuxtLink to="/signup" class="text-decoration-none">Register</NuxtLink>
      </v-card-text>
    </template>

    <!-- form -->
    <template #form>
      <v-form>
        <v-text-field
          v-model="email"
          placeholder="Email"
          prepend-inner-icon="mdi-email"
          outlined
        />
        <v-text-field
          v-model="password"
          placeholder="Password"
          prepend-inner-icon="mdi-lock"
          outlined
        />
        <v-btn 
          :loading="loading"
          width="100%"
          color="primary"
          height="36"
          class="mb-2 font-size-16 text-transform-none letter-spacing-none" :disabled="loading"
          @click="signInOrCreateUser(signIn)">
          Login
        </v-btn>
      </v-form>
    </template>
    
  </Login>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth"
import Login from '@/components/Login.vue'
import Auth from '@/mixins/Auth'
export default {
  name: 'LoginPage',
  components: [Login],
  extends: Auth,
  layout: 'login',
  computed: {
    signIn() {
      return signInWithEmailAndPassword
    }
  }
}
</script>
