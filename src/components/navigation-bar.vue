<template>
<nav >
   <v-app-bar app dark
      >
      <v-toolbar-title>{{pageName}}</v-toolbar-title>
   </v-app-bar>
   <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      dark
      absolute
      class="pt-12" style="position: fixed;"
      >
      <v-list dense nav class="pt-5 pl-0">
         <v-list-group color="secondary"  >
            <template v-slot:activator>
               <v-list-item :class="miniVariant && 'px-1'">
                  <v-list-item-avatar>
                     <img src="../assets/img/users/user1.png">
                  </v-list-item-avatar>
                  <v-list-item-content>
                     <v-list-item-title>{{ username }}</v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
            </template>
            <v-list-item
            class="my-1"
            @click="logout"
            >
            <v-list-item-icon>
               <v-icon>fa-sign-out-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
               <v-list-item-title>Terminar Sessão</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
         </v-list-group>
         <v-divider></v-divider>
            <v-list-item
            class="my-1"
            v-for="item in items"
            :key="item.title"
            :to="item.router"
            >
            <v-list-item-icon class="pl-1">
               <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
               <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
</nav>
</template>

<script>

import store from '@/store/index'
export default {
   name: 'navBar',
   props: {
      pageName: String
   },
  data () {
    return {
      drawer: true,
      username: store.state.user.nome,
      //imagem: store.state.user.imagem,
      //username: "Fabio Cardoso",
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', router: '/dashboard' },
        { title: 'Artistas', icon: 'fa-user-tie', router: '/artistas' },
        { title: 'Géneros', icon: 'fa-clipboard', router: '/generos' },
        { title: 'Utilizadores', icon: 'fa-user', router: '/utilizadores' },
        { title: 'Vídeos', icon: 'fa-video', router: '/videos' },
        { title: 'Episodios', icon: 'fa-film', router: '/episodios' }
      ],
      color: 'success',
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: false
    }
  },

  created() {
      this.getData();
  },

  methods: {
     getData() {
       // console.log("TESTE" + store.state.user.nome);
     },
     logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
</style>
