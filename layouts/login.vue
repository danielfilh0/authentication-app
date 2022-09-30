<template>
  <v-app>
    <v-main class="background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginLayout',
  created () {
    this.handleAuth()
  },
  methods: {
    ...mapActions(['setUser']),
    ...mapActions('auth', ['handleAuth'])
  }
}
</script>
