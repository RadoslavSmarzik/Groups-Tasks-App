import { Card, Button, Modal } from "react-bootstrap"
import "./TeamCard.css"
import AllMembersCards from "./AllMembersCards"
import { FaCopy } from "react-icons/fa";
import { auth, db } from "../firebase/config";
import { arrayRemove, doc, updateDoc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import DeleteTeamButton from "./DeleteTeamButton";

const TeamCard = ( {team} ) => {
    const [showModal, setShowModal] = useState(false)

    const setCopyText = () => {
        navigator.clipboard.writeText(team.id)
    }

    const leaveTeam = async () => {
      const userId = auth.currentUser.uid
      await updateDoc( doc(db, "users", userId), {teams: arrayRemove(team.id)} ) 
      await updateDoc( doc(db, "teams", team.id), {members: arrayRemove(userId)} )
      const q = query(collection(db, "tasks"), where("userId", "==", userId) , where("teamId", "==", team.id));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach( async (oneTask) => {
        await deleteDoc(doc(db, "tasks", oneTask.id))
      })

      closeDialog()

    }

    const openDialog = () => {
      setShowModal(true)
    }

    const closeDialog = () => {
      setShowModal(false)
    }

  
    if (team !== undefined) {
      return (
        <>
        <Card className="team-card" bg="primary" text="white">
          <Card.Body>
            <Card.Title className="text-center team-card-tittle">{team.name} </Card.Title>
            <div className="team-card-text">
                <div className="team-card-first-row">
                    <div className="my-custom-div"><span className="bold-text-team">Kod timu: </span> {team.id} <FaCopy className = "copy-icon" onClick={setCopyText}/></div>
                    <Button variant="danger" onClick={openDialog}>Odist z timu</Button>
                </div>
                <div><span className="bold-text-team">Pocet clenov: </span> { Object.keys(team.members).length }</div>
                <AllMembersCards team = {team}/>
            </div>
          </Card.Body>
          
        </Card>

            <Modal show={showModal} onHide={closeDialog} centered >
            <Modal.Header closeButton>
              <Modal.Title>Odist z timu</Modal.Title>
            </Modal.Header>
            <Modal.Body>Stlacenim POTVRDIT odidete z timu {team.name}, tym sa zmazu aj vsetky vase ulohy v tomto time.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeDialog}>
              zavriet
            </Button>
            <Button variant="primary" onClick={leaveTeam}>
              Potvrdit
            </Button>
            </Modal.Footer>
          </Modal>

        </>
      )
    }
}

export default TeamCard