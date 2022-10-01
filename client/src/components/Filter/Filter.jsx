import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getClothing, clearState } from "../../redux/actions/actions";
import { AiOutlineDown } from "react-icons/ai";
import "./Filter.scss";

export const Filter = () => {
  const dispatch = useDispatch();

  // To open dropdown
  const [isActive, setisActive] = useState(false);
  const [isActive1, setisActive1] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [isActive3, setisActive3] = useState(false);

  // To uncheck
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const toggleChecked = () => {
    dispatch(getClothing()); // El problema es q no estoy limpiando el estado, solo vuelvo a traer las cosas
    dispatch(clearState());
    setChecked(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
  };

  // To filter categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getClothing(categories));
  }, [dispatch, categories]);

  const handleCategories = (event) => {
    if (event.target.checked) {
      return setCategories([...categories, event.target.value]);
    } else {
      const change = categories.filter(
        (element) => element != event.target.value
      );
      return setCategories(change);
    }
  };

  // Render
  return (
    <div className="box filter">
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
            <span>Categories</span>
            <span className="icon is-small">
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label
              className="checkbox"
              onClick={() => setChecked((check) => !check)}
            >
              <input
                type="checkbox"
                value="Camisas"
                checked={checked}
                onClick={(event) => handleCategories(event)}
              />
              <label className="ml-1">Camisas</label>
            </label>
            <label
              className="checkbox"
              onClick={() => setChecked1((check) => !check)}
            >
              <input
                type="checkbox"
                value="Buzos"
                checked={checked1}
                onClick={(event) => handleCategories(event)}
              />
              <label className="ml-1">Buzos</label>
            </label>
            <label
              className="checkbox"
              onClick={() => setChecked2((check) => !check)}
            >
              <input
                type="checkbox"
                value="Gorras"
                checked={checked2}
                onClick={(event) => handleCategories(event)}
              />
              <label className="ml-1">Gorras</label>
            </label>
            <label
              className="checkbox"
              onClick={() => setChecked3((check) => !check)}
            >
              <input
                type="checkbox"
                value="Sudaderas"
                checked={checked3}
                onClick={(event) => handleCategories(event)}
              />
              <label className="ml-1">Sudaderas</label>
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
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input type="checkbox" value="XS" onClick={""} />
              <label className="ml-1">XS</label>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="S" onClick={""} />
              <label className="ml-1">S</label>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="M" onClick={""} />
              <label className="ml-1">M</label>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="L" onClick={""} />
              <label className="ml-1">L</label>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="XL" onClick={""} />
              <label className="ml-1">XL</label>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="XXL" onClick={""} />
              <label className="ml-1">XXL</label>
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
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ml-1"></span>
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
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <label className="checkbox">
              <input type="checkbox" value="0-25" />
              <span className="ml-1">$0 - $25</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="25-50" />
              <span className="ml-1">$25 - $50</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" value="50-100" />
              <span className="ml-1">$50 - $100</span>
            </label>
          </div>
        </div>
      </div>

      <div className="clear">
        <a className="has-text-grey" onClick={() => toggleChecked()}>
          CLEAR ALL
        </a>
      </div>
    </div>
  );
};
