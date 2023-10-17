import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ListProducts from '../components/listProducts/ListProducts';
import AddProduct from '../components/addProduct/AddProduct';
import EditProduct from '../components/editProduct/EditProduct';

function RoutesProducts() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<ListProducts/>}></Route>
            <Route path='/add-product' element={<AddProduct/>}></Route>
            <Route path='/edit-product/:id' element={<EditProduct/>}></Route>
            <Route path='*' element={<ListProducts/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesProducts;