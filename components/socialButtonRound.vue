<template>
  <v-btn
    :href="medium.url"
    target="_blank"
    :color="medium.color"
    large
    fab
    :min-height="`${size}px`"
    :min-width="`${size}px`"
    elevation="0"
  >
    <v-img :max-width="`${size * 0.6}px`" :src="medium.logo">
      <v-container fill-height>
        <v-row justify="center" align="center">
          <span
            v-show="isSpotify"
            class="black--text font-weight-light"
            style="font-size: 24px;"
          >
            SOON
          </span>
        </v-row>
      </v-container>
    </v-img>
  </v-btn>
</template>

<script>
export default {
  name: "SocialButtonRound",
  props: {
    medium: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: () => 128
    }
  },
  computed: {
    isSpotify() {
      return this.medium.title === "Spotify"
    }
  }
}
</script>
