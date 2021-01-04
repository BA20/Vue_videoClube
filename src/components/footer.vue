<template>
<v-card height="150">
    <v-footer
     dark
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>WorldFlix</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
   name: 'footer',
   
  data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ],
    })
}
</script>
