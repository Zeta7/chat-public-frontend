import React from 'react';
import MessageBubble from './MessageBubble';

const ChatContainer = ({
  messages,
  name,
  handleReply,
  handleEdit,
  deleteMessage,
  handleLike,
  handleDislike,
  editingMessage,
  editInput,
  setEditInput,
  saveEdit,
  setEditingMessage
}) => {
  return (
    <div className="messages-container">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          msg={msg}
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
      ))}
    </div>
  );
};

export default ChatContainer;
