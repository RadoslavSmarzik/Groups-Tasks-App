import "./MyNavbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogOutButton from "./LogOutButton"
import { Link } from "react-router-dom";
import LogInButton from "./LogInButton";

const MyNavbar = ({isLoged}) => {
  return (
      <Navbar bg="dark" data-bs-theme="dark" >
        <Container className="nav-container">
          <Nav>
                <Nav.Link as={Link} to="/user" className='link'>Ulohy</Nav.Link>
                <Nav.Link as={Link} to="/user/new-task" className='link'>Nova uloha</Nav.Link>
                <Nav.Link as={Link} to="/user/team-page" className='link'>Moje Timy</Nav.Link>
            </Nav>
          {isLoged ? <LogOutButton/> : <LogInButton/>}
        </Container>
      </Navbar>
  )
}

export default MyNavbar