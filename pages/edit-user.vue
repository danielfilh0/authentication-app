<template>
  <div class="pb-10">
    <div class="link-container mx-auto mb-6">
      <NuxtLink to="/" class="text-decoration-none d-inline-block">
        <v-icon class="primary--text mr-2">mdi-chevron-left</v-icon>
        <span>Back</span>
      </NuxtLink>
    </div>
    <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      class="loading position-fixed"
      indeterminate
    />

    <!-- user info -->
    <v-card
      max-width="845"
      class="user-info mx-auto mb-2"
      :class="isMobile ? 'border-none pa-4': 'px-12 py-6'"
      outlined
      rounded="xl"
    >
      <div class="d-flex justify-space-between mb-10">
        <div>
          <v-card-title class="pa-0">Change Info</v-card-title>
          <v-card-text class="pa-0">
            Changes will be reflected to every services
          </v-card-text>
        </div>
      </div>
      <v-form class="px-3">
        <v-row 
          v-for="(item, index) in formData"
          :key="index"
          class="d-flex flex-column"
          >
          <v-col
            v-if="item.type === 'file'"
            md="4"
            class="ma-0 pa-0 mb-4 d-flex align-center">
            <div class="width-72 height-72 mr-4 rounded-lg primary position-relative">
              <v-img
                :src="photo"
                alt="Dev challenges logo"
                width="72"
                height="72"
                class="rounded-lg" />
              <v-file-input
                v-model="photoFile"
                id="change-photo"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-camera"
                class="position-absolute ma-0 pa-0"
                dark
                hide-input
                hide-details
                style="top: 20px; left: 25px;"
              ></v-file-input>
            </div>
            <label for="change-photo" class="cursor-pointer flex-1 text-uppercase ma-0 font-size-13 font-weight-medium gray--text d-inline-block">
              {{item.label}}
            </label>
          </v-col>
          <v-col md="8" class="ma-0 pa-0">
            <label v-if="item.type !== 'file'" :for="item.label" class="grey300--text font-size-13">{{ item.label }}</label>
            <v-textarea 
              v-if="item.type === 'area'"
              class="rounded-lg"
              v-model="item.field"
              :placeholder="item.placeholder"
              outlined />
            <v-text-field 
              v-if="item.type !== 'area' && item.type !== 'file'"
              class="pa-0 ma-0 rounded-lg"
              height="40"
              :type="item.type"
              :id="item.label"
              :placeholder="item.placeholder"
              outlined
              v-model="item.field"
              style="width: 100%;"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0 d-flex align-center">
            <v-btn 
              color="primary"
              height="36"
              class="mb-2 font-size-16 text-transform-none letter-spacing-none"
              :disabled="!formIsFilled"
              @click="handleSubmit"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <!-- /user-info -->

    <!-- footer -->
    <Footer maxWidth="845" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseView from '@/mixins/BaseView'
import Footer from '@/components/Footer'
export default {
  name: 'edit-user-page',
  extends: BaseView,
  components: { Footer },
  data: () => ({
    uploadedPhoto: null,
    photoFile: null,
    formData: [
      {
        label: 'Change Photo',
        field: null,
        type: 'file',
        slug: 'photoURL'
      }, {
        label: 'Name',
        field: null,
        type: 'text',
        slug: 'displayName',
        placeholder: 'Enter your name...'
      }, {
        label: 'Bio',
        field: null,
        type: 'area',
        slug: 'bio',
        placeholder:'Enter your bio...'
      }, {
        label: 'Phone',
        field: null,
        type: 'number',
        slug: 'phone',
        placeholder: 'Enter your phone...'
      }, {
        label: 'Email',
        field: null,
        type: 'email',
        slug: 'email',
        placeholder: 'Enter your email...'
      }, {
        label: 'Password',
        field: null,
        type: 'password',
        slug: 'password',
        placeholder: 'Enter your password...'
      }
    ]
  }),
  computed: {
    ...mapGetters(['user']),
    ...mapGetters('ui', ['loading']),
    photo () {
      if (this.uploadedPhoto) return this.uploadedPhoto
      else return this.user.photoURL ? this.user.photoURL : '/user.png'
    },
    fields () {
      const obj = {}
      this.formData.forEach((item) => {
        if (item.slug) {
          obj[item.slug] = item.field ? item.field : null
        }
      })
      return obj
    },
    formIsFilled () {
      let isFilled = false
      this.formData.forEach((item) => {
        if (item.field) isFilled = true
      })
      return isFilled
    }
  },
  methods: {
    ...mapActions('user-profile', ['updateUser']),
    handleSubmit () {
      window.scroll({ top: 0, behavior: 'smooth' })
      this.updateUser(this.fields)
    }
  },
  watch: {
    photoFile (val) {
      this.formData[0].field = val
      const path = (window.URL || window.webkitURL).createObjectURL(val)
      this.uploadedPhoto = path
    }
  }
}
</script>

<style lang="scss">
.link-container {
  max-width: 845px;
  span {position: relative; top: 2px;}
}
.loading {top: 40%; left: 50%; z-index: 1;}
.user-info {background-color: transparent !important; border-width: 1px !important;}
</style>