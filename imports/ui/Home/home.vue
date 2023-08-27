<template>
  <headerSection/>
  <sidebar/>
  <router-view/>
</template>

<script>
import sidebar from './sidebar.vue'
import headerSection from './headerSection.vue'
// import contactTable from '../tables/contactTable.vue'

export default{
  name:'home',
  components:{
    sidebar,
    headerSection,
  }
}
</script>
