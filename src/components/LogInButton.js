import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

const LogInButton = () => {
    const navigate = useNavigate()

    const goToLoginPage = () => {
        navigate("/")
    }

  return (
    <Button onClick={goToLoginPage}>Prihlasit</Button>
  )
}

export default LogInButton