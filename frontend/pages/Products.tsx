import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  in_stock: boolean;
  created_at: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    in_stock: true,
  });

  // GET : récupérer tous les produits depuis le backend
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // POST : ajouter un nouveau produit
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description || null,
        image_url: newProduct.image_url || null,
        in_stock: newProduct.in_stock,
      }),
    });

    const data = await res.json();
    setProducts([...products, data]);
    setNewProduct({ name: "", price: "", description: "", image_url: "", in_stock: true });
  };

  return (
    <div>
      <h1>Nos téléphones</h1>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <h3>{p.name} - ${p.price}</h3>
            {p.description && <p>{p.description}</p>}
            {p.image_url && <img src={p.image_url} alt={p.name} width={150} />}
            <p>{p.in_stock ? "En stock ✅" : "Rupture de stock ❌"}</p>
          </li>
        ))}
      </ul>

      <h2>Ajouter un téléphone</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Nom"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL Image"
          value={newProduct.image_url}
          onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
        />
        <label>
          En stock
          <input
            type="checkbox"
            checked={newProduct.in_stock}
            onChange={(e) => setNewProduct({ ...newProduct, in_stock: e.target.checked })}
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
