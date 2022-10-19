/** @format */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getClothing, clearState } from '../../redux/actions/actions';
import { AiOutlineDown } from 'react-icons/ai';
import './Filter.scss';

export const Filter = ({ setCurrentPage, dark }) => {
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
    dispatch(getClothing());
    dispatch(clearState());
    setChecked(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
  };

  // To filter
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([]);

  const allFilters = `categories=${categories.join(',')}&size=${size.join(
    ','
  )}&price=${price.join(',')}`;

  useEffect(() => {
    dispatch(getClothing(allFilters));
  }, [dispatch, allFilters]);

  const handleCategories = (event) => {
    if (event.target.checked) {
      setCurrentPage(1);
      return setCategories([...categories, event.target.value]);
    } else {
      const change = categories.filter(
        (element) => element != event.target.value
      );
      setCurrentPage(1);
      return setCategories(change);
    }
  };

  const handleSize = (event) => {
    if (event.target.checked) {
      setCurrentPage(1);
      return setSize([...size, event.target.value]);
    } else {
      const change = size.filter((element) => element != event.target.value);
      setCurrentPage(1);
      return setSize(change);
    }
  };

  const handlePrice = (event) => {
    if (event.target.checked) {
      setCurrentPage(1);
      return setPrice([...price, event.target.value]);
    } else {
      setCurrentPage(1);
      const change = price.filter((element) => element != event.target.value);
      return setPrice(change);
    }
  };

  // Render
  return (
    <div className={`${dark ? 'has-background-black' : ''} box filter mt-0`}>
      <h5 className={`${dark ? 'text-for-black' : ''} subtitle is-5`}>
        Filters
      </h5>

      <div
        onClick={() => {
          setisActive(!isActive);
          setisActive1(false);
          setisActive2(false);
          setisActive3(false);
        }}
        className={`dropdown dropdown ${isActive ? 'is-active' : ''}`}>
        <div className='dropdown-trigger'>
          <button
            className='button m-1'
            aria-haspopup='true'
            aria-controls='dropdown-menu'>
            <span>Categories</span>
            <span className='icon is-small'>
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            <label
              className='checkbox'
              onClick={() => setChecked((check) => !check)}>
              <input
                type='checkbox'
                value='T-shirt'
                checked={checked}
                onChange={(event) => handleCategories(event)}
              />
              <span className='ml-1'>Camisas</span>
            </label>
            <label
              className='checkbox'
              onChange={() => setChecked1((check) => !check)}>
              <input
                type='checkbox'
                value='Pantalones'
                checked={checked1}
                onChange={(event) => handleCategories(event)}
              />
              <span className='ml-1'>Pantalones</span>
            </label>
            <label
              className='checkbox'
              onClick={() => setChecked2((check) => !check)}>
              <input
                type='checkbox'
                value='Accesorios'
                checked={checked2}
                onChange={(event) => handleCategories(event)}
              />
              <span className='ml-1'>Accesorios</span>
            </label>
            <label
              className='checkbox'
              onClick={() => setChecked3((check) => !check)}>
              <input
                type='checkbox'
                value='Sudaderas'
                checked={checked3}
                onChange={(event) => handleCategories(event)}
              />
              <span className='ml-1'>Sudaderas</span>
            </label>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          setisActive(false);
          setisActive1(!isActive1);
          setisActive2(false);
          setisActive3(false);
        }}
        className={`dropdown dropdown ${isActive1 ? 'is-active' : ''}`}>
        <div className='dropdown-trigger'>
          <button
            className='button m-1'
            aria-haspopup='true'
            aria-controls='dropdown-menu'>
            <span>Size</span>
            <span className='icon is-small'>
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='XS'
                onChange={(event) => handleSize(event)}
              />
              <span className='ml-1'>XS</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='S'
                onChange={(event) => handleSize(event)}
              />
              <span className='ml-1'>S</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='M'
                onChange={(event) => handleSize(event)}
              />
              <span className='ml-1'>M</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='L'
                onChange={(event) => handleSize(event)}
              />
              <span className='ml-1'>L</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='XL'
                onChange={(event) => handleSize(event)}
              />
              <span className='ml-1'>XL</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='XXL'
                onChange={(event) => handleSize(event)}
              />
              <span className='ml-1'>XXL</span>
            </label>
          </div>
        </div>
      </div>

      {/* <div
        onClick={() => {
          setisActive(false);
          setisActive1(false);
          setisActive2(!isActive2);
          setisActive3(false);
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
      </div> */}

      <div
        onClick={() => {
          setisActive(false);
          setisActive1(false);
          setisActive2(false);
          setisActive3(!isActive3);
        }}
        className={`dropdown dropdown ${isActive3 ? 'is-active' : ''}`}>
        <div className='dropdown-trigger'>
          <button
            className='button m-1'
            aria-haspopup='true'
            aria-controls='dropdown-menu'>
            <span>Price</span>
            <span className='icon is-small'>
              <AiOutlineDown />
            </span>
          </button>
        </div>
        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='0-25'
                onChange={(event) => handlePrice(event)}
              />
              <span className='ml-1'>$0 - $25</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='25-50'
                onChange={(event) => handlePrice(event)}
              />
              <span className='ml-1'>$25 - $50</span>
            </label>
            <label className='checkbox'>
              <input
                type='checkbox'
                value='50-100'
                onChange={(event) => handlePrice(event)}
              />
              <span className='ml-1'>$50 - $100</span>
            </label>
          </div>
        </div>
      </div>

      <div className='clear'>
        <a className='has-text-grey' onClick={() => toggleChecked()}>
          CLEAR ALL
        </a>
      </div>
    </div>
  );
};
