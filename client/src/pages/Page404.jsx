/** @format */

export const Page404 = () => {
  return (
    <section class='hero is-light is-fullheight'>
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title has-text-centered has-text-danger is-size-1'>404</h1>
          <h2 class='subtitle has-text-centered '>
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
