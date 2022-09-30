<template><div>

    <!-- card -->
    <v-card
      class="mx-auto"
      :class="!isMobile ? 'card-login px-15 pt-12' : 'border-none px-4 pt-4'"
      max-width="474"
      outlined
      rounded="xl"
      style="background-color: transparent;"
    >

      <!-- logo -->
      <v-img :src="$vuetify.theme.dark ? '/devchallenges-light.svg' : '/devchallenges.svg'" alt="Dev challenges logo" width="130" class="mb-8 rounded-0"></v-img>

      <slot name="title"></slot>

      <!-- form -->
      <slot name="form"></slot>

      <v-card-text tag="p" class="mb-4 text-center" color="secondary">or continue with these social profile</v-card-text>

      <!-- social-media -->
      <div class="d-flex justify-center"> 
        <div>
          <v-btn 
            v-for="media in socialMedia"
            :key="media.icon"
            class="rounded-circle mx-3"
            min-width="42"
            width="42"
            height="42"
            color="gray"
            outlined
            @click="loginWithSocialMedia(media.callback)">
            <v-icon color="gray">{{ media.icon }}</v-icon>
          </v-btn>
        </div>
      </div>

      <slot name="link"></slot>
    </v-card>

    <!-- footer -->
    <Footer />
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider
} from "firebase/auth"
import BaseView from '@/mixins/BaseView'
import Footer from '@/components/Footer'

export default {
  name: 'LoginComponent',
  components: { Footer },
  extends: BaseView,
  computed: {
    ...mapGetters('ui', ['loading']),
    socialMedia() {
      return [
        { icon: 'mdi-google', callback: GoogleAuthProvider },
        { icon: 'mdi-facebook', callback: FacebookAuthProvider },
        { icon: 'mdi-twitter', callback: TwitterAuthProvider },
        { icon: 'mdi-github', callback: GithubAuthProvider }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['loginWithSocialMedia'])
  }
}
</script>

<style lang="scss">
.card-login {border-width: 2px !important;}
</style>