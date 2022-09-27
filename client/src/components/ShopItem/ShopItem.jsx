/** @format */
import { MdAdd } from 'react-icons/md';
import { MdRemove } from 'react-icons/md';

export const ShopItem = () => {
  return (
    <div className='mb-auto'>
      <div className='mb-3-tablet mb-auto columns is-vcentered is-multiline'>
        <div className='column is-6-desktop is-7-tablet mb-0-tablet'>
          <div className='columns is-vcentered is-multiline'>
            <div className='column is-4 mb-3'>
              <div
                className='is-flex has-background-light is-justify-content-center is-align-items-center'
                style={{
                  width: '96px',
                  height: '128px',
                }}>
                <img
                  className='image is-fullwidth'
                  style={{
                    objectFit: 'cover',
                  }}
                  src='https://moviesshopco.vtexassets.com/arquivos/ids/169080-800-800?v=637608365520970000&width=800&height=800&aspect=true'
                  alt=''
                />
              </div>
            </div>
            <div className='column is-8'>
              <h3 className='subtitle mb-2 has-text-weight-bold'>
                BRILE water filter carafe
              </h3>
              <p className='mb-0 has-text-grey'>Maecenas 0.7 commodo sit</p>
            </div>
          </div>
        </div>
        <div className='column is-2 is-hidden-touch'>
          <p className='subtitle has-text-info mb-0 has-text-weight-bold'>
            $29.89
          </p>
          <span
            className='has-text-grey'
            style={{
              textDecoration: 'line-through',
            }}>
            $33.69
          </span>
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
            <input
              className='input px-2 py-4 has-text-centered'
              style={{
                width: '48px',
                border: 'none',
                boxShadow: 'none',
              }}
              type='number'
              placeholder='1'
            />
            <button className='button has-text-black is-ghost'>
              <MdAdd />
            </button>
          </div>
        </div>
        <div className='column is-2'>
          <p className='subtitle has-text-info has-text-weight-bold'>$29.89</p>
        </div>
      </div>
    </div>
  );
};
