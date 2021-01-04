<template>
  <div >
      <navBar pageName="Géneros"
      fixed />
      <v-content class="py-0 my-0">
        <tableGeneros/>
      </v-content>
      <footeres />
  </div>
</template>

<script>
import navBar from '@/components/navigation-bar.vue'
import footeres from '@/components/footer.vue'
import tableGeneros from '@/components/table-generos.vue'

export default {
  name: 'Generos',
  components: {
    navBar,
    footeres,
    tableGeneros
  }
}
</script>