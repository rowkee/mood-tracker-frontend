<template>
    <NavBar/>
    <h1>See all your Moodles below</h1>
    <router-link to="/input"> 
        <button type="button" class="btn btn-light" id="addEntry">
            Add Moodle
        </button>
    </router-link>  
    <div class="table" >
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th colspan="5">Life</th>
                    <th colspan="5">Mind</th>
                    <th colspan="3">Activity</th>
                    <th></th>
                    <th colspan="2">Actions</th>

                </tr>
                <tr>
                    <th>Date</th>
                    <th>Work</th>
                    <th>Family</th>
                    <th>Friends</th>
                    <th>Finances</th>
                    <th>Mood</th>
                    <th>Stress</th>
                    <th>Worry</th>
                    <th>Control</th>
                    <th>Optimism</th>
                    <th>Exercise</th>
                    <th>Drugs</th>
                    <th>Habits</th>
                    <th>Notes</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody v-for="entry in entries" :key="entry._id">
                <tr>
                    <td> {{ this.$moment(entry.entryDate).format('L') }} </td>
                    <td> {{ entry.lifeWork }} </td>
                    <td> {{ entry.lifeFamily }} </td>
                    <td> {{ entry.lifeFriends }} </td>
                    <td> {{ entry.lifeFinances }} </td>
                    <td> {{ entry.mindMood }} </td>
                    <td> {{ entry.mindStress }} </td>
                    <td> {{ entry.mindWorry }} </td>
                    <td> {{ entry.mindControl }} </td>
                    <td> {{ entry.mindOptimism }} </td>
                    <td> {{ entry.activityExercise }} </td>
                    <td> {{ entry.activityHabits }} </td>
                    <td> {{ entry.activityDrugs }} </td>
                    <td> {{ entry.notes }} </td>
                    <td><router-link :to="`/entry/edit/${entry._id}`" custom v-slot="{ navigate }"><button class="btn btn-dark" @click="navigate" role="">Edit</button></router-link></td>
                    <td><button class="btn btn-danger" @click="deleteEntry(entry._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
import { decodeCredential } from 'vue3-google-login'
import NavBar from './NavBar.vue'



export default {
    name: "EntriesList",
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
            this.$router.replace({path: ``})
        }
        fetch(`${process.env.BACKEND_URL}/entry/list/${this.email}`)
            .then(response => response.json())
            .then(result => {
                this.entries = result
            })

    },
    methods: {
        deleteEntry: function (entryId) {
            fetch(`${process.env.BACKEND_URL}/entry/list/delete/${entryId}`, {
                method: "DELETE",
            })
                .then(res => {
                    console.log(res.status)
                    // this.$router.replace({ path: `/entry/list/` })
                    this.componentKey+=1
                });
        }
    }
}

</script>