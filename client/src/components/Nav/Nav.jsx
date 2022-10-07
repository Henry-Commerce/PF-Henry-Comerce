/** @format */
import "./Nav.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { RiLoginBoxFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { getClothingByName } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

export const Nav = () => {
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(false);
  const [name, setName] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length !== 0) {
      dispatch(getClothingByName(name));
      setName("");
    }
  };

  return (
    <header>
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <img src={logo} alt="Logo" width="112" height="28" />
          </a>
          <a
            onClick={() => {
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="nav-links"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="nav-links"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <Link className="navbar-item jsi" to="/">
              Home
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="#">
                Products
              </a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" href="#">
                  Shirts
                </a>
                <a className="navbar-item" href="#">
                  Pants
                </a>
                <a className="navbar-item" href="#">
                  Caps
                </a>
                <a className="navbar-item" href="#">
                  Jackets
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="#">
                  Masculine
                </a>
                <a className="navbar-item" href="#">
                  Female
                </a>
              </div>
            </div>
            <Link className="navbar-item jsi" to="/admin/add">
              Add new Products
            </Link>
            <Link className="navbar-item jsi" to="/news">
              News
            </Link>
            <Link className="navbar-item jsi" to="/offers">
              Offers
            </Link>
            <Link className="navbar-item jsi" to="/team">
              Team
            </Link>

            <div className="navbar-item">
              <p className="control has-icons-right">
                <input
                  onChange={(event) => {
                    handleInput(event);
                  }}
                  className="input"
                  type="text"
                  placeholder="Search product"
                />
              </p>
              <span className="icon is-small is-right">
                <button
                  className="button"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                  type="submit"
                >
                  <FaSearch />
                </button>
              </span>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link className="button log-s" to="/login">
                    <span className="icon">
                      <RiLoginBoxFill className="fab" />
                    </span>
                    <span>Log In</span>
                  </Link>
                </p>
                <p className="control">
                  <Link className="button is-primary" to="/shop">
                    <span className="icon">
                      <FaShoppingCart className="fas" />
                    </span>
                    <span>Shop</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

{
  /* <nav>
        <img src={logo} alt='meow' />
        <ul>
          <li>
            <Link to='/'>Inicio</Link>
          </li>
          <li>
            <Link to='/nosotros'>Nosotros</Link>
          </li>
          <li>
            <Link to='/novedades'>Novedades</Link>
          </li>
          <li>
            <Link to='/ofertas'>Ofertas</Link>
          </li>
          <li>
            <Link to='/soporte'>Soporte</Link>
          </li>
          <Link to='/login'>
            <button type='button' classNameName='log'>
              Log in
            </button>
          </Link>

          <Link to='/register'>
            <button type='button' classNameName='reg'>
              Registrate
            </button>
          </Link>
        </ul>
      </nav> */
}
