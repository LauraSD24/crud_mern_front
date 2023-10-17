import { useNavigate, useParams } from "react-router-dom";
import { ContextProduct } from "../../contexts/ContextProviderProduct";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

function EditProduct() {
  const params = useParams();
  const { listProducts, setListProducts } = useContext(ContextProduct);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
  });
  const navigate = useNavigate();

  const handlerInputEdit = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  async function updateproduct(e) {
    e.preventDefault();
    try {
      if (
        product.name === "" ||
        product.brand === "" ||
        product.category === "" ||
        product.price === "" ||
        product.stock === ""
      ) {
        toast.error("Hay campos vacíos");
      } else {
        const request = await fetch(
          process.env.REACT_APP_API_BASE_URL + "/edit-product/" + params.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        const dataResponse = await request.json();
        console.log(dataResponse);
        if (dataResponse.response) {
          toast.success(dataResponse.msg);
        }else{
            toast.error(dataResponse.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const productFind = listProducts.find(
      (item) => item.id === parseInt(params.id)
    );
    setProduct({ ...productFind });
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="main">
        <h1 className="title">Editar registro</h1>
        <form action="" className="form">
          <input
            onInput={(e) => handlerInputEdit(e)}
            name="name"
            value={product.name}
            type="text"
            placeholder="Nombre"
            className="input"
          />
          <input
            onInput={(e) => handlerInputEdit(e)}
            name="brand"
            value={product.brand}
            type="text"
            placeholder="Marca"
            className="input"
          />
          <input
            onInput={(e) => handlerInputEdit(e)}
            name="category"
            value={product.category}
            type="text"
            placeholder="Categoría"
            className="input"
          />
          <input
            onInput={(e) => handlerInputEdit(e)}
            name="price"
            value={product.price}
            type="number"
            placeholder="Precio"
            className="input"
          />
          <input
            onInput={(e) => handlerInputEdit(e)}
            name="stock"
            value={product.stock}
            type="number"
            placeholder="Stock"
            className="input"
          />
          <div className="containerBtns">
          <button className="btn" onClick={() => navigate("/")}>
            Volver
          </button>
          <button className="btn" onClick={(e) => updateproduct(e)}>
            Guardar
          </button>
        </div>
        </form>
        
      </div>
    </>
  );
}

export default EditProduct;
