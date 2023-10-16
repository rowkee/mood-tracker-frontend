<template>
    <h1>Login page</h1>
    <div v-if="isLoggedIn">
        <h2>Hello {{ userName }}</h2>
        <button class='btn btn-primary' @click="handleLogOut">Log Out</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
</template>


<script>
import { decodeCredential, googleLogout } from 'vue3-google-login'
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
            this.$router.replace({path: `/entry/list/`})          
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
            this.$router.replace({path: `/entry/list`})          
        },
        handleLogOut: function () {
            googleLogout()
            this.$cookies.remove('user_session')
            this.isLoggedIn = false
        }
    }
}
</script>