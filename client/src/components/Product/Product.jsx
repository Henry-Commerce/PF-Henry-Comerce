/** @format */
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';

export const Product = ({ name, image, price, discount, dark }) => {
  function add() {
    console.log('meow');
  }

  const dis = (price - [(price * discount) / 100]).toFixed(2);

  return (
    <div className='column is-3-desktop is-6-tablet'>
      <Link to={'/products/' + name} preventScrollReset={false}>
        <div
          className={`${
            dark ? 'has-background-black border-yellow' : 'has-background-white'
          }  pt-4 px-10 pb-10 is-relative`}>
          {discount > 0 ? (
            <span className='is-absolute is-top-0 is-left-0 ml-4 mt-4 tag is-danger has-text-weight-bold'>
              -{discount}%
            </span>
          ) : (
            <span
              className={`${
                dark ? 'has-background-black' : 'has-background-white'
              }  pt-4 is-absolute is-top-0 is-left-0 ml-4 mt-4 tag is-white has-text-weight-bold`}></span>
          )}

          <div className='mt-6 mb-2 px-6 is-block' href='#'>
            <img
              className='mx-auto mb-5 image'
              style={{
                height: '224px',
                objectFit: 'cover',
              }}
              src={image}
              alt={name}
            />
            <h5 className='title is-size-5 mb-2'>{name}</h5>
            <p>
              {discount > 0 ? (
                <span className='has-text-info is-size-5 has-text-weight-bold'>
                  ${dis}
                </span>
              ) : (
                <span className='has-text-info is-size-5 has-text-weight-bold'>
                  ${price}
                </span>
              )}

              {/* <span
              className='has-text-grey-dark is-size-7 has-text-weight-normal pl-1'
              style={{
                textDecoration: 'line-through',
              }}>
              $33.69
            </span> */}
            </p>
          </div>
          <div
            className='button ml-auto is-flex'
            onClick={add}
            style={{
              width: '48px',
              height: '48px',
            }}>
            <GrAdd />
          </div>
        </div>
      </Link>
    </div>
  );
};
