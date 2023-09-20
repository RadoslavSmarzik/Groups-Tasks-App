import { Button, Dropdown, Modal, Form, DropdownButton, ButtonGroup, Alert } from "react-bootstrap"
import { useState } from "react"
import "./CreateTeamButton.css"
import { addDoc, getDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { auth } from "../firebase/config"
import { FaRegCopy } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5"


const CreateTeamButton = () => {
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
    const [newTeamName, setNewTeamName] = useState("")
    const [newTeamCode, setNewTeamCode] = useState("")
    const [showAdModal, setShowAdModal] = useState(false)
    const [teamFromInput, setTeamFromInput] = useState("")
    const [addTeamName, setAddTeamName] = useState("")

    const createTeam = async (event) => {
        event.preventDefault()
        const docRef = await addDoc(collection(db, "teams"), {members: [], name: newTeamName})
        addToTeam(docRef.id)
        setNewTeamCode(docRef.id)
    }

    const addToTeam = async (teamId) => {
        const docSnap = await getDoc(doc(db, "teams", teamId))
        const result = docSnap.data().members
        setAddTeamName(docSnap.data().name)
        await updateDoc(doc(db, "teams", teamId), {members: [...result, auth.currentUser.uid]})

        const uid = auth.currentUser.uid
        const documentSnapshot = await getDoc(doc(db, "users", uid))
        const userTeams =  documentSnapshot.data().teams
        await updateDoc(doc(db, "users", uid), {teams: [...userTeams, teamId]})
    }

    const closeCreateTeamModal = () => {
        setShowCreateTeamModal(false)
        setNewTeamCode("")
        setNewTeamName("")
        setAddTeamName("")
    }

    const closeAdModal = () => {
        setShowAdModal(false)
        setAddTeamName("")
    }

    const setCopyText = () => {
        navigator.clipboard.writeText(newTeamCode)
    }

 
  return (
    <>

    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="team-add-button">
        <IoAddCircleOutline className="house-icon"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1" onClick = { () => setShowCreateTeamModal(true) }>Vytvor novy tim</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick = { () => setShowAdModal(true) }>Pridaj sa do timu</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Modal show={showCreateTeamModal} onHide={ closeCreateTeamModal } centered >

            <Modal.Header closeButton>
              { newTeamCode ? "" : 
              <Modal.Title>Vytvor novy tim</Modal.Title>
              }
              </Modal.Header>

            <Modal.Body>

            <Form onSubmit={ (e) => e.preventDefault() }>
                <Form.Group className="input-item">
                    {
                    newTeamCode ? <div> <p>Tim {newTeamName} uspesne vytvoreny </p>  <div><span className="bold-text-team">Kod timu: </span> {newTeamCode} <FaRegCopy className = "copy-icon" onClick={setCopyText}/></div> </div> :
                    <Form.Control type="text" 
                        placeholder="nazov noveho timu"
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="input-team-code"
                        value={newTeamName}
                    />
                    
                    }
                </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ closeCreateTeamModal }>
              zavriet
            </Button>

            {newTeamCode ? "" : 
            <Button variant="primary" onClick={createTeam}  disabled = { newTeamCode }>
              Vytvor
            </Button>
            }
            </Modal.Footer>

    </Modal>

    <Modal show={showAdModal} onHide={ closeAdModal } centered >
            <Modal.Header closeButton>
              {addTeamName ? "" :
              <Modal.Title>Pridaj sa do timu</Modal.Title>
              }
            </Modal.Header>
            <Modal.Body>

            {addTeamName ? <p>Uspesne pridany do timu {addTeamName}</p>:
            <Form onSubmit={ (e) => e.preventDefault() }>
                <Form.Group className="input-item">
                    <Form.Control type="text" 
                        placeholder="kod timu"
                        onChange={(e) => setTeamFromInput(e.target.value)}
                        className="input-team-code"
                    />
                    
                </Form.Group>
            </Form>
            }

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ closeAdModal }>
              zavriet
            </Button>
            { addTeamName ? "" : 
            <Button variant="primary" onClick={ () => addToTeam(teamFromInput)} disabled = {addTeamName}>
              Pridaj
            </Button>
            }
            </Modal.Footer>

    </Modal>

    </>
    
  )
}

export default CreateTeamButton