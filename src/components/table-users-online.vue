<template>
  <div class="container mt-10" cols="1">
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
          <v-toolbar-title class="d-inline-flex ml-2">Todos os utilizadores online</v-toolbar-title>
          <v-spacer></v-spacer>
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
    </v-data-table>
  </div>
</template>

<script>
import * as axios from 'axios'
export default {
  name: 'tableUsersOnline',
  data: () => ({
    headers: [
      {
        text: 'ID',
        value: 'idUtilizador'
      },
      {
        text: 'Username',
        value: 'username'
      },
      {
        text: 'Imagem',
        value: 'imagem'
      },
      { text: 'Data do Registo',
        value: 'dataRegisto'
      },
      {
        text: 'Data do Ultimo Acesso',
        value: 'dataUltimoAcesso'
      }
    ],
    utilizadores: [],
    editedItem: {
      idUtilizador: 0,
      username: '',
      imagem: '',
      dataRegisto: '',
      dataUltimoAcesso: ''
    },
    defaultItem: {
      idUtilizador: 0,
      username: '',
      imagem: '',
      dataRegisto: '',
      dataUltimoAcesso: ''
    }
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      axios.get('http://localhost:5000/utilizadores/online').then(res => {
            if (res.data.status == true) {
                this.utilizadores = res.data.utilizadores;
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