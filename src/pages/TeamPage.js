import { Nav, Tab, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import AllMembersCards from "../components/AllMembersCards"
import "./TeamPage.css"
import { useSelector } from "react-redux"
import TeamCard from "../components/TeamCard"
import CreateTeamButton from "../components/CreateTeamButton"

const TeamPage = () => {

    const teams = useSelector((state => state.teams.teams))
    const [teamId, setTeamId] = useState("")

    useEffect( () => {
        setTeamId(Object.keys(teams)[0])
    }, [teams])

  return (
    <div className="team-page">
     <Tab.Container activeKey={teamId}>
        <div className="buttons-and-add">
            <Nav variant="pills">
                {
                    Object.entries(teams).map(([key, value]) => {
                        return <Nav.Item key={key}>
                            <Nav.Link eventKey={key} onClick = { () => setTeamId(key)}>{value.name}</Nav.Link>
                        </Nav.Item>
                    })
                }
            
            </Nav>
            <CreateTeamButton/>
        </div>
    </Tab.Container>
    {teamId && <TeamCard team={teams[teamId]}/>}
    </div>

  )
}

export default TeamPage