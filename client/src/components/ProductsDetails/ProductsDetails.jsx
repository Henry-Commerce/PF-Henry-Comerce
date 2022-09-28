/** @format */
import { useEffect, useState } from 'react';
import './ProductsDetails.scss';
import { MdRemove, MdAdd } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ProductsDetails = () => {
  const arr = {
    name: 'Remera henry basica',
    type: 'Casual',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black', 'White', 'Yellow'],
    price: '15.90',
    stock: 4,
    img: 'https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dweb0954ea/5_detail_750/00463559-03.jpg?sw=1000&sh=1500',
    reseñas: [
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    ],
    preguntas: [
      'Cuando va a llegar el stock de talla S?',
      'Cuando va a llegar el stock de talla N?',
    ],
  };

  const [stock, setStock] = useState(1);

  const [size, setSize] = useState('');

  const [color, setColor] = useState('');

  useEffect(() => {}, []);

  const selectSize = (e) => {
    setSize(e.target.value);
    console.log(size);
  };

  const selectColor = (e) => {
    setColor(e.target.value);
    console.log(color);
  };

  const onClickMas = () => {
    if (stock >= arr.stock) {
      return;
    } else {
      setStock(stock + 1);
    }
  };

  const onClickMenos = () => {
    if (stock === 1) {
      return;
    } else {
      setStock(stock - 1);
    }
  };

  const marto = (e) => {
    if (size === e) {
      return false;
    } else {
      return true;
    }
  };

  const martoo = (e) => {
    if (color === e) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <section className='pt-6'></section>
      <div className='file is-centered '></div>
      <div className='container has-text-left'>
        <div className='columns '>
          <div className='column'>
            <img
              className='image pb-2 '
              height='1rem'
              src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb8336388/1_front_750/00463559-03.jpg?sw=1000&sh=1500'
              alt=''
            />
            <img
              className='image  pb-2'
              src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw1f853781/2_side_750/00463559-03.jpg?sw=1000&sh=1500'
              alt=''
            />
            <img
              className='image pb-2'
              src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwd6adb6ca/7_additional_750/00463559-03.jpg?sw=1000&sh=1500'
              alt=''
            />
          </div>

          <div className='column is-half'>
            <img src={arr.img} alt='' />
          </div>

          <div className='column is-two-fifths'>
            <h1 className='pt-6 pl-6 has-text-weight-bold mb-6'>Rating</h1>
            <h1 className='pt-1 pl-6 title has-text-weight-bold mb-5 has-text-left'>
              {arr.name}
            </h1>
            <h1 className=' pl-6 has-text-weight-bold mb-6'>{arr.type}</h1>
            <section className='pt-5'></section>

            <div className='pl-6 pr-6'>
              {arr.sizes.map((e) => (
                <button
                  onClick={selectSize}
                  value={e}
                  key={e}
                  className={
                    marto(e)
                      ? 'button is-light mr-4 has-text-weight-bold'
                      : 'button  is-dark mr-4 has-text-weight-bold'
                  }>
                  {e}
                </button>
              ))}
            </div>
            <div className='pt-6 pl-6  has-text-weight-bold  has-text-left  mb-6'>
              {arr.colors.map((e) => (
                <button
                  onClick={selectColor}
                  value={e}
                  key={e}
                  className={
                    martoo(e)
                      ? 'button is-light mr-1 has-text-weight-bold'
                      : 'button  is-dark mr-1 has-text-weight-bold'
                  }>
                  {e}
                </button>
              ))}

              {/* <button onClick= {selectColor}  value={e} key={e} className={martoo(e) ? "button is-light mr-1 has-text-weight-bold" : "button  is-dark mr-1 has-text-weight-bold" }>{e}</button> */}
            </div>

            <h3 className='pt-1 pl-6 title has-text-weight-bold mb-4 has-text-left'>
              Cantidad prod
            </h3>
            <div className='column is-2-desktop is-3-tablet pl-6 '>
              <div
                className='is-inline-flex is-align-items-center has-text-weight-bold pl-1 mb-4'
                style={{
                  border: '1px solid #DBDDE1',
                  borderRadius: '8px',
                }}>
                <button
                  onClick={onClickMenos}
                  className='button has-text-black is-ghost '>
                  <MdRemove />
                </button>
                <button
                  className='button px-2 py-4 has-text-centered'
                  style={{
                    width: '48px',
                    border: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                  }}
                  type='number'
                  placeholder='1'
                  value={stock}>
                  {stock}
                </button>
                <button
                  onClick={onClickMas}
                  className='button has-text-black is-ghost'>
                  <MdAdd />
                </button>
              </div>
            </div>
            <div className='pt-6 pl-6 pb-6 border-bottom'></div>
            <section className='pt-6'></section>
            <div className='pl-6 pr-6 card-header-title '>
              <p className='pr-6 title has-text-weight-bold mb-0 is-inline-block'>
                ${arr.price}
              </p>
              <p className='control'>
                <Link className='button is-primary' to=''>
                  <span className='icon'>
                    <FaShoppingCart className='fas' />
                  </span>
                  <span>Add to cart</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className='pt-6'></section>
      <section className='pt-6'></section>
      <div className='container'>
        <div className='column is-full'>
          <div className='file is-centered border-bottom'>
            <h3 className='pt-1 pl-6 title  mb-4 has-text-left'>
              PRODUCTOS RECOMENDADOS
            </h3>
          </div>
          <div className='file is-justify-content-space-around pt-6 has-text-centered has-text-weight-bold'>
            <div>
              <img
                className=' image '
                width='200'
                height='120'
                src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw0c221234/1_front_750/00464362-01.jpg?sw=276&sh=414'
                alt=''
              />
              <p>Nombre producto</p>
              <p className='pt-4'>{arr.price}</p>
            </div>

            <div>
              <img
                className='image '
                width='200'
                height='120'
                src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb21f3df3/1_front_750/00463564-02.jpg?sw=276&sh=414'
                alt=''
              />
              <p>Nombre producto</p>
              <p className='pt-4'>{arr.price}</p>
            </div>

            <div>
              <img
                className='image'
                width='200'
                height='120'
                src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw24c02e7a/1_front_750/00464839-13.jpg?sw=276&sh=414'
                alt=''
              />
              <p>Nombre producto</p>
              <p className='pt-4'>{arr.price}</p>
            </div>

            <div>
              <img
                className='image'
                width='200'
                height='120'
                src='https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwaa67b43b/1_front_750/00468678-03.jpg?sw=276&sh=414'
                alt=''
              />
              <p>Nombre producto</p>
              <p className='pt-4'>{arr.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
