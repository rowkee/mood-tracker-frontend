<template>
    <h1>Login</h1>
    <GoogleLogin :callback="callback" />
</template>


<script>
import { decodeCredential } from 'vue3-google-login'
import 'vue-router';

export default {
    name: "LoginPage",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userName: '',
        lastLogin: Date
    }),

    mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
            this.$router.replace({path: `/home`})          
        }
    },

    methods: {
        callback: function (response) {
            this.isLoggedIn = true
            const userData = decodeCredential(response.credential)
            this.userName = userData.given_name
            this.$cookies.set('user_session', response.credential)
            fetch('${process.env.VUE_APP_BACKEND_URL}', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email
                })
            })
            .then(() => {
                console.log('session saved')
            })
            this.$router.replace({path: `/home`})          
        },
    }
}
</script>