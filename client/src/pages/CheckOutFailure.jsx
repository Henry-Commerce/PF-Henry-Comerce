export const CheckOutFailure = () => {
  /* const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("payment_id");
   */

  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered has-text-danger is-size-1">
            Hubo un error en tu compra
          </h1>
          <h2 className="subtitle has-text-centered ">
            Por favor realizar de nuevo la compra
          </h2>
          <div className="has-text-centered">
            <a href="/" className="button is-primary ">
              BACK TO HOMEPAGE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
