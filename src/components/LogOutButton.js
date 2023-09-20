import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const LogOutButton = () => {

    const navigate = useNavigate()

    const logOut = async () => {
        await signOut(auth)
        navigate("/")
    }

  return (
    <Button onClick={logOut}>Odlasit</Button>
  )
}

export default LogOutButton