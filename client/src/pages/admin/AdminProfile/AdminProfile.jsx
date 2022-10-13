/** @format */

import { AdminNav } from '../../../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('authenticated')) {
      const { authenticated, isAdmin } = JSON.parse(
        localStorage.getItem('authenticated')
      );
      if (authenticated) {
        if (isAdmin === false) {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className='wrapper'>
      <div className='columns'>
        <AdminNav />
        <main className='column main'> Hola </main>
      </div>
    </div>
  );
};
