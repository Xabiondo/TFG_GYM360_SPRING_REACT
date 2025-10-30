import ChatInput from "../components/ChatInput";
import Navbar from "../components/Navbar";
import "../pages/PersonalTrainer.css"; // Asegúrate de crear este archivo

const PersonalTrainer = () => {
  return (
    <div className="personal-trainer">
      <Navbar />
      <div className="content">
        <h1 className="ia-trainer">¿En qué puedo ayudarte hoy?</h1>
        <ChatInput></ChatInput>
       

      </div>
    </div>
  );
};

export default PersonalTrainer; 