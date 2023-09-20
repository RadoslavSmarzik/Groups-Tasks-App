import { useEffect, useState } from "react"
import { getDoc, doc, onSnapshot, query, collection, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { auth } from "../firebase/config"
import { useDispatch } from 'react-redux'
import { setTeams } from '../features/teams/teamsSlice'
import { setTasks } from "../features/tasks/tasksSlice"

const FetchDatabase = () => {
    const dispatch = useDispatch()
    const [userTeamsIds, setUserTeamsIds] = useState([])
    const [teamsDictionary, setTeamsDictionary] = useState({})

    useEffect( () => {
        const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser.uid), async (snapDoc) => {
            const userTeamsIds = snapDoc.data().teams
            const teamsDictionary = {}

            for (const teamId of userTeamsIds){
                const teamDoc = await getDoc(doc(db, "teams", teamId))
                const teamMembersIds = teamDoc.data().members
                const nameOfTeam = teamDoc.data().name
                const members = []
        
                for (const memberId of teamMembersIds){
                    const memberDoc = await getDoc(doc(db, "users", memberId))
                    members.push({id:memberId, ...memberDoc.data()})
                }
                teamsDictionary[teamId] = {name: nameOfTeam, members, id:teamId}
            }
            dispatch( setTeams(teamsDictionary) )
            setUserTeamsIds(snapDoc.data().teams)
            setTeamsDictionary(teamsDictionary)
        })

        return () => unsubscribe()

    },[dispatch])


    useEffect( () => {
        const q = query( collection(db, "tasks"), where( "teamId", "in", [...userTeamsIds, "no-empty"]))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksArray = [] 
            querySnapshot.forEach( (doc) => {
                const data = doc.data()
                const teamName = teamsDictionary[data.teamId].name
                const person = getMemberName(data.userId, teamsDictionary[data.teamId])
                tasksArray.push( {id:doc.id, team: teamName, person:person, ...data })
            })
            dispatch(setTasks(tasksArray))
        })
        
        return () => unsubscribe()

    },[userTeamsIds, teamsDictionary, dispatch])


    const getMemberName = (userId, team) => {
      for (const member of team.members){
        if (member.id === userId){
          return member.name
        }
      }
    }

  return (
    <></>
  )
}

export default FetchDatabase