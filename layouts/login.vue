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
    if (this.$auth.currentUser) {
      this.setUser(this.$auth.currentUser)
    }
  },
  methods: {
    ...mapActions('firebase', ['setUser'])
  }
}
</script>
