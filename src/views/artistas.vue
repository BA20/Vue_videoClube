<template>
  <div >
      <navBar pageName="Artistas"
      fixed />
      <v-content class="py-0 my-0">
        <tableArtistas/>
      </v-content>
      <footeres />
  </div>
</template>

<script>
import navBar from '@/components/navigation-bar.vue'
import footeres from '@/components/footer.vue'
import tableArtistas from '@/components/table-artistas.vue'

export default {
  name: 'Generos',
  components: {
    navBar,
    footeres,
    tableArtistas
  }
}
</script>