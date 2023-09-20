import "./NewTask.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { db } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const NewTask = () => {
    const [activity, setActivity] = useState("")
    const [selectedTeamId, setSelectedTeamId] = useState("")
    const [selectedUserId, setSelectedUserId] = useState("")
    const teams = useSelector( (state) => state.teams.teams )

    const [showAlert, setShowAlert] = useState(false)

    const submitForm = async (event) => {
        event.preventDefault()

        if(selectedTeamId && selectedUserId && activity){
          const newTask = {teamId: selectedTeamId, userId: selectedUserId, activity, isDone: false}
          await addDoc(collection(db, "tasks"), newTask)
          setActivity("")
          setShowAlert(true)

          const timer = setTimeout(() => {
            setShowAlert(false);
          }, 1500);

        }

    }


  return (
    <Form onSubmit={submitForm} className="form">
      
      <Form.Group className="input-item">
      <Form.Select aria-label="Default select example" onChange={(e) => setSelectedTeamId(e.target.value)}>
        <option>Vyberte tím</option>
        {
          Object.entries(teams).map(([key, value]) => {
            return <option value={key} key={key}>{value.name}</option>
        })
        }
      </Form.Select>
      </Form.Group>

      <Form.Group className="input-item">
      <Form.Select aria-label="Default select example" onChange={(e) => setSelectedUserId(e.target.value)}>
        <option>Vyberte clena timu</option>

        {selectedTeamId && teams[selectedTeamId].members.map( (member) => {
          return <option value={member.id} key={member.id}>{member.name}</option>
        })
          
        }
      </Form.Select>
      </Form.Group>

      <Form.Group className="input-item">
        <Form.Control type="text" 
        placeholder="Aktivita" 
        onChange={(e)=>setActivity(e.target.value)}
        value={activity}
        />
      </Form.Group>

      
      <Button variant="primary" type="submit">Submit</Button>
      {showAlert && <Alert className="my-alert" variant="success">Uloha bola uspesne pridana</Alert>}
      
    </Form>
  )
}

export default NewTask