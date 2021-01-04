<template>
  <div class="container mt-10">
    <v-data-table
      :headers="headers"
      :items="videos"
      sort-by="ID"
      class="elevation-1"
      dark
    >
      <template v-slot:top>
        <v-toolbar flat dark>
          <v-card color="secondary">
            <v-container>
              <v-row justify="space-between">
                <v-col cols="auto" >
                  <v-icon class="px-2">fas fa-video</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-toolbar-title class="d-inline-flex ml-2">Vídeos mais populares</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.idImdb="{ item }" >
        <v-container fluid>
          <v-row>
            <v-col class="d-flex py-0 px-0 col-lg-12 col-xl-12">
              <v-btn color="blue" :href="'https://www.imdb.com/title/' + item.idImdb" target="_blank" fab small>
          <v-icon
          color="white"
          
        >
          fab fa-imdb
        </v-icon>
        </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:item.imagem="{ item }" >
        <v-container fluid>
          <v-row>
            <v-col
              class="d-flex py-0 px-0 col-lg-12 col-xl-12"
            >
              <v-img :src="item.imagem" aspect-ratio="1" contain></v-img>
            </v-col>
          </v-row>
        </v-container>
      </template>
       <template v-slot:item.linkTrailer="{ item }" >
        <v-container fluid>
          <v-row>
            <v-col class="d-flex py-0 px-0 col-lg-12 col-xl-12">
              <v-btn color="blue" :href="item.linkTrailer" target="_blank" fab small>
          <v-icon
          color="white"
          small
        >
          fab fa-youtube
        </v-icon>
        </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as axios from 'axios'
export default {
  name: 'tableViews',
  data: () => ({
    headers: [
      {
        text: 'ID',
        value: 'idVideo'
      },
      { 
        text: 'título',
        value: 'titulo',
        width: '25px'
      },
      { text: 'IMDB',
        value: 'idImdb'
      },
      {
        text: 'Imagem',
        value: 'imagem',
        width: '150px'
      },
      {
        text: 'Trailer',
        value: 'linkTrailer'
      }
    ],
    videos: [],
    editedItem: {
      idVideo: 0,
      titulo: '',
      idImdb: '',
      imagem: '',
      linkTrailer: ''
    },
    defaultItem: {
      idVideo: 0,
      titulo: '',
      idImdb: '',
      imagem: '',
      linkTrailer: ''
    }
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      axios.get('http://localhost:5000/videos').then(res => {
            if (res.data.status == true) {
                this.videos = res.data.videos;
            }
        })
    }
  }
}
</script>

<style scoped>
.v-toolbar__title {
  overflow: unset !important;
}
.contain {
  object-fit: contain !important;
  }

</style>
