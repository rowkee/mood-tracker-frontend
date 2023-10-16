import { createWebHistory, createRouter } from 'vue-router'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import InputForm from '../components/InputForm'
import EntriesList from '../components/EntriesList'
import EditEntry from '../components/EditEntry'
import TrendsView from '../components/TrendsView'
import InsightsView from '../components/InsightsView'

const routes = [
    {
        name: 'LoginPage',
        path: '/',
        component: LoginPage
    },
    {
        name: 'HomePage',
        path: '/home',
        component: HomePage
    },
    {
        name: 'InputForm',
        path: '/input',
        component: InputForm
    },
    {
        name: 'EntriesList',
        path: '/entry/list',
        component: EntriesList
    },
    {
        name: 'EditEntry',
        path: '/entry/edit/:id',
        component: EditEntry
    },
    {
        name: 'TrendsView',
        path: '/trends',
        component: TrendsView
    },
    {
        name: 'InsightsView',
        path: '/insights',
        component: InsightsView
    },

]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router