import supabase from '../supabaseClient.js';

// GET /products
export const getProducts = async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// POST /products
export const addProduct = async (req, res) => {
  const { name, description, price, image_url, in_stock } = req.body;

  const { data, error } = await supabase
    .from('products')
    .insert([{
      name,
      description: description || null,
      price,
      image_url: image_url || null,
      in_stock: in_stock ?? true,
    }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

export default { getProducts, addProduct };
