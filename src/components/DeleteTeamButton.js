import { Button } from "react-bootstrap"
import { arrayRemove, doc, updateDoc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const DeleteTeamButton = ({team}) => {
    console.log(team)

    const deleteTeamFromUsers = () => {
        const members = team.members

        members.forEach( async oneUser => {
            await updateDoc( doc(db, "users", oneUser.id), {teams: arrayRemove(team.id)} ) 
        })
    }

    const deleteTeamTasks = async () => {
        const q = query(collection(db, "tasks"), where("teamId", "==", team.id));
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach( async (oneTask) => {
            await deleteDoc(doc(db, "tasks", oneTask.id))
        })
    }

    const deleteTeamInDatabase = async () => {
        await deleteDoc(doc(db, "teams", team.id))
    }
    

    const deleteTeam = () => {
        deleteTeamFromUsers()
        deleteTeamTasks()
        deleteTeamInDatabase()
    }

  return (
    <Button variant="danger" style={ {margin: "0 auto"} } onClick={deleteTeam}>Vymaz tim</Button>
  )
}

export default DeleteTeamButton