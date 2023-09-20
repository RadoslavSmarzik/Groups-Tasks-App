import {configureStore} from "@reduxjs/toolkit"
import teamsReducer from '../features/teams/teamsSlice'
import tasksReducer from "../features/tasks/tasksSlice"

export default configureStore({
    reducer: {
        teams: teamsReducer,
        tasks: tasksReducer
    },

})