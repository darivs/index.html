<template>
  <v-row style="height: 100%; width: 100%" align="center" justify="center">
    <v-col align-self="end">
      <social-button
        v-for="medium in media"
        :key="medium.title"
        :medium="medium"
      />
    </v-col>
  </v-row>
</template>

<script>
import SocialButton from "../components/socialButton"

export default {
  components: { SocialButton },
  data: () => ({
    media: [
      {
        title: "Spotify",
        url: "",
        logo: require("~/assets/spotify_white.png"),
        color: "#1ed760"
      },
      {
        title: "Soundcloud",
        url: "https://soundcloud.com/bauchtasche/",
        logo: require("~/assets/soundcloud_white.png"),
        color: "#ff8800"
      },
      {
        title: "GitHub",
        url: "https://github.com/darivs/",
        logo: require("~/assets/github_white.png"),
        color: "#000000"
      },
      {
        title: "Twitter",
        url: "https://twitter.com/eureExzellenz/",
        logo: require("~/assets/twitter_white.png"),
        color: "#1da1f2"
      }
    ]
  })
}
</script>

<style>
.v-btn--block {
  border-radius: 0 !important;
}
</style>
