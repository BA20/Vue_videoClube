<template>
  <v-container fluid class="bg-img">
    <v-layout row wrap align-center>
      <v-flex xs4 offset-xs4>
        <h1 class="display-4 text-center mt-4" style="color: white">WorldFlix</h1>
      </v-flex>
      <v-flex xs4 offset-xs4 class="mt-4 ">
        <div class="white elevation-5 car-up">
          <v-toolbar dense dark color="success" class="elevation-3 car-up">
            <v-spacer></v-spacer>
            <v-toolbar-title>Iniciar sessão</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="form-background pl-4 pr-4 pt-2 pb-2" v-on:keyup.enter="login">
            <v-text-field
              v-model="username"
              label="Nome de utilizador"
              color="secondary accent-2"
            ></v-text-field>
            <v-text-field
              :type="'password'"
              v-model="password"
              label="Palavra-passe"
              color="secondary accent-2"
            ></v-text-field>
            <v-btn block class="my-4" color="secondary" @click="login" dark>Entrar</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <template v-if="alert.status">
      <v-snackbar
        v-model="snackbar"
        top
        color="success"
      >
        Sessão iniciada com sucesso
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
        Utilizador ou palavra-passe incorreto!
        <v-btn
          color="white"
          text
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
    </v-snackbar>
    </template>
  </v-container>
</template>

<script>

import axios from "axios";
export default {
  name: 'login',
    data: () => ({
    snackbar: true,
      alert: {
        status: null
    },
    username: "",
    password: ""
  }),
  methods: {
    login() {
      console.log("USERNAME: " + this.username);
      console.log("PASSWORD: " + this.password);
      axios.post('http://localhost:5000/utilizadores/login', {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.utilizadores) {
            this.alert.status = true;
            this.$store.dispatch("setToken", res.data.token);
            this.$store.dispatch("setUser", res.data.utilizadores);
            this.$router.push("/dashboard/");
          } else {
            this.alert.status = false;
          }
        });
    }
  }
}
</script>

<style scoped>
.car-up {
  border-radius: 10px;
}
.bg-img {
  background-image: url("../assets/img/background.jpg");
  background-size: cover;
  height: 100vh
}

</style>

