<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/home" class="navbar-brand" id="moodle">Moodle</router-link>
    <div class="navbar-nav ml-auto" id="navItems">
        <router-link to="/entry/list" class="nav-item nav-link">Entries</router-link>
        <router-link to="/trends" class="nav-item nav-link">Trends</router-link>
        <router-link to="/insights" class="nav-item nav-link">Insights</router-link>
    </div>
    <div id="logoutButton" class="container">
       <button type="button" class="btn btn-light logout" @click="handleLogOut">Logout</button>
    </div>
  </nav>
</template>
  
    
<script>
import { decodeCredential, googleLogout } from 'vue3-google-login'
// import HomePage from './HomePage.vue'

export default {
  name: "NavBar",
  data: () => ({
    isInit: false,
    isLoggedIn: false,
    userName: '',
    lastLogin: Date,
    picture: ''

  }),

  mounted() {
    // this if now should be used on each component to check for being logged in
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true
      const userData = decodeCredential(this.$cookies.get('user_session'))
      this.userName = userData.given_name
      this.picture = userData.picture      
    }
  },
  methods: {
    handleLogOut: async function () {
      googleLogout()
      await this.$cookies.remove('user_session')
      this.isLoggedIn = false
      this.$router.replace({ path: `/` })
    }
  }
}
</script>

