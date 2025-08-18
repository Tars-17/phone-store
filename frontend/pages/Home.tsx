import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  in_stock: boolean;
  created_at: string;
  isFeatured?: boolean; // si plus tard tu ajoutes cette colonne
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  // GET : récupérer les produits depuis le backend
  useEffect(() => {
  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error("Fetch error:", err));
}, []);


  // Produits en stock pour mettre en avant
  const featuredProducts = products.filter(p => p.in_stock);

  return (
    <div>
      <header>
        <h1>Bienvenue sur notre boutique de téléphones 📱</h1>
        <p>Découvrez nos derniers modèles et promotions !</p>
      </header>

      <section>
        <h2>Produits en stock</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {featuredProducts.map((p) => (
            <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              {p.image_url && <img src={p.image_url} alt={p.name} width={180} />}
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              {p.description && <p>{p.description}</p>}
              <p>{p.in_stock ? "En stock ✅" : "Rupture de stock ❌"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
  return <h1>Test</h1>;
}
