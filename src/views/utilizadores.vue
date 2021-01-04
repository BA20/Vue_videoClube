<template>
  <div >
      <navBar pageName="Utilizadores"
      fixed />
      <v-content class="py-0 my-0">
        <tableUtilizadores/>
      </v-content>
        <footeres app />
  </div>
</template>

<script>
import navBar from '@/components/navigation-bar.vue'
import footeres from '@/components/footer.vue'
import tableUtilizadores from '@/components/table-utilizadores.vue'

export default {
  name: 'Generos',
  components: {
    navBar,
    footeres,
    tableUtilizadores
  }
}
</script>