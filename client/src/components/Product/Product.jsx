/** @format */

export const Product = () => {
  return (
    <div className='column is-3-desktop is-6-tablet'>
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
            src='https://moviesshopco.vtexassets.com/arquivos/ids/169080-800-800?v=637608365520970000&width=800&height=800&aspect=true'
            alt=''
          />
          <h5 className='title is-size-5 mb-2'>Nike basketball</h5>
          <p>
            <span className='has-text-info is-size-5 has-text-weight-bold'>
              $34.89
            </span>
            <span
              className='has-text-grey-dark is-size-7 has-text-weight-normal'
              style={{
                textDecoration: 'line-through',
              }}>
              $33.69
            </span>
          </p>
        </a>
        <a
          className='button is-outlined p-0 ml-auto is-flex'
          href='#'
          style={{
            width: '48px',
            height: '48px',
          }}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <rect x='5' width='2' height='12' fill='currentColor'></rect>
            <rect
              x='12'
              y='5'
              width='2'
              height='12'
              transform='rotate(90 12 5)'
              fill='currentColor'></rect>
          </svg>
        </a>
      </div>
    </div>
  );
};
