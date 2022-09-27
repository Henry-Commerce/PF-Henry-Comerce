/** @format */

export const Page404 = () => {
  return (
    <section className='hero is-light is-fullheight'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title has-text-centered has-text-danger is-size-1'>
            404
          </h1>
          <h2 className='subtitle has-text-centered '>
            OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!
          </h2>
          <div className='has-text-centered'>
            <a href='/' className='button is-primary '>
              BACK TO HOMEPAGE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
