import { Card, Button, Form, Modal, ModalBody, Alert } from "react-bootstrap"
import "./MemberCard.css"
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const MemberCard = ( {member, team} ) => {
  const [showModal, setShowModal] = useState(false)
  const [activity, setActivity] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const addNewTask = async () => {
      await addDoc(collection(db, "tasks"), {teamId: team.id, userId: member.id, isDone: false, activity: activity})
      setActivity("")
      setShowModal(false)
      setShowAlert(true)
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1500);
  }

  return (
    <>
      <Card className="member-card">
          <Card.Body>
          <Card.Title>{member.name}</Card.Title>
          <Card.Text>
            {member.email}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>Pridat ulohu</Button>
          {showAlert && <Alert className="my-alert" variant="success">Uloha bola uspesne pridana</Alert>}
          </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pridajte Ulohu</Modal.Title>
        </Modal.Header>

        <ModalBody className="modal-body">

          <Form>

            <Form.Group className="input-place">
              <Form.Control type="text" 
                value={member.name}
                disabled
              />
            </Form.Group>

            <Form.Group className="input-place">
              <Form.Control type="text" 
                value={team.name}
                disabled
              />
            </Form.Group>

            <Form.Group className="input-place">
              <Form.Control type="text" 
                placeholder="Aktivita"
                value={activity} 
                onChange={(e) => setActivity(e.target.value)}
                autoFocus
              />
            </Form.Group>

          </Form>
        
        </ModalBody>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              zavriet
            </Button>
            <Button variant="primary" onClick={addNewTask}>Pridat ulohu</Button>
          </Modal.Footer>

        

      </Modal>
    </>
  )
}

export default MemberCard