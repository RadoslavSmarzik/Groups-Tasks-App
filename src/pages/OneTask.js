import "./OneTask.css"
import { db } from "../firebase/config"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { useSelector } from "react-redux"

const OneTask = () => {
  const teamsDictionary = useSelector((state) => state.teams.teams)
  const id = useParams().id
  const [task, setTask] = useState("")

  const [teamName, setTeamName] = useState("")
  const [userName, setUserName] = useState("")

  useEffect( () => {
    if (task && Object.keys(teamsDictionary).length > 0){
      setTeamName(teamsDictionary[task.teamId].name)
      const user = getUserFromTeamById(task.userId, teamsDictionary[task.teamId].members)
      setUserName(user.name)
    }
    
  }, [task, teamsDictionary])

  const getUserFromTeamById = (userId, team) => {
    for( const member of team ){
      if (member.id === userId){
        return member
      }
    }
  }

  useEffect( () => {
     const unsubscripe = onSnapshot(doc(db, "tasks", id), (doc) => {
       setTask(doc.data())
     })

    return () => unsubscripe()

  }, [id])

  const changeIsDoneInDatabase = () => {
    updateDoc(doc(db, "tasks", id), {"isDone": !task.isDone})
  }

  return (
    <div>
      {task && teamName && userName &&
      <Card bg={task.isDone ? "success" : "primary"} className="one-task-card" text="white">
      <Card.Body>
        <Card.Text><span className="bold">Uloha:</span> {task.activity}</Card.Text>
        <Card.Text><span className="bold">Kto:</span> {userName}</Card.Text>
        <Card.Text><span className="bold">Tim:</span> {teamName}</Card.Text>
        <Card.Text><span className="bold">Splnene:</span> { task.isDone ? "Ano" : "Nie" }</Card.Text>
        <Button variant={task.isDone ? "danger" : "success"} onClick={changeIsDoneInDatabase}> 
          {task.isDone ? "Nastav na este nesplene" : "Nastav na splene"} 
        </Button>
      </Card.Body>
    </Card>
    }
    </div>
  )
}

export default OneTask
