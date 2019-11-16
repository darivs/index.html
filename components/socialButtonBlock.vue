<template>
  <v-col cols="12">
    <v-btn
      :href="medium.url"
      target="_blank"
      :color="medium.color"
      large
      block
      min-height="64px"
      max-height="64px"
      elevation="0"
    >
      <v-col cols="2">
        <v-row justify="start">
          <v-img contain max-width="32px" :src="medium.logo" />
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-row justify="center">
          <span class="headline font-weight-light mx-5">
            {{ medium.title }}
          </span>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row justify="end">
          <v-icon v-if="medium.title !== 'Spotify'">mdi-open-in-new</v-icon>
          <span v-else class="caption">SOON</span>
        </v-row>
      </v-col>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  name: "SocialButtonBlock",
  props: {
    medium: {
      type: Object,
      required: true
    }
  }
}
</script>
