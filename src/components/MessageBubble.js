import React from 'react';

const MessageBubble = ({
  msg,
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
    <div className={`message-bubble ${msg.name === name ? 'my-message' : 'other-message'}`}>
      {msg.replyTo && (
        <div className="replied-message">
          <strong>{msg.replyTo.name}: </strong>
          <p>{msg.replyTo.message}</p>
        </div>
      )}
      {editingMessage === msg.id ? (
        <div className='content-edit-message'>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="edit-input"
          />
          <button onClick={saveEdit} className="save-button">Guardar</button>
          <button onClick={() => setEditingMessage(null)} className="cancel-button">Cancelar</button>
        </div>
      ) : (
        <div>
          <div className='message-view'>
            <strong>{msg.name}: </strong>
            <p>{msg.deleted ? <em>{msg.message}</em> : msg.message}</p>
          </div>
          {!msg.deleted && (
            <div className="message-actions">
              <span className="like-dislike">
                <button onClick={() => handleLike(msg.id)} className="like-button">
                  👍 {msg.likes}
                </button>
                <button onClick={() => handleDislike(msg.id)} className="dislike-button">
                  👎 {msg.dislikes}
                </button>
              </span>
              <div className="menu">
                <button className="menu-button">⋮</button>
                <div className="menu-content">
                  <button onClick={() => handleReply(msg)}>Responder</button>
                  {msg.name === name && (
                    <>
                      <button onClick={() => handleEdit(msg)}>Editar</button>
                      <button onClick={() => deleteMessage(msg.id)}>Eliminar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
