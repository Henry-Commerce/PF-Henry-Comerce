/* import { MercadoPago } from "mercadopago"; */

export const Checkout = () => {
  // Add SDK credentials
  // REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel

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
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localStorage.getItem("lsCartProducts")),
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

  // Create preference when click on checkout button
  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "", // Class name where the payment button will be displayed
        label: "Pay", // Change the payment button text (optional)
      },
    });
  }

  return (
    <div>
      <a
        onClick={() => handleClick()}
        className="button is-primary is-fullwidth"
        href="#"
      >
        Go to Checkout
      </a>
    </div>
  );
};
