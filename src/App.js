import './styles/App.css'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Task from './pages/Task'
import { Helmet } from 'react-helmet'

function App() {
  return (
    <>
     <Helmet>
        <link rel="icon" type="image/png" href="/icono.png" />
      </Helmet>

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login"/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/projects/:projectId" element={<Project/>} />
          <Route path="/task/:taskId" element={<Task />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App