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
      {() => (
        <div className="box">
          <table className="table is-striped">
            <tbody>
            {product?.map((item, index) => (
              <tr key={index}>
                <th>{item.name}</th>
                <td>{item.size}</td>
                <td>x{item.count}</td>
                <td>${item.price}</td>
              </tr>
            ))}
            </tbody>
            <tfoot id="button-checkout" />
          </table>
        </div>
      )}
    </Popup>
  );
};
