import React from 'react';

const ReplyContainer = ({ replyTo, cancelReply }) => {
  return (
    <div className="reply-container">
      <div className='reply-content'>
        <strong>{replyTo.name}: </strong>
        <span>{replyTo.message}</span>
      </div>
      <button onClick={cancelReply}>X</button>
    </div>
  );
};

export default ReplyContainer;
