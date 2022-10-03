/** @format */

import { Route, Routes } from 'react-router-dom';
import { ProductsDetails } from '../components';
import CreateClothes from '../pages/admin/CreateClothes';
import {
  Page404,
  Login,
  Register,
  Inicio,
  Products,
  News,
  Offers,
  Shop,
  AddClothing,
  FAQ,
} from '../pages';




export const Rutas = () => {
  return (
    <Routes>
      <Route path='*' element={<Page404 />} />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/shop' element={<Shop />} />

      <Route path='/' element={<Inicio />} />
      <Route path='/news' element={<News />} />
      <Route path='/offers' element={<Offers />} />

      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductsDetails />} />

      <Route path='/faq' element={<FAQ />} />

      <Route path='/admin/add' element={<AddClothing />} />
      <Route path="/admin/create" element={<CreateClothes/>}/>
    </Routes>
  );
};
