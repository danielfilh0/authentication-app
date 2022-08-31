<template>
  <Login>
    <template #title>
      <v-card-title tag="h1" class="pa-0 mb-3 font-weight-semibold line-height-25">
        Join thousands of learners from around the world
      </v-card-title>
      <v-card-text tag="p" class="pa-0 mb-6 font-size-16">
        Master web development by making real-life projects. There are multiple paths for you to choose
      </v-card-text>
    </template>
    <template #link>
      <v-card-text tag="p" class="text-center" color="secondary">Already a member?
        <NuxtLink to="/login" class="text-decoration-none">Login</NuxtLink>
      </v-card-text>
    </template>
    <template #button>
      <v-btn 
        :loading="loading"
        width="100%"
        color="primary"
        height="36"
        class="mb-2 font-size-16 text-transform-none letter-spacing-none" :disabled="loading"
        @click="signInOrCreateUser(create)">
        Start coding now
      </v-btn>
    </template>
  </Login>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth"
import Login from '@/components/Login.vue'
import Auth from '@/mixins/Auth'
export default {
  name: 'SignUpPage',
  components: { Login },
  extends: Auth,
  layout: 'login',
  computed: {
    create() {
      return createUserWithEmailAndPassword
    }
  },
}
</script>
