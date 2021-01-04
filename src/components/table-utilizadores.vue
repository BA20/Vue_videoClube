<template>
  <div class="container mt-10">
    <v-data-table
      :headers="headers"
      :items="utilizadores"
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
                  <v-icon class="px-2">fas fa-user</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-toolbar-title class="d-inline-flex ml-2">Todos os Utilizadores</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" justify="center" scrollable max-width="500px">
            <template v-slot:activator="{ on }">
              <v-container >
                <div v-if="on"></div>
                  <v-row class="flex-row-reverse">
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
                      <v-text-field color="secondary" v-model="editedItem.nivelAcesso" label="Nivel de Acesso"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="close">Cancelar</v-btn>
                <template v-if="editedIndex == -1">
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
      <template v-slot:item.dataRegisto="{ item }" >
        {{ new Date(item.dataRegisto).toLocaleString().split(",")[0]}}
      </template>
      <template v-slot:item.dataUltimoAcesso="{ item }" >
        <div v-if="item.dataUltimoAcesso">
        {{ new Date(item.dataUltimoAcesso).toLocaleString().split(",")[0]}}
        </div>
        <div v-else>
          Não existe data
        </div>
      </template>
      <template v-slot:item.imagem="" >
        <v-container fluid>
          <v-row>
            <v-col
              class="d-flex py-0 px-0 col-lg-12 col-xl-8"
            >
              <v-img src="../assets/img/users/user2.png" aspect-ratio="1" contain class="round-img"></v-img>
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
  name: 'tableUtilizadores',
  data: () => ({
    snackbar: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        value: 'idUtilizador'
      },
      { 
        text: 'Nome',
        value: 'nome'
      },
      {
        text: 'Username',
        value: 'username'
      },
      { text: 'E-mail',
        value: 'email'
      },
      {
        text: 'Imagem',
        value: 'imagem'
      },
      { text: 'Nivel de Acesso',
        value: 'nivelAcesso'
      },
      { text: 'Data do Registo',
        value: 'dataRegisto'
      },
      {
        text: 'Data do Ultimo Acesso',
        value: 'dataUltimoAcesso'
      },
      { text: 'Estado',
        value: 'estado'
      },
      { text: 'Actions',
        value: 'action',
        align: 'right',
        sortable: false
      }
    ],
    utilizadores: [],
    editedIndex: -1,
    editedItem: {
      idUtilizador: 0,
      nome: '',
      username: '',
      email: '',
      imagem: '',
      nivelAcesso: 0,
      dataRegisto: '',
      dataUltimoAcesso: '',
      estado: false
    },
    defaultItem: {
      idUtilizador: 0,
      nome: '',
      username: '',
      email: '',
      imagem: '',
      nivelAcesso: 0,
      dataRegisto: '',
      dataUltimoAcesso: '',
      estado: false
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
      return this.editedIndex === -1 ? '' : 'Editar Utilizador'
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
      axios.get('http://localhost:5000/utilizadores').then(res => {
                this.utilizadores = res.data.utilizadores;
        })
    },

    editItem () {
      console.log("EDITAR: " + this.editedItem.nivelAcesso  +  "  || " + this.editedItem.idUtilizador);
      axios.put('http://localhost:5000/utilizadores/update', {
          idUtilizador: this.editedItem.idUtilizador,
          nivelAcesso: this.editedItem.nivelAcesso
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
      axios.delete('http://localhost:5000/utilizadores/remove', {
        data: {
         idUtilizador: item.idUtilizador
        }
       }).then(res => {
          this.dialogDelete = false;
          if(res.data.status == true) {
            console.log("RESET RESET RESET RESET RESET RESET RESET RESET RESET RESET");
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
    openDialogDelete (item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    openDialogEdit (item) {
      this.editedIndex = this.utilizadores.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log("OPEN  EDIT: " +  this.editedItem.nome +  " || " +  this.editedItem.idUtilizador);
      this.dialog = true
    },
    search () {
      console.log("SEARCH: " + this.searchItem);
      axios.post('http://localhost:5000/utilizadores/search',{
          nome: this.searchItem
      }).then(res => {
          if (res.data.status == true) {
            this.utilizadores = res.data.utilizadores;
          }else{
            this.utilizadores = [];
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
.round-img {
  border-radius: 50% !important;
}
</style>
