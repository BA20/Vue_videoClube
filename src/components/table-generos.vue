<template>
  <div class="container mt-10">
    <v-data-table
      :headers="headers"
      :items="generos"
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
                  <v-icon class="px-2">fas fa-clipboard</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-toolbar-title class="d-inline-flex ml-2">Todos os géneros</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" justify="center" scrollable max-width="300px">
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
                      <v-text-field color="secondary" v-model="editedItem.nome" label="nome"></v-text-field>
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
                <span class="headline">Eliminar categoria</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col >
                      <p>Têm a certeza que quer elimanar a categoria "{{ editedItem.nome }}"?</p>
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
  name: 'tableGeneros',
  /* ,
  mounted () {
    axios.get('http://localhost:5000/artistas').then(res => {
      this.info = res
    })
  } */
  data: () => ({
    snackbar: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        align: 'left',
        value: 'idGenero'
      },
      { text: 'Nome',
        value: 'nome',
        align: 'center'
      },
      { text: 'Actions',
        value: 'action',
        align: 'right',
        sortable: false
      }
    ],
    generos: [],
    editedIndex: -1,
    editedItem: {
      idGenero: 0,
      nome: ''
    },
    defaultItem: {
      idGenero: 0,
      nome: ''
    },
    alert: {
      status: null,
      msg: ''
    },
    searchItem: '',
    boolSearchItem: false
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo género' : 'Editar género'
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
      axios.get('http://localhost:5000/generos').then(res => {
            if (res.data.status == true) {
                this.generos = res.data.genero;
            }
        })
    },

    editItem () {
      console.log("EDITAR: " + this.editedItem.nome  +  "  || " + this.editedItem.idGenero);
      axios.put('http://localhost:5000/generos/update', {
          idGenero: this.editedItem.idGenero,
          nome: this.editedItem.nome
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
      axios.delete('http://localhost:5000/generos/remove', {
        data: {
         idGenero: item.idGenero
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
       axios.post('http://localhost:5000/generos/add', {
         nome: this.editedItem.nome
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
      this.editedIndex = this.generos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log("OPEN  EDIT: " +  this.editedItem.nome +  " || " +  this.editedItem.idGenero);
      this.dialog = true
    },
    search () {
      console.log("SEARCH: " + this.searchItem);
      axios.post('http://localhost:5000/generos/search',{
          nome: this.searchItem
      }).then(res => {
          if (res.data.status == true) {
            this.generos = res.data.genero;
          }else{
            this.generos = [];
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
</style>
