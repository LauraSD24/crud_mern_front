import { createContext, useState } from "react";

export const ContextProduct = createContext();

function ContextProviderProduct({children}) {
    const [listProducts,setListProducts] = useState([]);
    return(
        <ContextProduct.Provider value={{listProducts,setListProducts}}>
            {children}
        </ContextProduct.Provider>
    )
}  

export default ContextProviderProduct;