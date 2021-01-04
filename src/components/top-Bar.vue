<template>

</template>

<script>
export default {
  name: 'navBar',

  data () {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      color: 'success',
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: false
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {
  padding-top: 5% !important;
}
</style>
