<template>
  <v-btn
    :href="medium.url"
    target="_blank"
    :color="medium.color"
    large
    fab
    :min-height="`${size}px`"
    :min-width="`${size}px`"
    elevation="12"
    :style="`opacity: ${isSpotify ? '0.75' : '1'};`"
  >
    <v-img
      :style="`opacity: ${isSpotify ? '0.75' : '1'};`"
      :max-width="`${size * 0.6}px`"
      :src="medium.logo"
    />
    <v-container v-show="isSpotify" class="overlay" fill-height>
      <v-row justify="center" align="center">
        <span class="title font-weight-regular accent--text">sOOn</span>
      </v-row>
    </v-container>
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

<style>
.overlay {
  position: absolute;
  top: 0;
  text-align: center;
  pointer-events: none;
}
</style>
