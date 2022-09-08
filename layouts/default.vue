<template>
  <v-app v-if="user">
    <Header />
    <v-main class="backgroundLogged">
      <v-container>
        <Nuxt />
      </v-container>
      </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
export default {
  name: 'DefaultLayout',
  components: [Header],
  middleware({ store, redirect }) {
    if (!store.state.firebase.user) {
      redirect('/login')
    }
  },
  computed: {
    ...mapGetters('firebase', ['user'])
  }
}
</script>
