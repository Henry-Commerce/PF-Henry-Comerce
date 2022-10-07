import { ShopItem } from "../components";
import { useEffect, useState } from "react";

export const Shop = () => {
  const [lsCartProducts, setLsCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(totalPrice());

  useEffect(() => {
    setLsCartProducts(JSON.parse(localStorage.getItem("lsCartProducts")) || []);
  }, []);

  function totalPrice() {
    let suma = 0;
    JSON.parse(localStorage.getItem("lsCartProducts"))?.forEach((item) => {
      suma += item.count * item.price;
    });
    return suma;
  }

  const handleAmount = async () => {
    var total = totalAmount;
    const ls = await JSON.parse(localStorage.getItem("lsCartProducts"));
    for (let index = 0; index < ls.length; index++) {
      total = total + ls[index].price * ls[index].count;
    }
    setTotalAmount(total);
  };

  return (
    <section className="section is-clipped ">
      <div className="container">
        <div className="has-background-light p-8 p-20-desktop ">
          <h2 className="title mb-8 mb-20-tablet">Your cart</h2>
          <div className="columns is-multiline ">
            <div className="column is-12 is-8-widescreen mb-8 mb-0-widescreen">
              <div
                className="is-hidden-touch columns is-multiline"
                style={{
                  borderBottom: "1px solid grey",
                }}
              >
                <div className="column is-6">
                  <h4
                    className="has-text-weight-bold mb-6"
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    Categoria
                  </h4>
                </div>
                <div className="column is-2">
                  <h4
                    className="has-text-weight-bold mb-6"
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    Price
                  </h4>
                </div>
                <div className="column is-2 ">
                  <h4
                    className="has-text-weight-bold mb-6"
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    Quantity
                  </h4>
                </div>
                <div className="column is-2">
                  <h4
                    className="has-text-weight-bold mb-6"
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    Subtotal
                  </h4>
                </div>
              </div>
              <div className="mb-auto">
                {lsCartProducts.length
                  ? lsCartProducts.map((item, index) => (
                      <div key={index}>
                        <ShopItem
                          product={item}
                          lsCartProducts={lsCartProducts}
                          setLsCartProducts={setLsCartProducts}
                          totalPrice={totalPrice}
                          handleAmount={handleAmount}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="column pl-6 pt-6">
              <div className="has-background-white p-6 p-16-desktop ">
                <h3 className="title is-size-3 mb-6 has-text-centered">
                  Cart totals
                </h3>

                <div className="mb-6 pt-6 is-flex is-justify-content-space-between is-align-items-center">
                  <span className="title is-size-5 mb-3 has-text-weight-bold">
                    Precio total
                  </span>
                  <span className="title is-size-5 mb-0 has-text-weight-bold">
                    ${totalPrice()}
                  </span>
                </div>
                <a className="button is-primary is-fullwidth" href="#">
                  Go to Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
