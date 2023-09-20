import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import AllTasks from './pages/AllTasks'
import OneTask from "./pages/OneTask"
import NewTask from './pages/NewTask'
import Login from "./pages/Login"
import SharedLayout from "./pages/SharedLayout"
import 'bootstrap/dist/css/bootstrap.min.css'
import TeamPage from './pages/TeamPage'
import NewTeam from './pages/NewTeam'



const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/user' element={<SharedLayout/>}>
            <Route index element={<AllTasks/>}/>
            <Route path='/user/one-task/:id' element={<OneTask/>}/>
            <Route path='/user/new-task' element={<NewTask/>}/>
            <Route path='/user/team-page' element={<TeamPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App