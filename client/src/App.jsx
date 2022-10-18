/** @format */
import { useState } from 'react';
import { ConfigButton, Nav } from './components';
import { Rutas } from './config/Rutas';

export const App = () => {
  const [dark, setDark] = useState(false);
  return (
    <>
      <Nav />
      <ConfigButton dark={dark} setDark={setDark} />
      <Rutas />
    </>
  );
};
