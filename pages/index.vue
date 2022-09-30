<template>
  <div class="pb-10">
    <h1
      class="pa-0 mb-3 font-weight-regular black--text line-height-29 text-center"
      :class="isMobile ? 'font-size-28' : 'font-size-36'"
    >
      Personal info
    </h1>

    <h2
      class="pa-0 mb-10 font-size-18 font-weight-light black--text line-height-29 text-center"
      :class="isMobile ? 'font-size-14' : 'font-size-18'"
    >
      Basic info, like your name and photo
    </h2>

    <!-- user info -->
    <v-card
      max-width="845"
      class="mx-auto mb-2"
      :class="isMobile ? 'border-none pt-4' : ''"
      outlined
      rounded="xl"
      style="background-color: transparent; border-width: 1px;"
    >
      <div
        class="d-flex justify-space-between py-6"
        :class="isMobile ? 'px-4' : 'px-12'"
      >
        <div>
          <v-card-title tag="h3" class="pa-0 font-size-24 font-weight-normal">Profile</v-card-title>
          <v-card-text class="pa-0 gray--text font-weight-medium">
            Some info may be visible to other people
          </v-card-text>
        </div>
        <v-btn
          class="mt-3 px-8 text-capitalize rounded-lg gray--text letter-spacing-none"
          @click="$router.push('/edit-user')"
          outlined>
            Edit
        </v-btn>
      </div>
      <v-divider v-if="!isMobile"></v-divider>
      <ul class="list-style-none pa-0">
        <li v-for="(item, index) in data" :key="index">
          <div
            class="d-flex align-center py-5"
            :class="isMobile ? 'px-4' : 'px-12'"
          >
            <p class="text-uppercase ma-0 width-250 font-size-13 font-weight-medium gray--text">
              {{ item.title }}
            </p>
            <v-img
              v-if="item.type === 'img'"
              :src="photo"
              alt="Dev challenges logo"
              max-width="72"
              height="72"
              class="rounded-lg mr-2" />
            <p v-if="item.type === 'text'" class="ma-0 secondary--text font-size-18 font-weight-medium">
              {{ item.info }}
            </p>
          </div>
          <v-divider v-if="isMobile"></v-divider>
          <v-divider v-if="index < data.length - 1 && !isMobile"></v-divider>
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
import BaseView from '@/mixins/BaseView'
import Footer from '@/components/Footer'
export default {
  name: 'IndexPage',
  extends: BaseView,
  components: { Footer },
  computed: {
    ...mapGetters(['user']),
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
