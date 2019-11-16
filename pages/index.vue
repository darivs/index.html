<template>
  <v-row
    v-resize="onResize"
    style="height: 100%; width: 100%"
    align="center"
    justify="center"
  >
    <v-col cols="12" align-self="end">
      <v-row justify="center">
        <v-img
          class="dr1s elevation-12 mt-5"
          contain
          :src="require('~/assets/dr1s.jpg')"
        />
        <v-col cols="12" md="dr1s" lg="lul">
          <v-row justify="center" align="center">
            <span class="display-1 font-weight-light my-3">
              DARIUS TACK
              <span class="display-2 font-weight-bold">//</span>
              <span class="rainbow font-weight-bold">dr1s</span>
              <span class="display-2 font-weight-bold">//</span>
            </span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-fade-transition hide-on-leave>
      <v-col v-show="false" align-self="end">
        <social-button-block
          v-for="medium in media"
          :key="medium.title"
          :medium="medium"
        />
      </v-col>
    </v-fade-transition>
    <v-fade-transition hide-on-leave>
      <v-col align-self="start">
        <v-row justify="center">
          <social-button-round
            v-for="medium in media"
            :key="medium.title"
            class="mx-2"
            :medium="medium"
            :size="92"
          />
        </v-row>
      </v-col>
    </v-fade-transition>
  </v-row>
</template>

<script>
import SocialButtonBlock from "../components/socialButtonBlock"
import SocialButtonRound from "../components/socialButtonRound"

export default {
  components: { SocialButtonRound, SocialButtonBlock },
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
    ],
    isLandscape: undefined
  }),
  mounted() {
    this.onResize()
  },
  methods: {
    onResize() {
      this.isLandscape = window.innerWidth > window.innerHeight
    }
  }
}
</script>

<style>
.v-btn--block {
  border-radius: 0 !important;
}

.container,
.col,
.row {
  padding: 0;
  margin: 0;
}

.dr1s {
  max-width: 256px;
  border-radius: 100%;
}
</style>
