export const CheckOutSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get("payment_id");

  localStorage.clear("lsCartProducts");

  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered has-text-success is-size-1">
            El pago se ha realizado correctamente
          </h1>
          <h2 className="subtitle has-text-centered ">
            Tu numero de orden es {paymentId}
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
