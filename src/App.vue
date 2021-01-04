<template>
  <v-app>
      <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navigationBar from './components/navigation-bar'
import tableGeneros from './components/table-generos'

export default {
  name: 'App',

  components: {
    navigationBar,
    tableGeneros
  },

  data: () => ({
    //
  })
}
</script>
