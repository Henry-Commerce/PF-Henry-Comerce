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

// <div className='columns is-vcentered is-multiline'>
// <div className='column is-6-desktop is-7-tablet mb-6 mb-0-tablet'>
//   <div className='columns is-vcentered is-multiline'>
//     <div className='column is-4-tablet mb-3'>
//       <div
//         className='is-flex has-background-light is-justify-content-center is-align-items-center'
//         style='width: 96px; height: 128px;'>
//         <img
//           className='image is-fullwidth'
//           style='object-fit: contain;'
//           src='https://moviesshopco.vtexassets.com/arquivos/ids/169080-800-800?v=637608365520970000&width=800&height=800&aspect=true'
//           alt=''
//         />
//       </div>
//     </div>
//     <div className='column is-8'>
//       <h3 className='subtitle mb-2 has-text-weight-bold'>
//         Nike basketball ball
//       </h3>
//       <p className='mb-0 has-text-grey'>
//         Maecenas 0.7 commodo sit
//       </p>
//     </div>
//   </div>
// </div>
// <div className='column is-2 is-hidden-touch'>
//   <p className='subtitle has-text-info mb-0 has-text-weight-bold'>
//     $29.89
//   </p>
//   <span
//     className='has-text-grey'
//     style='text-decoration: line-through;'>
//     $33.69
//   </span>
// </div>
// <div className='column is-2-desktop is-3-tablet'>
//   <div
//     className='px-4 is-inline-flex is-align-items-center has-text-weight-bold'
//     style='border: 1px solid #DBDDE1; border-radius: 8px;'>
//     <button className='button is-ghost has-text-grey p-0'>
//       <svg
//         width='12'
//         height='2'
//         viewBox='0 0 12 2'
//         fill='none'
//         xmlns='http://www.w3.org/2000/svg'>
//         <g opacity='0.35'>
//           <rect
//             x='12'
//             width='2'
//             height='12'
//             transform='rotate(90 12 0)'
//             fill='currentColor'></rect>
//         </g>
//       </svg>
//     </button>
//     <input
//       className='input px-2 py-4 has-text-centered'
//       style='width: 48px; border: none; box-shadow: none;'
//       type='number'
//       placeholder='1'
//     />
//     <button className='button is-ghost has-text-grey p-0'>
//       <svg
//         width='12'
//         height='12'
//         viewBox='0 0 12 12'
//         fill='none'
//         xmlns='http://www.w3.org/2000/svg'>
//         <g opacity='0.35'>
//           <rect
//             x='5'
//             width='2'
//             height='12'
//             fill='currentColor'></rect>
//           <rect
//             x='12'
//             y='5'
//             width='2'
//             height='12'
//             transform='rotate(90 12 5)'
//             fill='currentColor'></rect>
//         </g>
//       </svg>
//     </button>
//   </div>
// </div>
// <div className='column is-2'>
//   <p className='subtitle has-text-info has-text-weight-bold'>
//     $29.89
//   </p>
// </div>
// </div>
