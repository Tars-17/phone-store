// my-backend/controllers/usersController.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // charger les variables d'environnement

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Récupérer tous les utilisateurs
const getUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);  
};

// Ajouter un utilisateur
const addUser = async (req, res) => {
  const { email, name } = req.body;
  const { data, error } = await supabase.from('users').insert([{ email, name }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

module.exports = { getUsers, addUser }; // ⚠️ Export CommonJS correct
