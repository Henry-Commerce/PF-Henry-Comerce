/** @format */

import { ShopItem } from '../components';
import { useEffect, useState } from 'react';
import { MdRemove, MdAdd } from "react-icons/md";
import { useSelector } from 'react-redux';



export const Shop = (product) => {
  const [lsCartProducts, setLsCartProducts] = useState([]);
  const cartProducts  = useSelector((state) => state.cartProducts);
  const [totalAmount, setTotalAmount] = useState(totalPrice());

  useEffect(() => {
    setLsCartProducts(JSON.parse(localStorage.getItem("lsCartProducts")) || []);
      });
  
 /*  const marto = () => {
    const santi = localStorage.getItem("lsCartProducts")
    return (
      santi
      )
    }
    const arr = JSON.parse(marto())
    console.log();
     */

    function totalPrice() {
      let suma = 0;
      JSON.parse(localStorage.getItem("lsCartProducts"))?.forEach((e) => {
        suma += e.count * e.price;
      });
      return suma;
    }  

    const handleAmount = async () => {
      var total = totalAmount;
      const ls = await JSON.parse(localStorage.getItem("lsCartProducts"));
      for (let index = 0; index < ls.length; index++) {
        total = total + ls[index].price * ls[index].count;
      }
      setTotalAmount(total);
    };

    
  return (
    <section className='section is-clipped '>
      <div className='container'>
        <div className='has-background-light p-8 p-20-desktop '>
          <h2 className='title mb-8 mb-20-tablet'>Your cart</h2>
          <div className='columns is-multiline '>
            <div className='column is-12 is-8-widescreen mb-8 mb-0-widescreen'>
              <div
                className='is-hidden-touch columns is-multiline'
                style={{
                  borderBottom: '1px solid grey',
                }}>
                <div className='column is-6'>
                  <h4
                    className='has-text-weight-bold mb-6'
                    style={{
                      fontSize: '16px',
                    }}>
                    Categoria
                  </h4>
                </div>
                <div className='column is-2'>
                  <h4
                    className='has-text-weight-bold mb-6'
                    style={{
                      fontSize: '16px',
                    }}>
                    Price
                  </h4>
                </div>
                <div className='column is-2 '>
                  <h4
                    className='has-text-weight-bold mb-6'
                    style={{
                      fontSize: '16px',
                    }}>
                    Quantity
                  </h4>
                </div>
                <div className='column is-2'>
                  <h4
                    className='has-text-weight-bold mb-6'
                    style={{
                      fontSize: '16px',
                    }}>
                    Subtotal
                  </h4>
                </div>
              </div>
              <div className='mb-auto'>
              {lsCartProducts.length ? (
          lsCartProducts.map((e, i) => (
            <div key={i}>
              <ShopItem
                product={e}
                lsCartProducts={lsCartProducts}
                setLsCartProducts={setLsCartProducts}
                totalPrice={totalPrice}
                handleAmount={handleAmount}
              />
            </div>
          ))
        ) : null}
    </div>
              {/* <div className='columns is-vcentered'>
                <div className='column is-4'>
                  
                </div>
                <div className='column is-5'>
                  <input
                    className='ms-12 input has-text-weight-bold'
                    type='text'
                    placeholder='SUMMER30X'
                  />
                </div>
                <div className='column is-3'>
                  <a className='ms-6 button is-dark is-flex-shrink-0' href='#'>
                    Apply
                  </a>
                </div>
              </div> */}
            </div>

            <div className='column pl-6 pt-6' >
              <div className='has-background-white p-6 p-16-desktop '>
                <h3 className='title is-size-3 mb-6 has-text-centered'>Cart totals</h3>
                
                <div className='mb-6 pt-6 is-flex is-justify-content-space-between is-align-items-center'>
                  <span className='title is-size-5 mb-3 has-text-weight-bold'>
                    Precio total
                  </span>
                  <span className='title is-size-5 mb-0 has-text-weight-bold'>
                  ${totalPrice()}
                  </span>
                </div>
                <a className='button is-primary is-fullwidth' href='#'>
                  Go to Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
