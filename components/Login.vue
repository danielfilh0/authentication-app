<template>
  <div>
    <v-card
      class="mx-auto px-15 pt-12"
      max-width="474"
      outlined
      rounded="xl"
      style="background-color: transparent; border-width: 2px;"
    >
      <v-img :src="$vuetify.theme.dark ? '/devchallenges-light.svg' : '/devchallenges.svg'" alt="Dev challenges logo" width="130" class="mb-8 rounded-0"></v-img>
    <slot name="title"></slot>
      <v-form>
        <v-text-field placeholder="Email" prepend-inner-icon="mdi-email" outlined></v-text-field>
        <v-text-field placeholder="Password" prepend-inner-icon="mdi-lock" outlined></v-text-field>
        <v-btn color="primary" width="100%" height="36" class="mb-2 font-size-16 text-transform-none letter-spacing-none">Start coding now</v-btn>
      </v-form>
      <v-card-text tag="p" class="mb-4 text-center" color="secondary">or continue with these social profile</v-card-text>
      <div class="d-flex justify-center"> 
        <div>
          <v-btn 
            v-for="icon in icons"
            :key="icon"
            class="rounded-circle mx-3"
            min-width="42"
            width="42"
            height="42"
            color="gray"
            outlined>
            <v-icon color="gray">{{ icon }}</v-icon>
          </v-btn>
        </div>
      </div>
      <slot name="link"></slot>
    </v-card>
    <v-footer class="mx-auto justify-space-between" max-width="474" color="transparent">
      <p class="ma-0 font-size-14" :style="{color: grayColor}">
        created by
        <a href="https://github.com/danielfilh0" target="_blank" class="font-size-14 font-weight-semibold" style="color: inherit">danielfilh0</a>
      </p>
      <a href="https://devchallenges.io/" target="_blank" class="font-size-14 text-decoration-none" :style="{color: grayColor}">devChallenges.io</a>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  computed: {
    icons() {
      return ['mdi-google', 'mdi-facebook', 'mdi-twitter', 'mdi-github']
    },
    textColor() {
      if (this.$vuetify.theme.dark) return this.$vuetify.theme.themes.dark.text
      return this.$vuetify.theme.themes.light.text
    },
    grayColor() {
      return this.$vuetify.theme.themes.light.gray
    }
  }
}
</script>

<style>

</style>