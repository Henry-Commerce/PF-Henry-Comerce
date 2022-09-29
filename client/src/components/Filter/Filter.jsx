import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClothing } from "../../redux/actions/actions";
import { AiOutlineDown } from "react-icons/ai";
import "./Filter.scss";

export const Filter = () => {
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(false);
  const [isActive1, setisActive1] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [isActive3, setisActive3] = useState(false);

  const [categories, setCategories] = useState([]);

  const allClothing = useSelector((state) => state.allClothing);

  useEffect(() => {
    dispatch(getClothing(categories));
  }, [dispatch, categories]);

  const handleChange = (event) => {
    if (event.target.checked) {
      return setCategories([...categories, event.target.value]);
    } else {
      const change = categories.filter(
        (element) => element != event.target.value
      );
      return setCategories(change);
    }
  };

  const set = new Set(allClothing.map((element) => element.category));

  const setArray = [...set];

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
            <label className="checkbox">
              {setArray.map((element, index) => (
                <div key={index}>
                  <input
                    id={index}
                    type="checkbox"
                    value={element}
                    onClick={(event) => handleChange(event)}
                  />
                  <label className="ml-1" htmlFor={index}>
                    {element}
                  </label>
                </div>
              ))}
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
              <input type="checkbox" />
              <span className="ml-1"></span>
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
