<template>

  <div class="container mt-10 col-xl-5 col-md-9">
   <v-card
      class="mt-4 mx-auto"
      color="#EEEEEE"
    >
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="success"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
      <v-sparkline
        :labels="labels"
        :value="value"
        padding="2"
        line-width="8"
        auto-draw
        type="bar"
        label-size="5"
        :auto-line-width="true"
        color="white"
        class="py-2"
      ></v-sparkline>
</v-sheet>
  
      <v-card-text class="pt-1">
        <div class="title font-weight-light mb-2">Géneros</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as axios from 'axios'
export default {
  name: 'chartGeneros',
  data: () => ({
    value: [2, 1, 1, 4, 5, 3, 3],
    labels: ["Comedia", "Drama", "Aventura", "Ação", "Guerra", "Misterio", "Romance"]
  }),

  created () {
    //this.initialize()
  },

  methods: {
    initialize () {
      axios.get('http://localhost:5000/artistas').then(res => {
            if (res.data.status == true) {
                this.artistas = res.data.artistas;
            }
        })
    }
  }
}
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
