/** @format */

import { Route, Routes } from "react-router-dom";
import { ProductsDetails } from "../components";
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
} from "../pages";

export const Rutas = () => {
  return (
    <Routes>
      <Route path="*" element={<Page404 />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<Shop />} />

      <Route path="/" element={<Inicio />} />
      <Route path="/news" element={<News />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/team" element={<Team />} />

      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductsDetails />} />

      <Route path="/faq" element={<FAQ />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add" element={<AddClothing />} />

      <Route path="/user/:username" element={<UserDashboard />} />

      <Route path="/user/config/:username" element={<UserConfig />} />

      <Route path="/success" element={<CheckOutSuccess />} />
      <Route path="/failure" element={<CheckOutFailure />} />
      <Route path="/pending" element={<CheckOutPending />} />
    </Routes>
  );
};
