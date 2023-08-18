<!-- <template>
  <nav class="flex items-center">
    <router-link :to="{ name: 'sidebar' }" class="mr-4 text-green-700 hover:underline">Home</router-link>
    <router-link :to="{ name: 'about' }" class="mr-4 text-green-700 hover:underline">About</router-link>
  </nav>
</template> -->
<template>
  <headerSection/>
  <sidebar/>
  <!-- <contactTable/> -->
  <router-view/>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import sidebar from './sidebar.vue'
import headerSection from './headerSection.vue'
// import contactTable from './contactTable.vue';

export default{
name:'AppMenu',
components:{
  sidebar,
  headerSection,
  // contactTable
  
}
}
</script>
