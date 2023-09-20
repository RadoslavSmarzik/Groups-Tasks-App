import "./AllTasks.css"
import { db } from "../firebase/config"
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { doc, deleteDoc } from "firebase/firestore"
import { useSelector } from "react-redux"
import FilterByTeams from "../components/FilterByTeams"

const AllTasks = () => {
  const [check, setCheck] = useState(false)
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()

  const [selectedTeam, setSelectedTeam] = useState("-1")

  const dataArray = useSelector((state) => state.tasks.tasks)

  useEffect( () => {
    setTasks(dataArray)
  }, [dataArray])

  const filterTasks = ( {text_var = text, check_var = check, selectedTeam_var = selectedTeam} ) => {
    const filteredTasks = dataArray.filter( (oneTask) => {
      const {person, activity, isDone, team, teamId} = oneTask

        if (selectedTeam_var !== "-1" && teamId !== selectedTeam_var){
          return false
        } 
      
        if (check_var) {
          return (person.toLowerCase().includes(text_var.toLowerCase()) || activity.toLowerCase().includes(text_var.toLowerCase())
                  || team.toLowerCase().includes(text_var.toLowerCase())) && !isDone
        } else {
          return (person.toLowerCase().includes(text_var.toLowerCase()) || activity.toLowerCase().includes(text_var.toLowerCase())
                  || team.toLowerCase().includes(text_var.toLowerCase())) 
        }

      })
    
    setTasks(filteredTasks)
  }


  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id))
  }

  return (
    <div>
      <div className="filter">

          <Form.Control type="text" 
              className="text-filter"
              placeholder="Hladaj" 
              onChange={ (e) => {
                setText(e.target.value)
                filterTasks( { text_var: e.target.value } )
                
              }}
          />
          <div className="filter-second-row">

          <Form.Check 
            type="switch"
            id="custom-switch"
            label="Iba nesplnene ulohy"
            onChange={(e) => {
              setCheck(e.target.checked)
              filterTasks( { check_var: e.target.checked } )
              
            }}
          />
            <div className = "filter-teams">
              <FilterByTeams setSelectedTeam = {setSelectedTeam} filterTasks={filterTasks} />
            </div>
          </div>

      </div>

      {
        tasks.map( (oneTask) => {
          const {id, person, activity, isDone, team} = oneTask
          return <Card key={id} bg={isDone ? "success" : "primary"} text="white" className="task-card">
            <Card.Body className="task-body">
                  <div className="div-data">{activity}  ({team} - {person})</div>
                  <div className="div-buttons">
                    <Button variant="secondary" onClick={() => navigate("/user/one-task/" + id)} className="all-button">Detaily</Button>
                    <Button variant="danger" onClick={() => deleteTask(id)} className="all-button">Zmaz</Button>
                  </div>
            </Card.Body>
          </Card>
        })
      }
    </div>
  )
}

export default AllTasks