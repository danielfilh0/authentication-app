<template>
  <Login>
    <template #title>
      <v-card-title tag="h1" class="pa-0 mb-3 font-weight-semibold line-height-25" :style="{color: textColor}">
        Join thousands of learners from around the world
      </v-card-title>
      <v-card-text tag="p" class="pa-0 mb-6 font-size-16" :style="{color: textColor}">
        Master web development by making real-life projects. There are multiple paths for you to choose
      </v-card-text>
    </template>
    <template #link>
      <v-card-text tag="p" class="text-center" color="secondary">Already a member?
        <NuxtLink to="/login" class="text-decoration-none">Login</NuxtLink>
      </v-card-text>
    </template>
  </Login>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'SignUpPage',
  components: { Login },
  layout: 'login',
}
</script>
