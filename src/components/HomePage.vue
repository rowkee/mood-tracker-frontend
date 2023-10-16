<template> 
    <NavBar/>
    <H1> Welcome to your Moodle {{ userName }} :huggingemoji: </H1>
    <!-- <button type="button" class="btn btn-primary">Add Entry</button> -->
    </template>


<script>

import { decodeCredential } from 'vue3-google-login'
import NavBar from './NavBar.vue'

export default {
    name: "HomePage",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userName: '',
        lastLogin: Date
    }),
    components: {
        NavBar
    },

    mounted() {
        // this if now should be used on each component to check for being logged in
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
        } else {
            this.$router.replace({ path: `/` })
        }
    }
}
</script>