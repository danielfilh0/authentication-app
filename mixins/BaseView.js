const BaseView = {
  computed: {
    isMobile () {
        return this.$vuetify.breakpoint.smAndDown
    }
  }
}

export default BaseView