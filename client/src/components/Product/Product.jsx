/** @format */
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';

export const Product = ({ name, image, price }) => {
  function add() {}

  return (
    <div className='column is-3-desktop is-6-tablet'>
      <Link to={"/products/"+name}>
      <div className='has-background-white pt-4 px-10 pb-10 is-relative'>
        <span className='is-absolute is-top-0 is-left-0 ml-4 mt-4 tag is-danger has-text-weight-bold'>
          -15%
        </span>
        <a className='mt-6 mb-2 px-6 is-block' href='#'>
          <img
            className='mx-auto mb-5 image'
            style={{
              height: '224px',
              objectFit: 'cover',
            }}
            src={image}
            alt=''
          />
          <h5 className='title is-size-5 mb-2'>{name}</h5>
          <p>
            <span className='has-text-info is-size-5 has-text-weight-bold'>
              ${price}
            </span>
            <span
              className='has-text-grey-dark is-size-7 has-text-weight-normal pl-1'
              style={{
                textDecoration: 'line-through',
              }}>
              $33.69
            </span>
          </p>
        </a>
        <a
          className='button ml-auto is-flex'
          onClick={add}
          style={{
            width: '48px',
            height: '48px',
          }}>
          <GrAdd />
        </a>
      </div>
      </Link>
    </div>
  );
};
