import { createSlice } from '@reduxjs/toolkit'

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: {}
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload
    },
    addTeam: (state, action) => {
      const {teamId, members} = action.payload 
      state.teams[teamId] = members
    }
  },
})

export const { setTeams, addTeam } = teamsSlice.actions

export default teamsSlice.reducer