import React from 'react';

function Compte({ name, balance }) {
  return (
    <div className="compte">
      <span>{name}</span>
      <span>{balance}€</span>
    </div>
  );
}

export default Compte;
