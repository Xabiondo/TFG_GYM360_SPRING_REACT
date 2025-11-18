import { useState } from "react";
import ChatInput from "../components/ChatInput";
import Navbar from "../components/Navbar";
import "../pages/PersonalTrainer.css"; // Asegúrate de crear este archivo

const PersonalTrainer = () => {

  const[mensaje , setMensaje] = useState('')
  const[respuestaEntrenador , setRespuestaEntrenador] = useState('')

  const handleInputChange = (e) => {
    setMensaje(e.target.value)

  }

  const handleSubmit = async(e) =>{
    if(mensaje == ''){
      alert("escribe algo")
      return;
    }
    const prompt = JSON.stringify({
      prompt: mensaje
    })

    try{
      const response = await fetch("http://localhost:8080/api/personalTrainer/assesment" , {
        headers:{
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: prompt
      })
      const data = await response.text();
      setRespuestaEntrenador(data)


    }catch (error){
      alert("algo has hecho mal")
    }
  }
  
  return (
    <div className="personal-trainer">
      <Navbar />
      <div className="content">
        <h1 className="ia-trainer">¿En qué puedo ayudarte hoy?</h1>
        <label id="etiqueta"> Dime lo que quieres</label>
        <input type="text" value={mensaje} onChange={handleInputChange}></input>


        <button type="submit" onClick={handleSubmit} >Voy a tener suerte</button>

        {respuestaEntrenador && (
          <div className="respuesta-ia">
            <h3>Entrenador personal dice...</h3>
            <pre>{respuestaEntrenador}</pre>


            </div>
        )}

       

      </div>
    </div>
  );
};

export default PersonalTrainer; 