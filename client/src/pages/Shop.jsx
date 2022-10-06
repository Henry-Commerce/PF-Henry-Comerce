/** @format */

import { ShopItem } from '../components';
import { useEffect } from 'react';
import { MdRemove, MdAdd } from "react-icons/md";



export const Shop = () => {
  
  
  const marto = () => {
    const santi = localStorage.getItem("lsCartProducts")
    
    
    return (
      santi
      )
    }
    const arr = JSON.parse(marto())
    
    
    const pricesgral = arr.pricee
    console.log(arr);
    

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
              {arr ? arr.map((e) => (
      <div className='mb-3-tablet mb-auto columns is-vcentered is-multiline' style={{
        borderBottom: '1px solid grey',
      }}>
        <div className='column is-6-desktop is-7-tablet mb-0-tablet'>
          <div className='columns is-vcentered is-multiline'>
            <div className='column is-4 mb-3'>
              <div
                className='is-flex has-background-light is-justify-content-center is-align-items-center'
                style={{
                  width: '96px',
                  height: '128px',
                }}>
                  
                    <div>
                <img
                  className='image is-fullwidth'
                  style={{
                    objectFit: 'cover',
                  }}
                  src={e.image}
                  alt=''
                />
                </div>
                
              </div>
            </div>
            <div className='column is-8'>
              <h3 className='subtitle  has-text-weight-bold'>
                {e.name}
              </h3>
              <p className='mb-0 has-text-grey has-text-left'>{e.categoria}</p>
              <p className='mb-0 has-text-grey has-text-left'>{e.size}</p>
            </div>
          </div>
        </div>
        <div className='column is-2 is-hidden-touch'>
          <p className='subtitle has-text-info mb-2 has-text-weight-bold'>
           ${e.price}
          </p>
        
        </div>
        <div className='column is-2-desktop is-3-tablet pl-0'>
          <div
            className='is-inline-flex is-align-items-center has-text-weight-bold pl-1'
            style={{
              border: '1px solid #DBDDE1',
              borderRadius: '8px',
            }}>
            <button className='button has-text-black is-ghost '>
              <MdRemove />
            </button>
            <button  className='input has-text-centered'>{e.count}</button>
              
            <button className='button has-text-black is-ghost'>
              <MdAdd />
            </button>
          </div>
        </div>
        <div className='column is-2'>
          <p className='subtitle has-text-info has-text-weight-bold pl-4 pb-2'>${e.pricee}</p>
        </div>
      </div>
    )) : null}
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
                <h3 className='title is-size-3 mb-6'>Cart totals</h3>
                
                <div className='mb-6 pt-6 is-flex is-justify-content-space-between is-align-items-center'>
                  <span className='title is-size-5 mb-3 has-text-weight-bold'>
                    Order total
                  </span>
                  <span className='title is-size-5 mb-0 has-text-weight-bold'>
                    $100.67
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
