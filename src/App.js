import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import NameInput from './components/NameInput';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import ReplyContainer from './components/ReplyContainer';

const socket = io('https://chat-public-backend.onrender.com:3001', { transports: ['websocket'] });

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat history', (history) => {
      setMessages(history);
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('edit message', (updatedMsg) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMsg.id ? updatedMsg : msg
        )
      );
    });

    socket.on('delete message', (updatedMsg) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMsg.id ? { ...msg, message: updatedMsg.message } : msg
        )
      );
    });

    socket.on('update likes', (updatedMsg) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMsg.id ? updatedMsg : msg
        )
      );
    });

    return () => {
      socket.off('chat history');
      socket.off('chat message');
      socket.off('edit message');
      socket.off('delete message');
      socket.off('update likes');
    };
  }, []);

  const sendMessage = () => {
    if (input && name) {
      const messageObject = {
        name,
        message: input,
        replyTo: replyTo ? { id: replyTo.id, name: replyTo.name, message: replyTo.message } : null,
        likes: 0,
        dislikes: 0,
        likedBy: [],
        dislikedBy: [],
        deleted: false
      };
      socket.emit('chat message', messageObject);
      setInput('');
      setReplyTo(null);
    } else {
      alert('Por favor, ingresa tu nombre antes de enviar un mensaje.');
    }
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const handleEdit = (message) => {
    setEditingMessage(message.id);
    setEditInput(message.message);
  };

  const saveEdit = () => {
    const updatedMessage = {
      ...messages.find(msg => msg.id === editingMessage),
      message: editInput
    };
    socket.emit('edit message', updatedMessage);
    setEditingMessage(null);
    setEditInput('');
  };

  const deleteMessage = (id) => {
    const updatedMessage = {
      ...messages.find(msg => msg.id === id),
      message: 'Mensaje eliminado',
    };
    socket.emit('delete message', updatedMessage);
  };

  const handleLike = (id) => {
    const updatedMessage = { ...messages.find(msg => msg.id === id) };
    updatedMessage.likedBy = updatedMessage.likedBy || [];
    updatedMessage.dislikedBy = updatedMessage.dislikedBy || [];

    if (updatedMessage.likedBy.includes(name)) {
      updatedMessage.likes -= 1;
      updatedMessage.likedBy = updatedMessage.likedBy.filter(user => user !== name);
    } else {
      if (updatedMessage.dislikedBy.includes(name)) {
        updatedMessage.dislikes -= 1;
        updatedMessage.dislikedBy = updatedMessage.dislikedBy.filter(user => user !== name);
      }
      updatedMessage.likes += 1;
      updatedMessage.likedBy.push(name);
    }
    socket.emit('update likes', updatedMessage);
  };

  const handleDislike = (id) => {
    const updatedMessage = { ...messages.find(msg => msg.id === id) };
    updatedMessage.likedBy = updatedMessage.likedBy || [];
    updatedMessage.dislikedBy = updatedMessage.dislikedBy || [];

    if (updatedMessage.dislikedBy.includes(name)) {
      updatedMessage.dislikes -= 1;
      updatedMessage.dislikedBy = updatedMessage.dislikedBy.filter(user => user !== name);
    } else {
      if (updatedMessage.likedBy.includes(name)) {
        updatedMessage.likes -= 1;
        updatedMessage.likedBy = updatedMessage.likedBy.filter(user => user !== name);
      }
      updatedMessage.dislikes += 1;
      updatedMessage.dislikedBy.push(name);
    }
    socket.emit('update likes', updatedMessage);
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  return (
    <div className="chat-container">
      <NameInput name={name} setName={setName} />
      <ChatContainer
        messages={messages}
        name={name}
        handleReply={handleReply}
        handleEdit={handleEdit}
        deleteMessage={deleteMessage}
        handleLike={handleLike}
        handleDislike={handleDislike}
        editingMessage={editingMessage}
        editInput={editInput}
        setEditInput={setEditInput}
        saveEdit={saveEdit}
        setEditingMessage={setEditingMessage}
      />
      {replyTo && <ReplyContainer replyTo={replyTo} cancelReply={cancelReply} />}
      <MessageInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
