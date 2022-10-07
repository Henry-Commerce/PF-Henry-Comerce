import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";

export const ShopItem = ({ product, lsCartProducts, handleAmount }) => {
  const [count, setCount] = useState(product.count);
  const stock = product.stockk;

  useEffect(() => {
    const prodFind = lsCartProducts.find((e) => e.cartId === product.cartId);
    const cartFilter = lsCartProducts.filter(
      (item) => item.cartId !== product.cartId
    );
    prodFind.count = count;
    localStorage.setItem(
      "lsCartProducts",
      JSON.stringify([...cartFilter, prodFind])
    );
  }, [product.cartId, lsCartProducts]);

  const handlePlus = () => {
    if (count === stock) return;
    setCount(count + 1);
    handleAmount();
  };

  const handleMin = () => {
    if (count === 1) return;
    setCount(count - 1);
    handleAmount();
  };

  return (
    <div className="mb-auto">
      <div
        className="mb-3-tablet mb-auto columns is-vcentered is-multiline"
        style={{
          borderBottom: "1px solid grey",
        }}
      >
        <div className="column is-6-desktop is-7-tablet mb-0-tablet">
          <div className="columns is-vcentered is-multiline">
            <div className="column is-4 mb-3">
              <div
                className="is-flex has-background-light is-justify-content-center is-align-items-center"
                style={{
                  width: "96px",
                  height: "128px",
                }}
              >
                <div>
                  <img
                    className="image is-fullwidth"
                    style={{
                      objectFit: "cover",
                    }}
                    src={product.image}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="column is-8">
              <h3 className="subtitle  has-text-weight-bold">{product.name}</h3>
              <p className="mb-0 has-text-grey has-text-left">
                {product.categoria}
              </p>
              <p className="mb-0 has-text-grey has-text-left">{product.size}</p>
            </div>
          </div>
        </div>
        <div className="column is-2 is-hidden-touch">
          <p className="subtitle has-text-info mb-2 has-text-weight-bold">
            ${product.price}
          </p>
        </div>
        <div className="column is-2-desktop is-3-tablet pl-0">
          <div
            className="is-inline-flex is-align-items-center has-text-weight-bold pl-1"
            style={{
              border: "1px solid #DBDDE1",
              borderRadius: "8px",
            }}
          >
            <button
              onClick={handleMin}
              className="button has-text-black is-ghost "
            >
              <MdRemove />
            </button>
            <button className="input has-text-centered">{count}</button>

            <button
              onClick={handlePlus}
              className="button has-text-black is-ghost"
            >
              <MdAdd />
            </button>
          </div>
        </div>
        <div className="column is-2">
          <p className="subtitle has-text-info has-text-weight-bold pl-4 pb-2">
            ${product.price * count}
          </p>
        </div>
      </div>
    </div>
  );
};
