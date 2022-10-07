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

  // Create preference when click on checkout button
  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#button-checkout", // Class name where the payment button will be displayed
        label: "Pay", // Change the payment button text (optional)
      },
    });
  }

  return (
    <>
      <section >
        <a
          onClick={() => handleClick()}
          className="button is-primary is-fullwidth"
          href="#"
        >
          Go to Checkout
        </a>
      </section>
      <section>
        <div id="button-checkout" />
      </section>
    </>
  );
};

{
  /* <section class="shopping-cart dark">
        <div class="container" id="container">
          <div class="block-heading">
            <h2>Shopping Cart</h2>
            <p>This is an example of Checkout Pro integration of Mercado Pago</p> 
          </div>
          <div class="content">
            <div class="row">
              <div class="col-md-12 col-lg-8">
                <div class="items">
                  <div class="product">
                    <div class="info">
                      <div class="product-details">
                        <div class="row justify-content-md-center">
                          <div class="col-md-3">
                            <img class="img-fluid mx-auto d-block image" src="img/product.png">
                          </div>
                          <div class="col-md-4 product-detail">
                            <h5>Product</h5>
                            <div class="product-info">
                              <p><b>Description: </b><span id="product-description">Some book</span><br>
                              <b>Author: </b>Dale Carnegie<br>
                              <b>Number of pages: </b>336<br>
                              <b>Price:</b> $ <span id="unit-price">10</span></p>
                            </div>
                          </div>
                          <div class="col-md-3 product-detail">
                            <label for="quantity"><h5>Quantity</h5></label>
                            <input type="number" id="quantity" value="1" min="1" class="form-control">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="summary">
                  <h3>Cart</h3>
                  <div class="summary-item"><span class="text">Subtotal</span><span class="price" id="cart-total"></span></div>
                  <button class="btn btn-primary btn-lg btn-block" id="checkout-btn">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */
}

{
/*   <section class="payment-form dark">
<div class="container_payment">
  <div class="block-heading">
    <h2>Checkout Payment</h2>
    <p>This is an example of a Mercado Pago integration</p>
  </div>
  <div class="form-payment">
    <div class="products">
      <h2 class="title">Summary</h3>
      <div class="item">
        <span class="price" id="summary-price"></span>
        <p class="item-name">Book x <span id="summary-quantity"></span></p>
      </div>
      <div class="total">Total<span class="price" id="summary-total"></span></div>
    </div>
    <div class="payment-details">
      <div class="form-group col-sm-12">
        <br>      
        <div id="button-checkout">
        </div>                 
        <br>
        <a id="go-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" class="chevron-left">
            <path fill="#009EE3" fill-rule="nonzero"id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
          </svg>
          Go back to Shopping Cart
        </a>
      </div>
    </div>
  </div>
</div>
</section> */
}
