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
          <v-toolbar-title class="d-inline-flex ml-2">Todos os vídeos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" justify="center" scrollable max-width="900px">
            <template v-slot:activator="{ on }">
              <v-container >
                  <v-row class="flex-row-reverse">
                    <v-col cols="1">
                      <v-btn right color="secondary" dark fab small v-on="on">
                        <v-icon>fa-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        hide-details
                        prepend-icon="fa-search"
                        single-line
                        color="secondary"
                        v-model="searchItem"
                        v-on:keyup.enter="search"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              
            </template>
            <v-stepper v-model="stepper"  >
              <template>
                <v-stepper-header >
                    <v-stepper-step color="secondary" :complete="stepper > 1" step="1" >
                      Adicionar informações
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="secondary" :complete="stepper > 2" step="2"  >
                      Adicionar Artistas e Géneros
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="secondary" :complete="stepper > 3" step="3"  >
                      Concluir
                    </v-stepper-step>
                </v-stepper-header>
  
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12 elevation-0" height="200px" >
                <v-container fluid>
                  <v-row align="center" >
                    <v-col>
                      <v-select
                        color="secondary"
                        v-model="TipoVideos"
                        :items="tipoVideoInfo"
                        label="Tipo de vídeo"
                      ></v-select>
                    </v-col>
                    <v-col >
                      <v-text-field color="secondary" v-model="editedItem.titulo" label="Título"></v-text-field>
                    </v-col>
                    <v-col >
                      <v-text-field color="secondary" v-model="editedItem.idImdb" label="Id Imdb"></v-text-field>
                    </v-col>
                    <v-col >
                      <v-text-field color="secondary" v-model="editedItem.classImdb" label="Classificação Imdb"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field color="secondary" v-model="editedItem.ano" label="Ano"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field color="secondary" v-model="editedItem.imagem" label="Imagem"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field color="secondary" v-model="editedItem.diretor" label="Diretor"></v-text-field>
                    </v-col>
                    <v-col >
                      <v-textarea color="secondary" v-model="editedItem.sinopse" label="Sinopse" rows="1"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-btn color="secondary" @click="stepper = 2" >Continuar</v-btn>
              <v-btn color="info" @click="close" class="ml-2">Cancelar</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
             <v-card class="mb-12 elevation-0" height="200px" >
                <v-container fluid>
                  <v-row align="center" >
                    <v-col>
                      <v-select
                        color="secondary"
                        v-model="generos"
                        :items="generosInfo"
                        multiple
                        label="Géneros"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row align="center" >
                    <v-col>
                      <v-select
                        color="secondary"
                        v-model="artistas"
                        :items="artistasInfo"
                        multiple
                        label="Artistas"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
             </v-card>

              <v-btn color="secondary" @click="stepper = 3" >Continuar</v-btn>
              <v-btn color="info" @click="close" class="ml-2">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
            <v-card class="mb-12 elevation-0" height="200px" >
              <v-container fluid v-if="TipoVideos == 'Filmes'"> 
                  <v-row align="center" >
                    <v-col>
                      <v-text-field color="secondary" v-model="editedItem.link" label="Link"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field color="secondary" v-model="editedItem.linkTrailer" label="Link Trailer"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-else>
                  Tudo preenchido
                </v-container>
            </v-card>
                <template v-if="editedIndex == -1">
                  <v-btn color="secondary" @click="save">Guardar</v-btn>
                </template>
                <template v-else>
                  <v-btn color="secondary" @click="editItem">Guardar</v-btn> 
                </template>
              <v-btn color="info" @click="close" class="ml-2">Cancelar</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </template>
      </v-stepper>
          </v-dialog>
          <v-dialog v-model="dialogDelete" justify="center" scrollable max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Eliminar vídeo</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col >
                      <p>Têm a certeza que quer elimanar o vídeo "{{ editedItem.titulo }}"?</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="close">Cancelar</v-btn>
                <v-btn color="error" @click="deleteItem(editedItem)">Eliminar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      <template v-slot:item.Artistas="{ item }" >
        <div v-for="artista in item.Artistas" v-bind:key="artista.idArtista">
          {{artista.nome}} 
        </div>
      </template>  
      <template v-slot:item.Generos="{ item }" >
        <div v-for="genero in item.Generos" v-bind:key="genero.idGenero">
          {{genero.nome}} 
        </div>
      </template>  
      <template v-slot:item.action="{ item }">
        <v-btn color="blue" @click="openDialogEdit(item)" fab x-small>
          <v-icon
          color="white"
          small
        >
          mdi-pencil
        </v-icon>
        </v-btn>
        <v-btn class="ml-1" color="error" @click="openDialogDelete(item)" fab x-small>
        <v-icon
          color="white"
          small
        >
          mdi-delete
        </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
          <p color="error" class="mt-3">Nenhum resultado encontrado</p>
          <v-btn color="error" @click="initialize" class="mb-4">Reset</v-btn>
      </template>
    </v-data-table>
    <template v-if="alert.status">
      <v-snackbar
        v-model="snackbar"
        top
        color="success"
      >
        {{ alert.msg }}
        <v-btn
          color="white"
          text
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
    </v-snackbar>
    </template>
    <template v-else-if="alert.status != null">
          <v-snackbar
        v-model="snackbar"
        top
        color="error"
      >
        {{ alert.msg }}
        <v-btn
          color="white"
          text
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
    </v-snackbar>
    </template>
  </div>
