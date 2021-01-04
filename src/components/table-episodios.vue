<template>
  <div class="container mt-10">
    <v-data-table
      :headers="headers"
      :items="episodios"
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
                  <v-icon class="px-2">fas fa-film</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-toolbar-title class="d-inline-flex ml-2">Todos os episodios</v-toolbar-title>
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
                      Adicionar Trailer e servidor
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
                <span class="headline">Eliminar episodio</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col >
                      <p>Têm a certeza que quer elimanar o episodio "{{ editedItem.titulo }}"?</p>
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
  name: 'tableEpisodios',
  data: () => ({
    stepper: 1,
    snackbar: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        value: 'idEpisodio'
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
      { 
        text: 'Sinopse',
        value: 'sinopse',
        width: '400px'
      },
      {
        text: 'Servidor',
        value: 'link'
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
      { 
        text: 'Diretor',
        value: 'diretor'
      },
      {
        text: 'Nr Episodio',
        value: 'nrEpisodio'
      },
      {
        text: 'Nr Temporada',
        value: 'nrTemporada'
      },
      { text: 'Actions',
        value: 'action',
        align: 'right',
        sortable: false,
        width: '100px'
      }
    ],
    episodios: [],
    editedIndex: -1,
    editedItem: {
      idEpisodio: 0,
      titulo: '',
      idImdb: '',
      classImdb: '',
      sinopse: '',
      link: '',
      imagem: '',
      linkTrailer: '',
      ano: '',
      diretor: '',
      nrEpisodio: 0,
      nrTemporada: 0
    },
    defaultItem: {
      idEpisodio: 0,
      titulo: '',
      idImdb: '',
      classImdb: '',
      sinopse: '',
      link: '',
      imagem: '',
      linkTrailer: '',
      ano: '',
      diretor: '',
      nrEpisodio: 0,
      nrTemporada: 0
    },
    alert: {
      status: null,
      msg: ''
    },
    searchItem: '',
    boolSearchItem: false,
    date: new Date().toISOString().substr(0, 10),
    modal: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Episodio' : 'Editar Episodio'
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
      axios.get('http://localhost:5000/episodios').then(res => {
            if (res.data.status == true) {
                this.episodios = res.data.episodio;
            }
        })
    },

    editItem () {
      console.log("Titulo: " + this.editedItem.titulo);
      console.log("idImdb:" +  this.editedItem.idImdb);
      console.log("classImdb:" +  this.editedItem.classImdb);
      console.log("Sinopse:" +  this.editedItem.sinopse);
      console.log("imagem:" +  this.editedItem.imagem);
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
      this.editedIndex = this.episodios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },
    search () {
      console.log("SEARCH: " + this.searchItem);
      axios.post('http://localhost:5000/videos/search',{
          search: this.searchItem
      }).then(res => {
          if (res.data.status == true) {
            this.episodios = res.data.episodio;
          }else{
            this.episodios = [];
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
