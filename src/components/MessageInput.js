import React from 'react';

const MessageInput = ({ input, setInput, sendMessage }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="message-input"
      />
      <button onClick={sendMessage} className="send-button">Enviar</button>
    </div>
  );
};

export default MessageInput;
