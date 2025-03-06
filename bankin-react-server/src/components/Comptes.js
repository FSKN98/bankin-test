import React, { useEffect, useState } from 'react';
import Compte from './Compte';
import axios from 'axios';

function Comptes() {
  const [comptes, setComptes] = useState([]);
  const [total_balance, setTotal_balance] = useState("0");

  useEffect(() => {
    // appel au serveur express local qui s'occupe de l'authentification, la récupération et filtre des données
    axios.get('http://localhost:3001/main')
      .then(response => {
        setComptes(response.data.accounts);
        setTotal_balance(response.data.total_balance);  
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des comptes et balances :", error);
      });
  }, []);

  let color = "#000"; 

  if (total_balance < 0) {
    color = "red";
  } else if (total_balance >= 0 && total_balance <= 500) {
    color = "orange";
  } else if (total_balance > 500) {
    color = "green";
  }

  return (
    <div className="comptes-container">
      <h2>Mes comptes</h2>
      <p style={{ color: color }}>Total : {total_balance} €</p>
      <p>Voici le détail de vos comptes :</p>
      <div className="comptes-list">
        {comptes.map((compte, index) => (
          <Compte key={index} name={compte.name} balance={compte.balance} />
        ))}
      </div>
    </div>
  );
}

export default Comptes;
