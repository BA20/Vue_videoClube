<template>
  <div class="home">
    <navBar pageName="Dashboard"
      fixed />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import navBar from '@/components/navigation-bar.vue'

export default {
  name: 'home',
  components: {
    navBar
  }
}
</script>
