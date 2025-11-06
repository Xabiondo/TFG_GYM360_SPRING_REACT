
import React, { useState } from 'react';    
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const GymCalendar = () =>{
    const [date , setDate] = useState(new Date());

    const handleDateClick = (value) =>{
        setDate(value);
        console.log("fecha seleccionada = " , value)
    }

     return (
    <div className="gym-calendar">
      <h2>Calendario de Asistencia al Gimnasio</h2>
      <Calendar onChange={handleDateClick} value={date} />
      <p>Fecha seleccionada: {date.toDateString()}</p>
    </div>
  );

}

export default GymCalendar