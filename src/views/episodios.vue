<template>
  <div >
      <navBar pageName="Episodios"
      fixed />
      <v-content class="py-0 my-0">
        <tableEpisodios/>
      </v-content>
      <footeres />
  </div>
</template>

<script>
import navBar from '@/components/navigation-bar.vue'
import footeres from '@/components/footer.vue'
import tableEpisodios from '@/components/table-episodios.vue'

export default {
  name: 'Generos',
  components: {
    navBar,
    footeres,
    tableEpisodios
  }
}
</script>