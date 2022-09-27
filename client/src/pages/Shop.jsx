/** @format */

import { ShopItem } from '../components';

export const Shop = () => {
  return (
    <section className='section is-clipped'>
      <div className='container'>
        <div className='has-background-light p-8 p-20-desktop'>
          <h2 className='title mb-8 mb-20-tablet'>Your cart</h2>
          <div className='columns is-multiline is-vcentered'>
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
                    Description
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
              <ShopItem />

              <div className='columns is-vcentered'>
                <div className='column is-4'>
                  <span className='is-flex-shrink-0 has-text-weight-bold'>
                    Apply discount code:
                  </span>
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
              </div>
            </div>

            <div className='column is-12 is-4-widescreen'>
              <div className='has-background-white p-6 p-16-desktop'>
                <h3 className='title is-size-3 mb-6'>Cart totals</h3>
                <div
                  className='mb-8 pb-5 is-flex is-justify-content-space-between is-align-items-center'
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                  }}>
                  <span className=''>Subtotal</span>
                  <span className='subtitle has-text-weight-bold'>$89.67</span>
                </div>
                <h4 className='title is-size-5 mb-2'>Shipping</h4>
                <div className='mb-2 is-flex is-justify-content-space-between is-align-items-center'>
                  <span className=''>Next day</span>
                  <span className='subtitle has-text-weight-bold'>$11.00</span>
                </div>
                <div className='mb-6 is-flex is-justify-content-space-between is-align-items-center'>
                  <span className=''>Shipping to United States</span>
                  <span className='subtitle has-text-weight-bold'>-</span>
                </div>
                <div className='mb-10 is-flex is-justify-content-space-between is-align-items-center'>
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
