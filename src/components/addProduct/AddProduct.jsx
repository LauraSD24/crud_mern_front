import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import "./addProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
  });
  function createNewProduct(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }
  async function saveProduct(e) {
    e.preventDefault();
    try {
      if (
        newProduct.name === "" ||
        newProduct.brand === "" ||
        newProduct.category === "" ||
        newProduct.price === "" ||
        newProduct.stock === ""
      ) {
        toast.error("Hay campos vacíos");

      } else {
        const request = await fetch(
          process.env.REACT_APP_API_BASE_URL + "/add-product",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );
        const dataResponse = await request.json();
        if (dataResponse.response) {
          setNewProduct({
            name: "",
            brand: "",
            category: "",
            price: "",
            stock: "",
          });
          toast.success(dataResponse.msg);
        }else{
          toast.error(dataResponse.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <>
  <Toaster richColors position="top-center" />
    <div className="main">
      <h1 className="title">Agregar producto</h1>
      <form action="" className="form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onInput={(e) => createNewProduct(e)}
          className="input"
          placeholder="Nombre"
        />
        <input
          type="text"
          name="brand"
          value={newProduct.brand}
          onInput={(e) => createNewProduct(e)}
          className="input"
          placeholder="Marca"
        />
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onInput={(e) => createNewProduct(e)}
          className="input"
          placeholder="Categoría"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onInput={(e) => createNewProduct(e)}
          className="input"
          placeholder="Precio"
        />
        <input
          type="number"
          name="stock"
          value={newProduct.stock}
          onInput={(e) => createNewProduct(e)}
          className="input"
          placeholder="Stock"
        />
      <div className="containerBtns">
        <button className="btn" onClick={() => navigate("/")}>
          Volver
        </button>
        <button className="btn" onClick={(e) => saveProduct(e)}>
          Guardar
        </button>
      </div>
      </form>
    </div>
   </>
  );
}

export default AddProduct;
