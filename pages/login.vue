<template>
  <Login>
    <template #title>
      <v-card-title tag="h1" class="pa-0 mb-8 font-weight-semibold line-height-25" :style="{color: textColor}">
        Login
      </v-card-title>
    </template>
    <template #link>
      <v-card-text tag="p" class="text-center" color="secondary">Don't have an account yet?
        <NuxtLink to="/signup" class="text-decoration-none">Register</NuxtLink>
      </v-card-text>
    </template>
  </Login>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'LoginPage',
  components: { Login },
  layout: 'login',
}
</script>
