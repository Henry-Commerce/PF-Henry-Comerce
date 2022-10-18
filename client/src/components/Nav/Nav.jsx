/** @format */
import './Nav.scss';
import logo from '../../assets/logo.png';
import logoDark from '../../assets/logoDark.png';
import { Link, useNavigate } from 'react-router-dom';

import { RiLoginBoxFill } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getClothingByName, startLogout } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const Nav = ({ dark }) => {
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(false);
  const [name, setName] = useState('');
  const [session, setSession] = useState(false);

  const handleInput = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length !== 0) {
      dispatch(getClothingByName(name));
      setName('');
    }
  };

  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem('authenticated')));
    console.log('session', session);
  }, [localStorage.getItem('authenticated')]);

  const status = useSelector((state) => state.status);
  useEffect(() => {}, [status]);

  const navigate = useNavigate();
  const meow = () => {
    localStorage.removeItem('authenticated');
    dispatch(startLogout());
    navigate('/');
  };

  return (
    <header>
      <nav
        className={`${
          dark ? 'is-black navpDark' : 'navp'
        } navbar is-transparent `}>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img
              src={dark ? logoDark : logo}
              alt='Logo'
              width='112'
              height='28'
            />
          </Link>
          <a
            onClick={() => {
              setisActive(!isActive);
            }}
            role='button'
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label='menu'
            aria-expanded='false'
            data-target='nav-links'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div
          id='nav-links'
          className={`${dark ? 'navbar-menublack' : ''} navbar-menu ${
            isActive ? 'is-active' : ''
          }`}>
          <div className='navbar-start'>
            <Link
              className={`${dark ? 'text-for-black' : ''} navbar-item jsi `}
              to='/'>
              Home
            </Link>
            {/* <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link' href='#'>
                Products
              </a>
              <div className='navbar-dropdown is-boxed'>
                <a className='navbar-item' href='#'>
                  Shirts
                </a>
                <a className='navbar-item' href='#'>
                  Pants
                </a>
                <a className='navbar-item' href='#'>
                  Caps
                </a>
                <a className='navbar-item' href='#'>
                  Jackets
                </a>
                <hr className='navbar-divider' />
                <a className='navbar-item' href='#'>
                  Masculine
                </a>
                <a className='navbar-item' href='#'>
                  Female
                </a>
              </div>
            </div> */}
            {/* 
            <Link className='navbar-item jsi' to='/news'>
              News
            </Link> */}
            {/* <Link className='navbar-item jsi' to='/offers'>
              Offers
            </Link> */}
            <Link
              className={`${dark ? 'text-for-black' : ''} navbar-item jsi `}
              to='/team'>
              Team
            </Link>

            <div className='navbar-item is-black'>
              <p className='control has-icons-right'>
                <input
                  onChange={(event) => {
                    handleInput(event);
                  }}
                  className='input'
                  type='text'
                  placeholder='Search product'
                />
              </p>
              <span className='icon is-small is-right'>
                <button
                  className='button'
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                  type='submit'>
                  <FaSearch />
                </button>
              </span>
            </div>
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='field is-grouped'>
                {session?.authenticated === true && (
                  <p className='control'>
                    <a className='button log-s' onClick={meow}>
                      <span className='icon'>
                        <RiLoginBoxFill className='fab' />
                      </span>
                      <span>Log Out</span>
                    </a>
                  </p>
                )}
                <p className='control'>
                  {session === null && (
                    <Link className='button log-s' to='/login'>
                      <span className='icon'>
                        <RiLoginBoxFill className='fab' />
                      </span>
                      <span>Log In</span>
                    </Link>
                  )}
                  {session === false && (
                    <Link className='button log-s' to='/login'>
                      <span className='icon'>
                        <RiLoginBoxFill className='fab' />
                      </span>
                      <span>Log In</span>
                    </Link>
                  )}
                  {session?.authenticated === false && (
                    <Link className='button log-s' to='/login'>
                      <span className='icon'>
                        <RiLoginBoxFill className='fab' />
                      </span>
                      <span>Log In</span>
                    </Link>
                  )}
                  {session?.authenticated === true &&
                    session.isAdmin === false && (
                      <Link className='button log-s' to='/user'>
                        <span className='icon'>
                          <RiLoginBoxFill className='fab' />
                        </span>
                        <span>User</span>
                      </Link>
                    )}
                  {session?.authenticated === true && session.isAdmin === true && (
                    <Link className='button log-s' to='/admin'>
                      <span className='icon'>
                        <RiLoginBoxFill className='fab' />
                      </span>
                      <span>Admin</span>
                    </Link>
                  )}
                </p>
                <p className='control'>
                  <Link className='button is-primary' to='/shop'>
                    <span className='icon'>
                      <FaShoppingCart className='fas' />
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
