<template>
  <v-app v-if="user">
    <Header />
    <v-main class="backgroundLogged">
      <v-container :class="isMobile && 'pa-0'">
        <Nuxt />
      </v-container>
      </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseView from '@/mixins/BaseView'
import Header from '@/components/Header'
export default {
  name: 'DefaultLayout',
  extends: BaseView,
  components: { Header },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions('auth', ['handleAuth'])
  },
  created () {
    this.handleAuth()
  },
}
</script>
