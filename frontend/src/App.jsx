import { Routes, Route , Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Gyms from './pages/Gyms'
import Offers from './pages/Offers'
import Login from './pages/Login'
import PersonalTrainer from './pages/PersonalTrainer'
import Register from './pages/Register'
import MyProfile from './pages/MyProfile'

import { Logout } from './pages/Logout'
import ProtectedRoute from './utils/ProtectedRoute'
import Progreso from './pages/Progreso'



function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Routes>
          {/* Estas son las rutas que siempre se pueden ver, esté o no logeado el usuario */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Home/>} />

          {/* Estas rutas requieren estar logeado */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/gym" element={<Gyms />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/personal-trainer" element={<PersonalTrainer />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/progreso"  element={<Progreso/>}           />
          </Route>

          {/* En caso de que se equivoque, volver a la normal*/}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
