import React from 'react';

const NameInput = ({ name, setName }) => {
  return (
    <input
      type="text"
      placeholder="Tu nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="name-input"
    />
  );
};

export default NameInput;
