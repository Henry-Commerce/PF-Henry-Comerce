/** @format */

import React from 'react';
import Popup from 'reactjs-popup';
import './CheckOut.scss';

export const Checkout = ({ product }) => {
  const mercadopago = new MercadoPago(
    'TEST-adb4941b-1e6a-47a4-8d11-61da2991b54e',
    //contra mi voluntad
    {
      locale: 'es-CO', // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    }
  );

  const handleClick = () => {
    const token = JSON.parse(localStorage.getItem('authenticated')).token;
    const lsCartProducts = JSON.parse(localStorage.getItem('lsCartProducts'));
    const email = JSON.parse(localStorage.getItem('authenticated')).email;
    const body = {
      email,
      lsCartProducts,
    };
    fetch('https://pfapi.vercel.app/api/checkout/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        createCheckoutButton(preference.id);
      })
      .catch((error) => {
        alert('Unexpected error');
        console.log('CheckOut', error);
      });
  };

  function createCheckoutButton(preferenceId) {
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: '#button-checkout',
        label: 'Pagar con Mercado Pago',
      },
    });
  }

  return (
    <Popup
      className='epa is-marginless'
      trigger={
        <section>
          <button
            className='button is-primary is-fullwidth'
            onClick={() => handleClick()}>
            Go to Checkout
          </button>
        </section>
      }
      modal
      nested>
      {() => (
        <div className='box width'>
          <div className='columns fileee is-centered bt'>
            <div className='column is-3 fileeee bb'>
              <h1 className='has-text-weight-bold mt-4 mb-4 ml-6 mr-6 has-text-centered '>
                Producto
              </h1>
            </div>
            <div className='column is-3 fileeee'>
              <h1 className='has-text-weight-bold mt-4 mb-4 ml-6 mr-6 has-text-centered'>
                Nombre
              </h1>
            </div>
            <div className='column is-2 fileeee'>
              <h1 className='has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered'>
                Precio
              </h1>
            </div>
            <div className='column is-2 fileeee'>
              <h1 className='has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered'>
                Cantidad
              </h1>
            </div>
            <div className='column is-2 fileeee'>
              <h1 className='has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered'>
                Talla
              </h1>
            </div>
          </div>

          {product?.map((item, index) => (
            <div className='columns fileee is-centered bt' key={index}>
              <div className='column is-3 fileeee bb'>
                <img
                  className=''
                  src={item.image}
                  alt=''
                  style={{ width: '88px' }}
                />
              </div>
              <div className='column is-3 fileeee'>
                <h1 className='has-text-weight-bold ml-6 mr-6 has-text-centered'>
                  {item.name}
                </h1>
              </div>
              <div className='column is-2 fileeee'>
                <h1 className='has-text-weight-bold  ml-6 mr-6 has-text-centered'>
                  ${item.price * item.count}
                </h1>
              </div>
              <div className='column is-2 fileeee'>
                <h1 className='has-text-weight-bold  ml-6 mr-6 has-text-centered'>
                  {item.count}
                </h1>
              </div>
              <div className='column is-2 fileeee'>
                <h1 className='has-text-weight-bold  ml-6 mr-6 has-text-centered'>
                  {item.size}
                </h1>
              </div>
            </div>
          ))}

          <div id='button-checkout' className='fileee pt-5 pb-3' />
        </div>
      )}
    </Popup>
  );
};
