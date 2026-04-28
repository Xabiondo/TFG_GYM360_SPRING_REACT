import React from 'react';
import Navbar from '../components/Navbar';
import './Progreso.css'; 

const Progreso = () => {

  const stats = {
    workoutsThisMonth: 12,
    currentWeight: 78.5,
    streak: 5
  };

  const historyData = [
    { id: 1, date: "28 Abr", exercise: "Press de Banca", weight: "80 kg", reps: "4 x 8" },
    { id: 2, date: "26 Abr", exercise: "Sentadilla Libre", weight: "100 kg", reps: "4 x 10" },
    { id: 3, date: "24 Abr", exercise: "Peso Muerto", weight: "120 kg", reps: "3 x 5" },
    { id: 4, date: "22 Abr", exercise: "Dominadas", weight: "Corporal", reps: "4 x 12" },
    { id: 5, date: "20 Abr", exercise: "Press Militar", weight: "50 kg", reps: "3 x 10" },
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="progress-container">
        <header className="offers-header">
          <h1>MI <span className="text-gradient">PROGRESO</span></h1>
          <p>Rastrea tus marcas y aplasta tus objetivos.</p>
        </header>


        <div className="profile-grid">

          <div className="profile-card">
            <div className="avatar-circle">🏆</div>
            <div className="user-role">Nivel Avanzado</div>
            <div className="profile-info">
              <h2>Tus Marcas</h2>
              <p className="user-email">Mantén el ritmo</p>
            </div>

            <div className="stats-row">
              <div className="stat">
                <span className="stat-val">{stats.workoutsThisMonth}</span>
                <span className="stat-label">Entrenos</span>
              </div>
              <div className="stat">
                <span className="stat-val">{stats.currentWeight}</span>
                <span className="stat-label">Peso (Kg)</span>
              </div>
              <div className="stat">
                <span className="stat-val">🔥 {stats.streak}</span>
                <span className="stat-label">Racha</span>
              </div>
            </div>
          </div>


          <div className="calendar-container-card">
            <div className="card-header-row">
              <h2>Últimos Registros</h2>
              <span className="badge-info">Abril 2026</span>
            </div>

            <div className="history-list">
              {historyData.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-date">{item.date}</div>
                  <div className="history-details">
                    <span className="history-exercise">{item.exercise}</span>
                    <span className="history-reps">{item.reps}</span>
                  </div>
                  <div className="history-weight">{item.weight}</div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progreso;