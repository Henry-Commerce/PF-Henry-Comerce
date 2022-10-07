/** @format */
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";

export const Product = ({ name, image, price }) => {
  function add() {}

  return (
    <div className="column is-3-desktop is-6-tablet">
      <Link to={"/products/" + name} preventScrollReset={false}>
        <div className="has-background-white pt-4 px-10 pb-10 is-relative">
          <div className="mt-6 mb-2 px-6 is-block">
            <img
              className="mx-auto mb-5 image"
              style={{
                height: "224px",
                objectFit: "cover",
              }}
              src={image}
              alt=""
            />
            <h5 className="title is-size-5 mb-2">{name}</h5>
            <p>
              <span className="has-text-info is-size-5 has-text-weight-bold">
                ${price}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
