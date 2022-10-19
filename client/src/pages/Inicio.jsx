/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { checkAuth, getClothing } from '../redux/actions';

import { Loading, Pagination, Product } from '../components';
import { Order } from '../components/Order/Order';
import { Filter } from '../components/Filter/Filter';
import { setOrderByPrice } from '../redux/actions';

export const Inicio = ({ dark }) => {
  const dispatch = useDispatch();

  let clothing = useSelector((state) => state.allClothing);
  const notFound = useSelector((state) => state.notFound);
  const Added = useSelector((state) => state.added);
  const [, setOrder] = useState('');

  clothing = clothing.filter((c) => c.show === true);

  // PAGINADO
  const quantyProducts = useSelector((state) => state.allClothing.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage] = useState(12);
  const lastProduct = currentPage * productsPage;
  const firstProduct = lastProduct - productsPage;

  const currentProducts = clothing.slice(firstProduct, lastProduct);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getClothing());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('authenticated')) {
      const session = JSON.parse(localStorage.getItem('authenticated'));
      dispatch(checkAuth(session));
    }
  }, []);

  const handleOrderByPrice = (event) => {
    dispatch(setOrderByPrice(event.target.value));
    setOrder(event.target.value);
  };

  return (
    <>
      {clothing.length > 0 && !notFound && (
        <section
          className={`${
            dark ? 'has-background-black' : 'has-background-light'
          } section is-clipped`}>
          <div>
            <Order handleOrderByPrice={handleOrderByPrice} dark={dark} />
          </div>
          <div className='columns '>
            <div className='column center is-2 has-text-centered'>
              <Filter setCurrentPage={setCurrentPage} dark={dark} />
            </div>
            <div className='column is-10'>
              <div className='mb-20 columns is-multiline'>
                {currentProducts.map((product, index) => {
                  const { show } = product;
                  if (show === true) {
                    return (
                      <Product
                        key={index}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        discount={product.discount}
                        dark={dark}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <Pagination
            productsPage={productsPage}
            clothing={clothing.length}
            paginado={paginado}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* <div className="has-text-centered">
            <a className="button is-primary mt-6" href="#">
              Show More
            </a>
          </div> */}
        </section>
      )}
      {notFound && (
        <div className=''>
          <h1>No clothing found</h1>
        </div>
      )}
      {!notFound && clothing.length === 0 && (
        <div className=''>
          <Loading />
        </div>
      )}
      {/* {$(window).load(function () {
        setInterval(function () {
          $('.loader').fadeOut('slow');
        }, 3000);
      })} */}
    </>
  );
};
