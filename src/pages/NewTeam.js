import { addDoc, getDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { auth } from "../firebase/config"
import { Container, Button, Form } from "react-bootstrap"
import { useState } from "react"
import "./NewTeam.css"
import CreateTeamButton from "../components/CreateTeamButton"

const NewTeam = () => {
    const [teamFromInput, setTeamFromInput] = useState("")
    const [newTeamCode, setNewTeamCode] = useState("")
    const [newTeamName, setNewTeamName] = useState("")

    const createTeam = async () => {
        const docRef = await addDoc(collection(db, "teams"), {members: [], name: newTeamName})
        addToTeam(docRef.id)
        setNewTeamCode(docRef.id)
    }

    const addToTeam = async (teamId) => {
        const docSnap = await getDoc(doc(db, "teams", teamId))
        const result = docSnap.data().members
        await updateDoc(doc(db, "teams", teamId), {members: [...result, auth.currentUser.uid]})

        const uid = auth.currentUser.uid
        const documentSnapshot = await getDoc(doc(db, "users", uid))
        const userTeams =  documentSnapshot.data().teams
        await updateDoc(doc(db, "users", uid), {teams: [...userTeams, teamId]})
    }

  return (
    <div className="new-team">

        <CreateTeamButton></CreateTeamButton>

        {/* <Container>
            <Form>
                <Form.Group className="input-item">
                    <Form.Control type="text" 
                        placeholder="nazov noveho timu"
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="input-team-code"
                        value={newTeamName}
                    />
                    <Button onClick={createTeam}>Vytvor tim</Button>
                    <p>Kód nového tímu: {newTeamCode}</p>
                </Form.Group>
            </Form>
            
            <Form>
                <Form.Group className="input-item">
                    <h2>Pridaj sa do tímu</h2>
                    <Form.Control type="text" 
                        placeholder="kod timu"
                        onChange={(e) => setTeamFromInput(e.target.value)}
                        className="input-team-code"
                    />
                    <Button onClick={() => addToTeam(teamFromInput)}>Pridat do timu</Button>
                </Form.Group>
            </Form>
        </Container> */}
    
    </div>
  )
}

export default NewTeam