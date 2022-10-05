const BaseView = {
  computed: {
    isMobile () {
        return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  }
}

export default BaseView