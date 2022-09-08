<template>
  <div class="pb-10">
    <h1 class="pa-0 mb-3 font-weight-regular black--text line-height-29 text-center">
      Personal info
    </h1>

    <h3 class="pa-0 mb-10 font-weight-light black--text line-height-29 text-center">
      Basic info, like your name and photo
    </h3>

    <!-- user info -->
    <v-card
      max-width="845"
      class="mx-auto mb-2"
      outlined
      rounded="xl"
      style="background-color: transparent; border-width: 1px;"
    >
      <div class="d-flex justify-space-between px-12 py-6">
        <div>
          <v-card-title class="pa-0">Profile</v-card-title>
          <v-card-text class="pa-0">
            Some info may be visible to other people
          </v-card-text>
        </div>
        <v-btn class="mt-3 px-8 text-capitalize rounded-lg gray--text letter-spacing-none" outlined>
          Edit
        </v-btn>
      </div>
      <v-divider></v-divider>
      <ul class="list-style-none pa-0">
        <li v-for="(item, index) in data" :key="index">
          <div class="d-flex align-center px-12 py-5">
            <p class="text-uppercase ma-0 width-250 font-size-13 font-weight-medium gray--text">
              {{ item.title }}
            </p>
            <v-img
              v-if="item.type === 'img'"
              :src="photo"
              alt="Dev challenges logo"
              max-width="72"
              class="rounded-lg mr-2" />
            <p v-if="item.type === 'text'" class="ma-0 secondary--text font-size-18 font-weight-medium">
              {{ item.info }}
            </p>
          </div>
          <v-divider v-if="index < data.length - 1"></v-divider>
        </li>
      </ul>
    </v-card>
    <!-- /user-info -->

    <!-- footer -->
    <Footer maxWidth="845" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '@/components/Footer'
export default {
  name: 'IndexPage',
  components: [Footer],
  computed: {
    ...mapGetters('firebase', ['user']),
    photo () {
      if (!this.user.photoURL) return '/user.png'
      return this.user.photoURL
    },
    data () {
      return [
        { type: 'img', title: 'Photo', info: this.photo },
        { type: 'text', title: 'Name', info: this.user.displayName },
        { type: 'text', title: 'Bio', info: this.user.bio },
        { type: 'text', title: 'Phone', info: this.user.phone },
        { type: 'text', title: 'Email', info: this.user.email },
        { type: 'text', title: 'Password', info: '***********' }
      ]
    }
  }
}
</script>
