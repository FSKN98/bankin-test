const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
app.use(cors());  // j'ai eu un probleme de cors puisque le localhost:3000 appelait localhost:3001
const PORT = process.env.PORT || 3001;

const BANKIN_BASE_URL = 'https://sync.bankin.com/v2';
const BANKIN_VERSION = '2019-08-22';
const BANKIN_DEVICE = '26ac2fb6-4b1f-4e7c-a35d-aaa40b5c00b5';

// Identifiants donnés (dans le vrai projet, on les récupèrera via un formulaire)
const credentials = {
    email: 'user1@mail.com',
    password: 'a!Strongp#assword1'
};

// pour obtenir le token d'authentification
async function authenticate() {
    const response = await axios.post(`${BANKIN_BASE_URL}/authenticate`, credentials, {
        headers: {
            'Bankin-Version': BANKIN_VERSION,
            'Bankin-Device': BANKIN_DEVICE
        }
    });
    return response.data.access_token;
}

// pour récupérer les comptes avec le token
async function getAccounts(token) {
    const response = await axios.get(`${BANKIN_BASE_URL}/accounts`, {
        headers: {
            'Bankin-Version': BANKIN_VERSION,
            'Bankin-Device': BANKIN_DEVICE,
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.resources; // "resources" contient les comptes
}

// pour arrondir la somme à la centaine supérieure
function arround_hundred(value) {
    return Math.ceil(value / 100) * 100;
}


app.get('/accounts_list', async (req, res) => {
    try {
        const token = await authenticate();
        const accounts = await getAccounts(token);
        res.json({
            accounts: accounts
        });

    } catch (error) {
        console.error('Erreur dans la route /accounts_list:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
    }
});


// route principale /main qui exécute les étapes
app.get('/main', async (req, res) => {
    try {
        //Authentification pour récupérer le token
        const token = await authenticate();

        //Récupération de la liste des comptes
        const accounts = await getAccounts(token);

        // filtre les comptes pour ne garder que name et balance
        const filteredAccounts = accounts.map(account => ({
            name: account.name,
            balance: account.balance
        }));

        // somme totale des soldes
        const totalBalance = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);

        // arrondi à la centaine supérieure
        const roundedSum = arround_hundred(totalBalance);

        // réponse attendue finale
        res.json({
            rounded_sum: roundedSum,
            accounts: filteredAccounts,
            total_balance: totalBalance // bonus pour eviter de faire dans le front le total des balances unes par unes
        });

    } catch (error) {
        console.error('Erreur dans la route /main:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
