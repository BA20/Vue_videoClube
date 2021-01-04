<template>
  <div class="container mt-10">
    <v-data-table
      :headers="headers"
      :items="artistas"
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
                  <v-icon class="px-2">fas fa-user-tie</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-toolbar-title class="d-inline-flex ml-2">Todos os artistas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" justify="center" scrollable max-width="500px">
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
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col >
                      <v-text-field color="secondary" v-model="editedItem.nome" label="Nome"></v-text-field>
                    </v-col>
                    <v-col >
                      <v-text-field color="secondary" v-model="editedItem.idImdb" label="Id Imdb"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field color="secondary" v-model="editedItem.imagem" label="Imagem"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                        color="secondary"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date"
                            label="Data de Nascimento"
                            prepend-icon="fa-calendar"
                            readonly
                            v-on="on"
                            color="secondary"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn color="info" @click="modal = false">Cancelar</v-btn>
                          <v-btn color="secondary" @click="$refs.dialog.save(date)">Guardar</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col >
                      <v-textarea color="secondary" v-model="editedItem.descricao" label="Descrição" rows="1"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="close">Cancelar</v-btn>
                <template v-if="editedIndex == -1">
                  <v-btn color="secondary" @click="save">Guardar</v-btn>
                </template>
                <template v-else>
                  <v-btn color="secondary" @click="editItem">Guardar</v-btn>
                </template>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" justify="center" scrollable max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Eliminar Artista</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col >
                      <p>Têm a certeza que quer elimanar o artista "{{ editedItem.nome }}"?</p>
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
      <template v-slot:item.dataNascimento="{ item }" >
        {{ new Date(item.dataNascimento).toLocaleString().split(",")[0]}}
      </template>
      <template v-slot:item.imagem="{ item }" >
        <v-container fluid>
          <v-row>
            <v-col
              class="d-flex py-0 px-0 col-lg-12 col-xl-8"
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
  name: 'tableArtistas',
  data: () => ({
    snackbar: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        value: 'idArtista'
      },
      { 
        text: 'Nome',
        value: 'nome'
      },
      {
        text: 'ID IMDB',
        value: 'idImdb'
      },
      { text: 'Descrição',
        value: 'descricao',
        width: '500px'
      },
      {
        text: 'Imagem',
        value: 'imagem'
      },
      { text: 'Data de Nascimento',
        value: 'dataNascimento'
      },
      { text: 'Actions',
        value: 'action',
        align: 'right',
        sortable: false
      }
    ],
    artistas: [],
    editedIndex: -1,
    editedItem: {
      idArtista: 0,
      nome: '',
      idImdb: '',
      descricao: '',
      imagem: '',
      dataNascimento: ''
    },
    defaultItem: {
      idArtista: 0,
      nome: '',
      idImdb: '',
      descricao: '',
      imagem: '',
      dataNascimento: ''
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
      return this.editedIndex === -1 ? 'Novo Artista' : 'Editar Artista'
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
      axios.get('http://localhost:5000/artistas').then(res => {
            if (res.data.status == true) {
                this.artistas = res.data.artistas;
            }
        })
    },

    editItem () {
      axios.put('http://localhost:5000/artistas/update', {
          idArtista: this.editedItem.idArtista,
          nome: this.editedItem.nome,
          idImdb: this.editedItem.idImdb,
          descricao: this.editedItem.descricao,
          imagem: this.editedItem.imagem,
          dataNascimento: this.editedItem.dataNascimento
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
        })
    },

    deleteItem (item) {
      axios.delete('http://localhost:5000/artistas/remove', {
        data: {
         idArtista: item.idArtista
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
      console.log("nome: " + this.editedItem.nome);
      console.log("idImdb:" +  this.editedItem.idImdb);
      console.log("descricao:" +  this.editedItem.descricao);
      console.log("imagem:" +  this.editedItem.imagem);
      console.log("dataNascimento:" +  this.date);

       axios.post('http://localhost:5000/artistas/add', {
          nome: this.editedItem.nome,
          idImdb: this.editedItem.idImdb,
          descricao: this.editedItem.descricao,
          imagem: this.editedItem.imagem,
          dataNascimento: this.date
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
        })
     
    },
    openDialogDelete (item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    openDialogEdit (item) {
      this.editedIndex = this.artistas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log("OPEN  EDIT: " +  this.editedItem.nome +  " || " +  this.editedItem.idArtista);
      this.date = new Date(this.editedItem.dataNascimento).toLocaleString().split(",")[0].split('-').toString("MM/dd/yyyy");
      this.dialog = true
    },
    search () {
      console.log("SEARCH: " + this.searchItem);
      axios.post('http://localhost:5000/artistas/search',{
          nome: this.searchItem
      }).then(res => {
          if (res.data.status == true) {
            this.artistas = res.data.artistas;
          }else{
            this.artistas = [];
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
