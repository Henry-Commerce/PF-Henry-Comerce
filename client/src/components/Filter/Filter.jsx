import { useState } from "react";
import "./Filter.scss";

export const Filter = () => {
  const [isActive, setisActive] = useState(false);
  const [isActive1, setisActive1] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [isActive3, setisActive3] = useState(false);

  const [checked, setChecked] = useState(false);

  return (
    <div className="box">
      <h5 className="subtitle is-5 mb-4">Filters</h5>

      <div
        onClick={() => {
          setisActive(!isActive);
        }}
        className={`dropdown dropdown ${isActive ? "is-active" : ""}`}
      >
        <div className="dropdown-trigger">
          <button
            className="button m-1"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Categoryes</span>
            <span className="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input
                type="checkbox"
                value={checked}
                onValueChange={setChecked}
              />
              <span className="ml-1">T-Shirts</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Hoodies</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Pants</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Jackets</span>
            </label>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setisActive1(!isActive1);
        }}
        className={`dropdown dropdown ${isActive1 ? "is-active" : ""}`}
      >
        <div className="dropdown-trigger">
          <button
            className="button m-1"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Size</span>
            <span className="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">XS</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">S</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">M</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">L</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">XL</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">XXL</span>
            </label>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setisActive2(!isActive2);
        }}
        className={`dropdown dropdown ${isActive2 ? "is-active" : ""}`}
      >
        <div className="dropdown-trigger">
          <button
            className="button m-1"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Colors</span>
            <span className="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">White</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Black</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Red</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Blue</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Green</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">Yellow</span>
            </label>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setisActive3(!isActive3);
        }}
        className={`dropdown dropdown ${isActive3 ? "is-active" : ""}`}
      >
        <div className="dropdown-trigger">
          <button
            className="button m-1"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Price</span>
            <span className="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">$0 - $25</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">$25 - $50</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1">$50 - $100</span>
            </label>
          </div>
        </div>
      </div>
      <div className="clear">
        <a className="has-text-grey">CLEAR ALL</a>
      </div>
    </div>
  );
};
