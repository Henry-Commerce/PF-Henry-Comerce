export const CheckOutPending = () => {
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get("payment_id");

  localStorage.clear("lsCartProducts");

  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered has-text-info is-size-1">
            Hay un pago pendiente
          </h1>
          <h2 className="subtitle has-text-centered ">
            Ir a la sucursal mas cercana con la siguiente referencia para
            completar la compra
          </h2>
          <h2 className="subtitle has-text-centered has-text-info is-size-2">
            {paymentId}
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
