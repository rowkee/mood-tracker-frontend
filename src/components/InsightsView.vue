<template>
    <NavBar/>
    <h1>The Freudulator</h1>
    <h2>We're sorry but our Freudulator is currently too busy <br> Please Come Back Soon</h2>
    <img src="../assets/freudulator.png" alt="">

</template>
    
<script>
import { decodeCredential } from 'vue3-google-login'
import NavBar from './NavBar.vue'

export default {
    name: "InsightsView",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userName: '',
        lastLogin: Date,
        email: '',
        entries: [],
        componentKey: 0
    }),
    components: {
        NavBar,
    },
    mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
            this.email = userData.email
        } else {
            this.$router.replace({path: `/`})
        }
    },
}

</script>