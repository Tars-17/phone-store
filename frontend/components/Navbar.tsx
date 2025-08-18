import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
      alignItems: "center"
    }}>
      <h2>📱 Boutique Téléphones</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Accueil</Link>
        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>Produits</Link>
      </div>
    </nav>
  );
}
