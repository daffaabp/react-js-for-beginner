import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
