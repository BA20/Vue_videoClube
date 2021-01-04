<template>
  <div >
      <navBar pageName="Vídeos" fixed app/>
      <v-content class="py-0 my-0" app>
        <tableVideos/>
      </v-content>
        <footeres />
  </div>
</template>

<script>
import navBar from '@/components/navigation-bar.vue'
import footeres from '@/components/footer.vue'
import tableVideos from '@/components/table-videos.vue'

export default {
  name: 'Videos',
  components: {
    navBar,
    footeres,
    tableVideos
  }
}
</script>