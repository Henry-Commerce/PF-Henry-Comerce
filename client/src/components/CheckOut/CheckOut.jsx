import React from "react";
import Popup from "reactjs-popup";
3;
import "./CheckOut.scss";

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
      className="epa is-marginless"
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
        <div className="box width">
          {/* <button onClick={close} className="button">
            X
          </button> */}

          <div className="columns fileee is-centered bt">
            <div className="column is-3 fileeee bb">
              <h1 className="has-text-weight-bold mt-4 mb-4 ml-6 mr-6 has-text-centered ">
                Producto
              </h1>
            </div>
            <div className="column is-3 fileeee">
              <h1 className="has-text-weight-bold mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Nombre{" "}
              </h1>
            </div>
            <div className="column is-2 fileeee">
              <h1 className="has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Precio
              </h1>
            </div>
            <div className="column is-2 fileeee">
              <h1 className="has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Cantidad
              </h1>
            </div>
            <div className="column is-2 fileeee">
              <h1 className="has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Talla
              </h1>
            </div>
          </div>
          {product?.map((item, index) => (
            <div className="columns fileee is-centered bt">
              <div className="column is-3 fileeee bb" key={index}>
                <img
                  className=""
                  src={item.image}
                  alt=""
                  style={{ width: "88px " }}
                />
              </div>
              <div className="column is-3 fileeee">
                <h1 className="has-text-weight-bold ml-6 mr-6 has-text-centered">
                  {item.name}
                </h1>
              </div>
              <div className="column is-2 fileeee">
                <h1 className="has-text-weight-bold  ml-6 mr-6 has-text-centered">
                  ${item.price * item.count}
                </h1>
              </div>
              <div className="column is-2 fileeee">
                <h1 className="has-text-weight-bold  ml-6 mr-6 has-text-centered">
                  {item.count}
                </h1>
              </div>
              <div className="column is-2 fileeee">
                <h1 className="has-text-weight-bold  ml-6 mr-6 has-text-centered">
                  {item.size}
                </h1>
              </div>
            </div>
          ))}

          <div className="">
            <div id="button-checkout" className="fileee pt-5 pb-3" />
          </div>
        </div>
      )}
    </Popup>
  );
};
