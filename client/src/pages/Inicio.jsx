/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { prueba } from '../redux/actions';

import { Product } from '../components';

export const Inicio = () => {
  const dispatch = useDispatch();

  const clothing = useSelector((state) => state.clothing);

  useEffect(() => {
    console.log(clothing);
  }, []);

  return (
    <>
      <section className='section has-background-light is-clipped'>
        <div className='container'>
          <h2 className='title mb-16 mb-24-tablet'>Discover our products</h2>
          <div className='mb-20 columns is-multiline'>
            <Product />
          </div>
          <div className='has-text-centered'>
            <a className='button is-primary' href='#'>
              Show More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
