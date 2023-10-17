<template>
    <NavBar/>
    <h1>Trends that (might) Effect Your Happiness</h1>
    <label for="weather">Weather</label>
    <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>Date</th>
                    <th>Weather Code</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody v-for="entry in entries" :key="entry._id">
                <tr>
                    <td> {{ this.$moment(entry.locationLocaltime).format('L') }} </td>
                    <td> {{ entry.currentConditionText }} </td>
                    <td> <img :src="entry.currentIcon" alt="Weather Icon" /> </td>
                </tr>
            </tbody>
    </table>

</template>
    
<script>
import { decodeCredential } from 'vue3-google-login'
import NavBar from './NavBar.vue'

export default {
    name: "TrendsView",
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
        fetch(`${process.env.VUE_APP_BACKEND_URL}/weather`)
            .then(response => response.json())
            .then(result => {
                this.entries = result
            })
 
    },
}

</script>

