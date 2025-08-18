const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
