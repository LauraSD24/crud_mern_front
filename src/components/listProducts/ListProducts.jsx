import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "./listProduct.css";
import { ContextProduct } from "../../contexts/ContextProviderProduct";

function ListProducts() {
  const navigate = useNavigate();
  const { listProducts, setListProducts } = useContext(ContextProduct);
  const [open, setOpen] = useState(false);

  const deleteProductRequest = (id) => {
    if (!open) {
      toast("¿Está seguro de eliminar el producto?", {
        onAutoClose: () => setOpen(false),
        action: {
          label: "Si",
          onClick: async () => {
            try {
              const request = await fetch(
                process.env.REACT_APP_API_BASE_URL + "/delete-product/" + id,
                {
                  method: "DELETE",
                }
              );
              const dataResponse = await request.json();
              if (dataResponse.response) {
                setListProducts(listProducts.filter((item) => item.id !== id));
                toast.success(dataResponse.msg);
              } else {
                toast.error(dataResponse.msg);
              }
              setOpen(false);
            } catch (error) {
              console.log(error);
            }
          },
        },
        cancel: {
          label: "No",
          onClick: () => setOpen(false),
        },
      });
      setOpen(true);
    }
  };

  

  useEffect(() => {
    async function getAllProducts() {
      try {
        const request = await fetch(
          process.env.REACT_APP_API_BASE_URL + "/get-all-products"
        );
        const response = await request.json();
        setListProducts([...response.data.reverse()]);
      } catch (error) {
        console.log(error);
      }
    }
    getAllProducts();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="main">
        <h1 className="title">Registro de productos</h1>
        <button className="btn" onClick={() => navigate("/add-product")}>
          Agregar
        </button>
        
        <div className="containerList">
        {/* <div className="container_search">
          <input className="input_search" placeholder="Nombre, marca o categoría"/> <button className="btn">Buscar</button>
        </div> */}
          <div className="containerListProducts">
            <div className="titlesProducts">
              <h3 className="item">Nombre</h3>
              <h3 className="item">Marca</h3>
              <h3 className="item">Categoría</h3>
              <h3 className="item">Precio</h3>
              <h3 className="item">Stock</h3>
              <h3 className="item">Acciones</h3>
            </div>
            {listProducts.map((item) => {
              return (
                <div key={item.id} className="product">
                  <p className="item">{item.name}</p>
                  <p className="item">{item.brand}</p>
                  <p className="item">{item.category}</p>
                  <p className="item">${item.price}</p>
                  <p className="item">{item.stock}</p>
                  <div className="item containerIcons">
                    <i
                      className="uil uil-edit icon"
                      onClick={() => navigate("/edit-product/" + item.id)}
                    ></i>
                    <i
                      className="uil uil-trash-alt icon"
                      onClick={() => deleteProductRequest(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProducts;
