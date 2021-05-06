<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Profile Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `5` " class="mt-10" >
      <v-row justify="center">
        <ProfilePicture/>
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-btn class="mr-5" icon :style="{color: currentTheme.onBackground}">
          <v-icon >
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon :style="{color: currentTheme.onBackground}">
          <v-icon >
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <v-col :cols="isMobile ? `12` : `6` ">
      <p class="ml-3 text-h4 font-weight-bold" v-if="!isMobile">Informasi Personal</p>
      <FormProfile/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import ProfilePicture from "@/views/template/component/profile/ProfilePicture"
import FormProfile from "@/views/template/component/profile/FormProfile"

export default {
  name: "ProfileMahasiswa",
  components: { ProfilePicture, Breadcumbs, FormProfile },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Absensi",
          disabled: false,
          href: ""
        },
        {
          text: "Link 1",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>
