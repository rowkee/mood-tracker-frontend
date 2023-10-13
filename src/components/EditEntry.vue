<template> 
<NavBar/>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th>Date</th>
                <th>Life - Work</th>
                <th>Life - Family</th>
                <th>Life - Friends</th>
                <th>Life - Finances</th>
                <th>Mind - Mood</th>
                <th>Mind - Stress</th>
                <th>Mind - Worry</th>
                <th>Mind - Control</th>
                <th>Mind - Optimism</th>
                <th>Activity - Exercise</th>
                <th>Activity - Drugs</th>
                <th>Activity - Habits</th>
                <th>Notes</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td> <input type="text" name="entryDate" id="entryDate" placeholder="Entry Date" v-model="entry.entryDate" disabled> </td>
                    <td> <input type="text" name="lifeWork" id="lifeWork" placeholder="Work Score" v-model="entry.lifeWork"> </td>
                    <td> <input type="text" name="lifeFamily" id="lifeFamily" placeholder="Family Score" v-model="entry.lifeFamily"> </td> 
                    <td> <input type="text" name="lifeFriends" id="lifeFriends" placeholder="Friends Score" v-model="entry.lifeFriends"> </td>
                    <td> <input type="text" name="lifeFinances" id="lifeFinances" placeholder="Finances Score" v-model="entry.lifeFinances"> </td>
                    <td> <input type="text" name="mindMood" id="mindMood" placeholder="Mood Score" v-model="entry.mindMood"> </td>
                    <td> <input type="text" name="mindStress" id="mindStress" placeholder="Stress Score" v-model="entry.mindStress"> </td>
                    <td> <input type="text" name="mindWorry" id="mindWorry" placeholder="Worry Score" v-model="entry.mindWorry"> </td>
                    <td> <input type="text" name="mindControl" id="mindControl" placeholder="Control Score" v-model="entry.mindControl"> </td>
                    <td> <input type="text" name="mindOptimism" id="mindOptimism" placeholder="Optimism Score" v-model="entry.mindOptimism"> </td>
                    <td> <input type="text" name="activityExercise" id="activityExercise" placeholder="Exercise Score" v-model="entry.activityExercise"> </td>
                    <td> <input type="text" name="activityHabits" id="activityHabits" placeholder="Bad Habits Score" v-model="entry.activityHabits"> </td>
                    <td> <input type="text" name="activityDrugs" id="activityDrugs" placeholder="Drugs and/or Alcohol Score" v-model="entry.activityDrugs"> </td>
                    <td> <input type="text" name="notes" id="notes" placeholder="Notes" v-model="entry.notes"> </td>
                    <td><button class="btn btn-dark" @click="editEntry">Save</button></td>
                    <td><button class="btn btn-danger" @click="deleteEntry">Delete</button></td>
                </tr>
        </tbody>
    </table>

</template>

<script>
import { decodeCredential } from 'vue3-google-login'
import NavBar from './NavBar.vue'
const API_URL = 'http://localhost:4000/entry/list/edit'
import { useRoute } from 'vue-router';

export default {
    name: "EditEntry",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userName: '',
        email: '',
        lastLogin: Date,
        entry: {},
        id: ''
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
            this.$router.replace({ path: `/login` })
        }
            const route = useRoute()
            fetch(`${API_URL}/${route.params.id}`)
            .then(response => response.json())
            .then (result => {
                this.entry = result
                this.id = route.params.id
            })
        },

    methods: {
        editEntry: function () {
            fetch(`http://localhost:4000/entry/list/edited/${this.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    entryDate: this.entry.entryDate,
                    lifeWork: this.entry.lifeWork,
                    lifeFamily: this.entry.lifeFamily,
                    lifeFriends: this.entry.lifeFriends,
                    lifeFinances: this.entry.lifeFinances,
                    mindMood: this.entry.mindMood,
                    mindStress: this.entry.mindStress,
                    mindWorry: this.entry.mindWorry,
                    mindControl: this.entry.mindControl,
                    mindOptimism: this.entry.mindOptimism,
                    activityExercise: this.entry.activityExercise,
                    activityHabits: this.entry.activityHabits,
                    activityDrugs: this.entry.activityDrugs,
                    notes: this.entry.notes                
                })
            })
            .then(res => {
                console.log(res.status)
                this.$router.replace({path: `/entry/list/`})
            });
        },
        deleteEntry: function () {
            fetch(`http://localhost:4000/entry/list/delete/${this.id}`, {
                    method: "DELETE",
                })
                .then(res => {
                    console.log(res.status)
                    this.$router.replace({path: `/entry/list/`})
                });
            alert('AAAAGGHHH')
            }
    },
    

}
</script>

