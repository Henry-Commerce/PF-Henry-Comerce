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

/*   http://localhost:5173/pending?collection_id=1308842303&collection_status=pending&payment_id=1308842303&status=pending&external_reference=null&payment_type=ticket&merchant_order_id=6106623140&preference_id=128332427-8da5aa42-691a-4f7e-abab-9717748a6a84&site_id=MLA&processing_mode=aggregator&merchant_account_id=null */
