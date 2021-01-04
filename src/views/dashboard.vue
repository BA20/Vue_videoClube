<template>
  <div >
      <navBar pageName="Dashboard"
      fixed />
      <v-content class="py-0 my-0">
        <v-container >
          <v-row >
            <v-col >
              <chartGeneros/>
            </v-col>
          </v-row>
          <v-row >
            <v-col >
              <tableUsersOnline/>
            </v-col>
            <v-col >
              <tableViews/>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
  </div>
</template>

<script>
import navBar from '@/components/navigation-bar.vue'
import footeres from '@/components/footer.vue'
import chartGeneros from '@/components/chart-generos.vue'
import tableUsersOnline from '@/components/table-users-online.vue'
import tableViews from '@/components/table-views.vue'

export default {
  name: 'Dashboard',
  components: {
    navBar,
    footeres,
    chartGeneros,
    tableUsersOnline,
    tableViews
  }
}
</script>