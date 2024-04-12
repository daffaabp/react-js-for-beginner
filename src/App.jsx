import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [title, setTitle] = useState("Welcome to My App");
  const [age, setAge] = useState(200);
  const [products, setProducts] = useState([
    { id: 1, title: "Product 1", price: 500 },
    { id: 2, title: "Product 2", price: 1000 },
    { id: 3, title: "Product 3", price: 1500 },
    { id: 4, title: "Product 4", price: 2000 },
    { id: 5, title: "Product 5", price: 2500 },
    { id: 6, title: "Product 6", price: 3000 },
  ]);

  return (
    <>
      <div>
        <Header />
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title} - {product.price}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
