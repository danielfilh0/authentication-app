<template><Login>

    <!-- title -->
    <template #title>
      <v-card-title tag="h1" class="pa-0 mb-3 font-weight-semibold line-height-25">
        Join thousands of learners from around the world
      </v-card-title>
      <v-card-text tag="p" class="pa-0 mb-6 font-size-16">
        Master web development by making real-life projects. There are multiple paths for you to choose
      </v-card-text>
    </template>

    <!-- link -->
    <template #link>
      <v-card-text tag="p" class="text-center" color="secondary">Already a member?
        <NuxtLink to="/login" class="text-decoration-none">Login</NuxtLink>
      </v-card-text>
    </template>

    <!-- form -->
    <template #form>
      <v-form>
        <v-text-field
          v-model="email"
          type="email"
          :rules="[rules.required, rules.email]"
          placeholder="Email"
          prepend-inner-icon="mdi-email"
          outlined
          :disabled="!isLocalHost()"
        />
        <v-text-field
          v-model="password"
          type="password"
          :rules="[rules.required, rules.counter]"
          placeholder="Password"
          prepend-inner-icon="mdi-lock"
          outlined
          :disabled="!isLocalHost()"
        />
        <v-btn 
          :loading="loading"
          width="100%"
          color="primary"
          height="36"
          class="mb-2 font-size-16 text-transform-none letter-spacing-none"
          :disabled="loading || !isLocalHost()"
          @click.prevent="handleClick">
          Start coding now
        </v-btn>
      </v-form>
    </template>
    
  </Login>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { createUserWithEmailAndPassword } from "firebase/auth"
import BaseView from '@/mixins/BaseView'
import Login from '@/components/Login.vue'
export default {
  name: 'SignUpPage',
  components: { Login },
  extends: BaseView,
  layout: 'login',
  data: () => ({
    email: '',
    password: '',
    rules: {
      counter: val => val.length > 6 || 'Min 7 characters.',
      required: val => !!val || 'Required.',
      email: val => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(val) || 'Invalid e-mail.'
      },
    }
  }),
  computed: {
    ...mapGetters('ui', ['loading']),
    data() {
      return {
        email: this.email,
        password: this.password,
        callback: createUserWithEmailAndPassword
      }
    }
  },
  methods: {
    ...mapActions('auth', ['signInOrCreateUser']),
    handleClick () {
      if (this.isLocalHost()) this.signInOrCreateUser(this.data)
    }
  }
}
</script>
