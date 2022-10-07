const BaseView = {
  computed: {
    isMobile () {
        return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    },

    isLocalHost () {
      return window.location.href.includes('localhost')
    }
  }
}

export default BaseView