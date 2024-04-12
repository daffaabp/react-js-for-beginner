import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
   const [title, setTitle] = useState('');
   const [price, setPrice] = useState('');
   const [lastId, setLastId] = useState(null); // Mengubah nilai default menjadi null
   const [errors, setErrors] = useState({});
   const navigate = useNavigate();

   useEffect(() => {
      const fetchLastId = async () => {
         const response = await fetch('http://localhost:3000/products');
         const products = await response.json();
         const lastProduct = products[products.length - 1];
         setLastId(lastProduct ? parseInt(lastProduct.id) : null); // Mengubah nilai default menjadi null jika tidak ada produk
      };
      fetchLastId();
   }, []);

   const validate = () => {
      let tempErrors = {};
      if (title.length < 5) {
         tempErrors.title = "Judul harus memiliki panjang minimal 5 karakter";
      }
      if (title.length > 10) {
         tempErrors.title = "Judul tidak boleh lebih dari 10 karakter";
      }
      if (!(/^\d+$/.test(price))) {
         tempErrors.price = "Harga harus berupa angka";
      }
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
   }

   const handlePriceChange = (e) => {
      const value = e.target.value;
      if (value === '' || /^\d+$/.test(value)) {
         setPrice(value);
      }
   }

   const saveProduct = async (e) => {
      e.preventDefault();
      if (!validate()) return;
      const id = lastId !== null ? lastId + 1 : 1; // Jika lastId null, berarti belum ada produk, sehingga id dimulai dari 1
      const product = { id, title, price };
      await fetch('http://localhost:3000/products', {
         method: 'POST',
         body: JSON.stringify(product),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      navigate("/");
   }

  return (
    <div>
      <form onSubmit={saveProduct}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Judul" />
            {errors.title && <p className="help is-danger">{errors.title}</p>}
          </div>
        </div>

        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input className="input" value={price} onChange={handlePriceChange} type="text" placeholder="Harga" />
            {errors.price && <p className="help is-danger">{errors.price}</p>}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Save</button>
          </div>
        </div>
        <p>{title} - {price}</p>
      </form>
    </div>
  );
};

export default AddProduct;
