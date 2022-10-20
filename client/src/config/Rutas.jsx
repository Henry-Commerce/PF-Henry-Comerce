/** @format */

import { Route, Routes } from 'react-router-dom';
import { ProductsDetails } from '../components';
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
  AdminDashboard,
  Team,
  CheckOutSuccess,
  CheckOutFailure,
  CheckOutPending,
  UserDashboard,
  UserConfig,
  AdminTables,
  AdminProfile,
} from '../pages';

export const Rutas = ({ dark }) => {
  return (
    <Routes>
      <Route path='*' element={<Page404 dark={dark} />} />

      <Route path='/login' element={<Login dark={dark} />} />
      <Route path='/register' element={<Register dark={dark} />} />
      <Route path='/shop' element={<Shop dark={dark} />} />

      <Route path='/' element={<Inicio dark={dark} />} />
      <Route path='/news' element={<News dark={dark} />} />
      <Route path='/offers' element={<Offers dark={dark} />} />
      <Route path='/team' element={<Team dark={dark} />} />

      <Route path='/products' element={<Products dark={dark} />} />
      <Route path='/products/:id' element={<ProductsDetails dark={dark} />} />

      <Route path='/faq' element={<FAQ dark={dark} />} />

      <Route path='/admin' element={<AdminDashboard dark={dark} />} />
      <Route path='/admin/add' element={<AddClothing dark={dark} />} />
      <Route path='/admin/users' element={<AdminTables dark={dark} />} />
      <Route path='/admin/profile' element={<AdminProfile dark={dark} />} />

      <Route path='/user' element={<UserDashboard dark={dark} />} />
      <Route path='/user/config' element={<UserConfig dark={dark} />} />

      <Route path='/success' element={<CheckOutSuccess dark={dark} />} />
      <Route path='/failure' element={<CheckOutFailure dark={dark} />} />
      <Route path='/pending' element={<CheckOutPending dark={dark} />} />
    </Routes>
  );
};
