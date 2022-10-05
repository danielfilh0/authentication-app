<template>
  <v-img
    :src="photo"
    lazy-src="https://picsum.photos/10/6?image=4"
    :alt="user.displayName + `'s photo`"
    :max-width="width"
    :width="width"
    :height="height"
    class="rounded-lg"
    aspect-ratio="1"
  >
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
          width="3"
          size="16"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserPhotoComponent',
  props: {
    width: { default: '72', type: String },
    height: { default: '72', type: String },
    upload: { default: null, type: String }
  },
  computed: {
    ...mapGetters(['user']),
    photo () {
      if (this.upload) return this.upload
      else return this.user.photoURL ? this.user.photoURL : '/user.png'
    },
  }
}
</script>