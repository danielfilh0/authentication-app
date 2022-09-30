<template>
  <v-footer
    class="mx-auto justify-space-between"
    :max-width="maxWidth"
    color="transparent"
  >
    <p class="ma-0 font-size-14 gray--text">
      <span>created by</span>
      <a href="https://github.com/danielfilh0" target="_blank" class="font-size-14 font-weight-semibold" style="color: inherit">
        danielfilh0
      </a>
    </p>
    <a href="https://devchallenges.io/" target="_blank" class="font-size-14 text-decoration-none gray--text">
      devChallenges.io
    </a>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: {
    maxWidth: {
      type: String,
      default: '474'
    }
  },
}
</script>