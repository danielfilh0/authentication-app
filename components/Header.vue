<template>
  <div class="backgroundLogged">
    <header class="container pt-5">
    <nav class="d-flex justify-space-between">

      <!-- logo -->
      <NuxtLink to="/">
        <v-img
          :src="
            $vuetify.theme.dark
              ? '/devchallenges-light.svg'
              : '/devchallenges.svg'
          "
          alt="Dev challenges logo"
          width="130"
          class="mb-8 rounded-0"
        ></v-img>
      </NuxtLink>

      <!-- menu-dropdown -->
      <v-menu content-class="box-shadow-none border" min-width="188" offset-y nudge-left="50" rounded="lg">
        <template #activator="{ on, attrs }">
          <div
            class="d-inline-block"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <div class="d-flex align-center">
              <v-img
                :src="user.photoURL"
                alt="Dev challenges logo"
                width="32"
                class="rounded-lg mr-2"
              ></v-img>
              <strong class="font-size-12 mr-3">{{ user.displayName }}</strong>
              <v-icon
                class="text--text"
                :class="attrs['aria-expanded'] === 'true' && 'rotate-180-deg'"
              >
                mdi-menu-down
              </v-icon>
            </div>
          </div>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>
              <v-divider v-if="item.text === 'Logout'" class="mb-3"></v-divider>
              <button class="menu-button pa-1 rounded-lg" @click="handleClick(item.handler)" >
                <v-icon class="gray300--text" :class="item.text === 'Logout' && 'red--text'">{{ item.icon }}</v-icon>
                <span class="font-size-12 gray300--text" :class="item.text === 'Logout' && 'red--text'">{{ item.text }}</span>
              </button>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </nav>
    </header>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HeaderComponent',
  computed: {
    ...mapGetters('firebase', ['getUser']),
    user () {
      return this.getUser
    },
    items () {
      return [
        { 
          icon: 'mdi-account-circle',
          text: 'My Profile',
          handler: { f: 'goTo', params: '/' } 
        }, { 
          icon: 'mdi-account-multiple',
          text: 'Group Chat',
          handler: { f: 'goTo', params: '/' } 
        }, { 
          icon: 'mdi-logout', 
          text: 'Logout',
          handler: { f: 'logout', params: '' } 
        }
      ]
    }
  },
  methods: {
    ...mapActions('firebase', ['logout']),
    handleClick (obj) {
      const { f, params } = obj
      this[f](params)
    },
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.border {border: 1px solid #E0E0E0;}
.menu-button {
  width: 100%; text-align: left;
  &:hover {background-color: #F2F2F2;}
}
</style>