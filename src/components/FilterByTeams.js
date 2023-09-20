import { useSelector } from "react-redux"
import { Form } from "react-bootstrap"


const FilterByTeams = ( {setSelectedTeam, filterTasks}) => {

    const teams = useSelector( (state) => state.teams.teams)

  return (
    
        <Form>
          <Form.Group>
            <Form.Select aria-label="Default select example" 
                        onChange={ (e) => { 
                            setSelectedTeam(e.target.value) 
                            filterTasks( {selectedTeam_var: e.target.value})
                            
                            }}>
              <option value={-1}>Vsetky timy</option>
              {
                Object.entries(teams).map(([key, value]) => {
                  return <option value={key} key={key}>{value.name}</option>
                })
              }
            </Form.Select>
          </Form.Group>
        </Form>
    
  )
}

export default FilterByTeams