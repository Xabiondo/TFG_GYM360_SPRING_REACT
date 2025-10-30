import { useState } from 'react';
import './ChatInput.css'

const ChatInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (inputValue.trim() === '') return; // No enviar si está vacío

    onSendMessage(inputValue); // Llama a la función que le pases
    setInputValue(''); // Limpia el input
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="chat-input-field"
      />
     
    </form>
  );
};

export default ChatInput;