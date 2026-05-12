import { Routes, Route , Navigate } from 'react-router-dom'

import Gyms from './pages/Gyms'
import Offers from './pages/Offers'
import Login from './pages/Login'
import PersonalTrainer from './pages/PersonalTrainer'
import Register from './pages/Register'
import MyProfile from './pages/MyProfile'


import { Logout } from './pages/Logout'
import ProtectedRoute from './utils/ProtectedRoute'
import Progreso from './pages/Progreso'
import GymDetails from './pages/GymDetails'
import Nutricion from './pages/Nutricion'



function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Nutricion />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/gym" element={<Gyms />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/personal-trainer" element={<PersonalTrainer />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/progreso"  element={<Progreso/>}           />
            <Route path="/gym/:id" element={<GymDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
