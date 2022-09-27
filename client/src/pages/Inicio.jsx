/** @format */

import { Footer, Product } from '../components';

export const Inicio = () => {
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
