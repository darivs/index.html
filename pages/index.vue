<template>
  <v-row
    v-resize="onResize"
    style="height: 100%; width: 100%"
    align="center"
    justify="center"
  >
    <v-col cols="12" align-self="end">
      <v-row justify="center">
        <v-hover v-slot:default="{ hover }">
          <v-img
            :class="`dr1s transition elevation-12 ma-${hover ? '10' : '0'}`"
            contain
            :style="`transform: rotate(${hover ? '30' : '0'}deg);'}`"
            :src="require('~/static/dr1s.jpg')"
          />
        </v-hover>
        <v-col cols="12" md="dr1s" lg="lul">
          <v-row justify="center" align="center">
            <span class="display-1 font-weight-light my-3">
              DARIUS TACK
              <span class="display-2 font-weight-bold">//</span>
              <span class="rainbow font-weight-bold">dr1s</span>
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
        logo: require("~/static/spotify.png"),
        color: "#1ed760"
      },
      {
        title: "Soundcloud",
        url: "https://soundcloud.com/bauchtasche/",
        logo: require("~/static/soundcloud.png"),
        color: "#ff8800"
      },
      {
        title: "GitHub",
        url: "https://github.com/darivs/",
        logo: require("~/static/github.png"),
        color: "#000000"
      },
      {
        title: "Twitter",
        url: "https://twitter.com/eureExzellenz/",
        logo: require("~/static/twitter.png"),
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
  cursor: pointer;
}
</style>
