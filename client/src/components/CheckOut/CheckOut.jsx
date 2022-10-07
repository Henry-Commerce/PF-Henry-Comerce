import Popup from "reactjs-popup";

export const Checkout = ({ product }) => {
  const mercadopago = new MercadoPago(
    "TEST-f6e61415-2f65-4ae8-8953-4baadb9f96cc",
    {
      locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    }
  );

  const handleClick = () => {
    fetch("http://localhost:3001/api/checkout/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: localStorage.getItem("lsCartProducts"),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        createCheckoutButton(preference.id);
      })
      .catch((error) => {
        alert("Unexpected error");
        console.log("CheckOut", error);
      });
  };

  function createCheckoutButton(preferenceId) {
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#button-checkout",
        label: "Pagar con Mercado Pago",
      },
    });
  }

  return (
    <Popup
      trigger={
        <section>
          <button
            className="button is-primary is-fullwidth"
            onClick={() => handleClick()}
          >
            Go to Checkout
          </button>
        </section>
      }
      modal
      nested
    >
      {(close) => (
        <div className="box">
          <button onClick={close} className="button">
            X
          </button>
          <div id="hola">
            {product?.map((item, index) => (
              <div key={index}>
                <h1>{item.name}</h1>
                <h1>${item.price}</h1>
                <h1>X{item.count}</h1>
                <h1>{item.size}</h1>
              </div>
            ))}
          </div>
          <div>
            <section>
              <div id="button-checkout" />
            </section>
          </div>
        </div>
      )}
    </Popup>
  );
};
