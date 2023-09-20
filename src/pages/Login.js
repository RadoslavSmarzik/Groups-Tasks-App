import "./Login.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"

import { useDispatch } from "react-redux"
import { setTeams } from "../features/teams/teamsSlice"
import { setTasks } from "../features/tasks/tasksSlice"
import { onAuthStateChanged  } from "firebase/auth"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nickName, setNickName] = useState("")

    const dispatch = useDispatch()

    const clearStore = () => {
        dispatch( setTasks([]))
        dispatch( setTeams({}))
    }
    
    
    const signIn = async (event) => {
        event.preventDefault()
        await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users", auth.currentUser.uid), {teams: [], email: email, name: nickName})
        clearStore()
        navigate("/user")
    }

    const loginIn = async (event) => {
        event.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
        clearStore()
        navigate("/user")
    }

    useEffect( () => {
      const unsubscribe = onAuthStateChanged(auth, (user) =>{
        if (user){
          navigate("/user")
        }
      })
  
      return () => unsubscribe()
      
    }, [navigate])

  return (
    <div>
      <Form className="login-form" onSubmit={loginIn}>

        <Form.Group>
          <Form.Control type="email" 
          placeholder="Zadajte prihlasovaci email" 
          onChange={ (e) => setEmail(e.target.value)}
          className="login-input-item"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" 
          placeholder="Zadajte heslo" 
          onChange={ (e) => setPassword(e.target.value)}
          className="login-input-item"
          />
        </Form.Group>

        <Button variant="primary" type="submit">Prihlasit sa</Button>
      </Form>

      <Form className="login-form" onSubmit={signIn}>

        <Form.Group>
          <Form.Control type="email" 
          placeholder="Zadajte prihlasovaci email" 
          onChange={ (e) => setEmail(e.target.value)}
          className="login-input-item"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control type="text" 
          placeholder="Zadajte nickname" 
          onChange={ (e) => setNickName(e.target.value)}
          className="login-input-item"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" 
          placeholder="Zadajte heslo" 
          onChange={ (e) => setPassword(e.target.value)}
          className="login-input-item"
          />
        </Form.Group>

        <Button variant="primary" type="submit">Vytvorit ucet</Button>
      </Form>
    </div>
  )
}

export default Login