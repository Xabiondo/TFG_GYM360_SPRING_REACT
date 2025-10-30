import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Gyms from './pages/Gyms'
import Offers from './pages/Offers'
import Login from './pages/Login'
import PersonalTrainer from './pages/PersonalTrainer'
import Register from './pages/Register'
import MyProfile from './pages/MyProfile'



function App() {
  return (
    <div className="app">

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gym" element={<Gyms />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/personal-trainer' element = {< PersonalTrainer/>}/>
          <Route path='/my-profile' element = {<MyProfile/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
