<template>
    <NavBar />
    <h1> What's going on compadre? </h1>
    
    <container id="category-life" class="container slider">
        <form>
            <h2>Life Categories</h2>
            <div>
                <label for="customRange3" class="form-label">Work</label>
                <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="life.work">
            </div>
            <div>
                <label for="customRange3" class="form-label">Family</label>
                <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="life.family">
            </div>
            <div>
                <label for="customRange3" class="form-label">Friends</label>
                <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="life.friends">
            </div>
            <div>
                <label for="customRange3" class="form-label">Financial Wellbeing</label>
                <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="life.finances">
            </div>
        </form>
    </container> <br>

    <container id="category-Mind" class="container slider">
        <h2>Mind Categories</h2>
        <div>
            <label for="customRange3" class="form-label">Mood</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="mind.mood">
        </div>
        <div>
            <label for="customRange3" class="form-label">Stress</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="mind.stress">
        </div>
        <div>
            <label for="customRange3" class="form-label">Worry</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="mind.worry">
        </div>
        <div>
            <label for="customRange3" class="form-label">Feeling in Control</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="mind.control">
        </div>
        <div>
            <label for="customRange3" class="form-label">Feeling Supported</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="mind.support">
        </div>
        <div>
            <label for="customRange3" class="form-label">Optimism</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="mind.optimism">
        </div>
    </container> <br>

    <container id="category-Activities" class="container slider">
        <h2>Activity Categories</h2>
        <div>
            <label for="customRange3" class="form-label">Exercise</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="activity.exercise">
        </div>
        <div>
            <label for="customRange3" class="form-label">Bad Habits</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="activity.habits">
        </div>
        <div>
            <label for="customRange3" class="form-label">Alchohol and Other Drugs</label>
            <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" v-model="activity.drugs">
        </div>
    </container> <br>

    <container class="notes slider">
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Anything else you'd like to add?</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="notes"></textarea>
        </div>
    </container> <br>

    <input type="submit" id="submitButton" value="Submit" v-on:click="submitEntry">
</template>



<script>
import { decodeCredential } from 'vue3-google-login'
import NavBar from './NavBar.vue'

export default {
    name: "InputForm",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
        life: {
            work: 5,
            family: 5,
            friends: 5,
            finances: 5
        },
        mind: {
            mood: 5,
            stress: 5,
            worry: 5,
            control: 5,
            support: 5,
            optimism: 5,
        },
        activity: {
            exercise: 5,
            habits: 5,
            drugs: 5,
        },
        notes: '',
        location: {
            name: 'test',
            locatime: 'test'
        },
        current: {
            text: 'test',
            icon: 'test',
            code: 'test'
        }
    }),

    mounted() {
        // this if now should be used on each component to check for being logged in
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
            this.userEmail = userData.email
        } else {
            this.$router.replace({ path: `/` })
        }
    },
    components: {
        NavBar
    },

    methods: {
        submitEntry: function (e) {
            e.preventDefault()
            fetch(`${process.env.VUE_APP_BACKEND_URL}/entry/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.userName,
                    email: this.userEmail,
                    lifeWork: this.life.work,
                    lifeFamily: this.life.family,
                    lifeFriends: this.life.friends,
                    lifeFinances: this.life.finances,
                    mindMood: this.mind.mood,
                    mindStress: this.mind.stress,
                    mindWorry: this.mind.worry,
                    mindControl: this.mind.control,
                    mindOptimism: this.mind.optimism,
                    activityExercise: this.activity.exercise,
                    activityHabits: this.activity.habits,
                    activityDrugs: this.activity.drugs,
                    notes: this.notes
                })
            })
                .then(res => console.log(res.status))
        },
    }
}
</script>

<style>

.slider {
    max-width: 19vw;
}

</style>