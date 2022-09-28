<template><div>

    <!-- card -->
    <v-card
      class="mx-auto px-15 pt-12"
      max-width="474"
      outlined
      rounded="xl"
      style="background-color: transparent; border-width: 2px;"
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
            @click="loginWithSocialMedia(media.handler)">
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
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider
} from "firebase/auth"
import Auth from '@/mixins/Auth'
import Footer from '@/components/Footer'

export default {
  name: 'LoginComponent',
  extends: Auth,
  components: { Footer },
  computed: {
    socialMedia() {
      return [
        { icon: 'mdi-google', handler: GoogleAuthProvider },
        { icon: 'mdi-facebook', handler: FacebookAuthProvider },
        { icon: 'mdi-twitter', handler: TwitterAuthProvider },
        { icon: 'mdi-github', handler: GithubAuthProvider }
      ]
    }
  }
}
</script>

<style>

</style>