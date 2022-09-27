/** @format */

import "./Order.scss";

export const Order = () => {
  return (
    <div class="order pb-4">
      <h3>Order by</h3>
      <div class="select">
        <select name="Price">
          <option hidden>Price</option>
          <option value="low">Lower price</option>
          <option value="top">Higher price</option>
        </select>
      </div>
    </div>
  );
};
