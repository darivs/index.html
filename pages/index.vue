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
            :class="`dr1s transition elevation-12`"
            :style="
              `max-width: ${isLandscape ? '15%' : '50%'};
              transform: rotate(${hover ? '90' : '0'}deg);`
            "
            :src="require('~/static/dr1s.jpg')"
          />
        </v-hover>
        <v-col cols="12">
          <v-row justify="center" align="center">
            <span class="headline font-weight-light mt-5">
              DARIUS TACK
            </span>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row justify="center" align="center">
            <span class="display-1 rainbow font-weight-bold mb-5">dr1s</span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-fade-transition hide-on-leave>
      <v-col v-show="!isLandscape" align-self="end">
        <social-button-block
          v-for="medium in media"
          :key="medium.title"
          :medium="medium"
          class="mb-5"
        />
      </v-col>
    </v-fade-transition>
    <v-fade-transition hide-on-leave>
      <v-col v-show="isLandscape" align-self="start">
        <v-row justify="center">
          <social-button-round
            v-for="medium in media"
            :key="medium.title"
            :medium="medium"
            :size="80"
          />
        </v-row>
      </v-col>
    </v-fade-transition>
  </v-row>
</template>

<script>
import SocialButtonBlock from "../components/SocialButtonBlock"
import SocialButtonRound from "../components/SocialButtonRound"

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
    isLandscape: undefined,
    tempMargin: 2
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

.dr1s {
  border-radius: 100%;
  cursor: pointer;
}
</style>
