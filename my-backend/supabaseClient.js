const { createClient } = require("@supabase/supabase-js");
require('dotenv').config(); // Charger les variables d'environnement

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL et SUPABASE_KEY doivent être définies dans le fichier .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
