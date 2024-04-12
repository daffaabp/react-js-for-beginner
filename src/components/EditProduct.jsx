import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // untuk memanggil function getProductById saat halaman di-render pertama kali
  useEffect(() => {
    getProductById();
  }, []);

  // method untuk mengambil data produk berdasarkan ID dari API
  const getProductById = async () => {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    setTitle(data.title);
    setPrice(data.price);
  };

  // Validasi inputan
  const validate = () => {
    let tempErrors = {};
    if (title.length < 5) {
      tempErrors.title = "Judul harus memiliki panjang minimal 5 karakter";
    }
    if (title.length > 10) {
      tempErrors.title = "Judul tidak boleh lebih dari 10 karakter";
    }
    if (!/^\d+$/.test(price)) {
      tempErrors.price = "Harga harus berupa angka";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setPrice(value);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const product = { title, price }; // Menghapus id dari objek produk karena id tidak perlu di-update
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={updateProduct}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Judul"
            />
            {errors.title && <p className="help is-danger">{errors.title}</p>}
          </div>
        </div>

        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              value={price}
              onChange={handlePriceChange}
              type="text"
              placeholder="Harga"
            />
            {errors.price && <p className="help is-danger">{errors.price}</p>}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Update</button>
          </div>
        </div>
        <p>
          {title} - {price}
        </p>
      </form>
    </div>
  );
};

export default EditProduct;