</template>

<script>
import * as axios from 'axios'
export default {
  name: 'tableVideos',
  data: () => ({
    stepper: 1,
    snackbar: true,
    dialog: false,
    dialogDelete: false,
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
        text: 'Class. IMDB',
        value: 'classImdb'
      },
      { text: 'Sinopse',
        value: 'sinopse',
        width: '400px'
      },
      {
        text: 'Imagem',
        value: 'imagem',
        width: '150px'
      },
      {
        text: 'Trailer',
        value: 'linkTrailer'
      },
      {
        text: 'Ano',
        value: 'ano'
      },
      { text: 'Diretor',
        value: 'diretor'
      },
      {
        text: 'Artistas',
        value: 'Artistas'
      },
      { text: 'Géneros',
        value: 'Generos'
      },
      { text: 'Actions',
        value: 'action',
        align: 'right',
        sortable: false,
        width: '100px'
      }
    ],
    videos: [],
    editedIndex: -1,
    editedItem: {
      idVideo: 0,
      titulo: '',
      idImdb: '',
      classImdb: '',
      sinopse: '',
      imagem: '',
      ano: '',
      diretor: '',
      Artistas: [],
      Generos: [],
      link: '',
      linkTrailer: '',
      TipoVideos: {}
    },
    defaultItem: {
      idVideo: 0,
      titulo: '',
      idImdb: '',
      classImdb: 0,
      sinopse: '',
      imagem: '',
      ano: '',
      diretor: '',
      Artistas: '',
      Generos: '',
      link: '',
      linkTrailer: '',
      TipoVideos: ''
    },
    alert: {
      status: null,
      msg: ''
    },
    searchItem: '',
    boolSearchItem: false,
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    TipoVideos: '',
    tipoVideoInfo: [],
    allTipoVideo: [],
    generos: [],
    generosInfo: [],
    allGeneros: [],
    artistas: [],
    artistasInfo: [],
    allArtistas: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Vídeo' : 'Editar Vídeo'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

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
      axios.get('http://localhost:5000/tipoVideo').then(res => {
            if (res.data.status == true) {
              this.allTipoVideo = res.data.TipoVideos;
              console.log("TIPO!: " + res.data.TipoVideos[0].nome);
              for (let i = 0; i < res.data.TipoVideos.length; i++) {
                this.tipoVideoInfo[i] = res.data.TipoVideos[i].nome
                
              }
            }
        })
      axios.get('http://localhost:5000/generos').then(res => {
            if (res.data.status == true) {
              this.allGeneros = res.data.genero;
              console.log("TIPO!: " + res.data.genero[0].nome);
              for (let i = 0; i < res.data.genero.length; i++) {
                this.generosInfo[i] = res.data.genero[i].nome
                
              }
            }
        })
      axios.get('http://localhost:5000/artistas').then(res => {
            if (res.data.status == true) {
              this.allArtistas = res.data.artistas;
              console.log("TIPO!: " + res.data.artistas[0].nome);
              for (let i = 0; i < res.data.artistas.length; i++) {
                this.artistasInfo[i] = res.data.artistas[i].nome
                
              }
            }
        })
    },

    editItem () {
      console.log("Titulo: " + this.editedItem.titulo);
      console.log("idImdb:" +  this.editedItem.idImdb);
      console.log("classImdb:" +  this.editedItem.classImdb);
      console.log("Sinopse:" +  this.editedItem.sinopse);
      console.log("imagem:" +  this.editedItem.imagem);
      console.log("linkTrailer:" +  this.editedItem.linkTrailer);
      console.log("Ano:" +  this.editedItem.ano);
      console.log("Diretor:" +  this.editedItem.diretor);
      console.log("LINK:" +  this.editedItem.link);
      console.log("LINK TRAILER:" +  this.editedItem.linkTrailer);
      axios.put('http://localhost:5000/videos/update', {
          idVideo: this.editedItem.idVideo,
          titulo: this.editedItem.titulo,
          idImdb: this.editedItem.idImdb,
          classImdb: this.editedItem.classImdb,
          sinopse: this.editedItem.sinopse,
          imagem: this.editedItem.imagem,
          linkTrailer: this.editedItem.linkTrailer,
          ano: this.editedItem.ano,
          diretor: this.editedItem.diretor,
          TipoVideoIdTipoVideos: this.getIdTipoVideo(this.tipoVideos),
          idArtista: this.getIdArtistas(this.artistas),
          idGenero: this.getIdGeneros(this.generos)
       }).then(res => {
          this.dialog = false;
          if(res.data.status == true) {
            this.initialize();
          }
          console.log(res.data.status);
          this.alert.status = res.data.status;
          this.alert.msg = res.data.msg;
          console.log(res.data.msg);
          this.snackbar = true;
          this.stepper = 1;
        })
    },

    deleteItem (item) {
      axios.delete('http://localhost:5000/videos/remove', {
        data: {
         idVideo: item.idVideo
        }
       }).then(res => {
          this.dialogDelete = false;
          if(res.data.status == true) {
            this.initialize();
          }
          console.log(res.data.status);
          this.alert.status = res.data.status;
          this.alert.msg = res.data.msg;
          console.log(res.data.msg);
          this.snackbar = true;
        })
    },
    close () {
      this.dialog = false;
      this.dialogDelete = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    getIdTipoVideo (tipoVideo) {
      for (let i = 0; i < this.allTipoVideo.length; i++) {
        if(tipoVideo == this.allTipoVideo[i].nome){
          return this.allTipoVideo[i].idTipoVideos
        }
      }
    },
    getIdArtistas (artistas) {
      var idArtistas = '';


      for (let k = 0; k < artistas.length; k++) {
        for (let i = 0; i < this.allArtistas.length; i++) {
          if(artistas[k] == this.allArtistas[i].nome){
            if(idArtistas == ''){
              idArtistas = this.allArtistas[i].idArtista
            }else{
              idArtistas = idArtistas + "," + this.allArtistas[i].idArtista
            }
          }
        }
      }
      return idArtistas
    },
    getIdGeneros (generos) {
      var idGeneros = '';


      for (let k = 0; k < generos.length; k++) {
        for (let i = 0; i < this.allGeneros.length; i++) {
          if(generos[k] == this.allGeneros[i].nome){
            if(idGeneros == ''){
              idGeneros = this.allGeneros[i].idGenero
            }else{
              idGeneros = idGeneros + "," + this.allGeneros[i].idGenero
            }
          }
        }
      }
      return idGeneros
    },
    save () {
      /*console.log("Titulo: " + this.editedItem.titulo);
      console.log("idImdb:" +  this.editedItem.idImdb);
      console.log("classImdb:" +  this.editedItem.classImdb);
      console.log("Sinopse:" +  this.editedItem.sinopse);
      console.log("imagem:" +  this.editedItem.imagem);
      console.log("Ano:" +  this.editedItem.ano);
      console.log("Diretor:" +  this.editedItem.diretor);
      console.log("LINK:" +  this.editedItem.link);
      console.log("LINK TRAILER:" +  this.editedItem.linkTrailer);
      console.log("Tipo video:" +  this.getIdTipoVideo(this.tipoVideo));
      console.log("Artistas:" +  this.getIdArtistas(this.artistas));
      console.log("Generos:" +  this.getIdGeneros(this.generos));*/

      axios.post('http://localhost:5000/videos/add', {
          titulo: this.editedItem.titulo,
          idImdb: this.editedItem.idImdb,
          classImdb: this.editedItem.classImdb,
          sinopse: this.editedItem.sinopse,
          imagem: this.editedItem.imagem,
          linkTrailer: this.editedItem.linkTrailer,
          ano: this.editedItem.ano,
          diretor: this.editedItem.diretor,
          TipoVideoIdTipoVideos: this.getIdTipoVideo(this.tipoVideo),
          idArtista: this.getIdArtistas(this.artistas),
          idGenero: this.getIdGeneros(this.generos),
          visualizacoes: 0
       }).then(res => {
          this.dialog = false;
          if(res.data.status == true) {
            this.initialize();
            if(this.tipoVideo == 'Filmes'){
                this.saveEpi(res.data.idVideo);
            }
          }
          console.log(res.data.status);
          this.alert.status = res.data.status;
          this.alert.msg = res.data.msg;
          console.log(res.data.msg);
          this.snackbar = true;
          this.stepper = 1;
          this.initialize();
        })
     
    },

    saveEpi (idVideo) {
      /*console.log("Titulo: " + this.editedItem.titulo);
      console.log("idImdb:" +  this.editedItem.idImdb);
      console.log("classImdb:" +  this.editedItem.classImdb);
      console.log("Sinopse:" +  this.editedItem.sinopse);
      console.log("LINK:" +  this.editedItem.link);
      console.log("imagem:" +  this.editedItem.imagem);
      console.log("LINK TRAILER:" +  this.editedItem.linkTrailer);
      console.log("Ano:" +  this.editedItem.ano);
      console.log("Diretor:" +  this.editedItem.diretor);*/

      axios.post('http://localhost:5000/episodios/add/' + idVideo, {
          titulo: this.editedItem.titulo,
          idImdb: this.editedItem.idImdb,
          classImdb: this.editedItem.classImdb,
          sinopse: this.editedItem.sinopse,
          link: this.editedItem.link,
          imagem: this.editedItem.imagem,
          linkTrailer: this.editedItem.linkTrailer,
          ano: this.editedItem.ano,
          diretor: this.editedItem.diretor,
          nrEpisodio: 0,
          nrTemporada: 0
       }).then(res => {
          this.dialog = false;
          if(res.data.status == true) {
            this.initialize();
          }
          console.log(res.data.status);
          console.log(res.data.msg);
        })
     
    },

    openDialogDelete (item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    openDialogEdit (item) {
      this.editedIndex = this.videos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.TipoVideos = this.editedItem.TipoVideos.nome;
      for (let i = 0; i < this.editedItem.Generos.length; i++) {
        this.generos[i] = this.editedItem.Generos[i].nome;
      }
      for (let i = 0; i < this.editedItem.Artistas.length; i++) {
        this.artistas[i] = this.editedItem.Artistas[i].nome;
      }
      this.dialog = true
    },
    search () {
      console.log("SEARCH: " + this.searchItem);
      axios.post('http://localhost:5000/videos/search',{
          search: this.searchItem
      }).then(res => {
          if (res.data.status == true) {
            this.videos = res.data.videos;
          }else{
            this.videos = [];
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
