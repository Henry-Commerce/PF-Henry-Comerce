/** @format */

import { Link, useLocation } from 'react-router-dom';
import { FaTable } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { IoMenuSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';

export const AdminNav = ({ dark }) => {
  const location = useLocation();
  const [active, setActive] = useState('');

  useEffect(() => {
    switch (location.pathname) {
      case '/admin':
        setActive('dashboard');
        break;
      case '/admin/users':
        setActive('users');
        break;
      case '/admin/add':
        setActive('add');
        break;
      case '/admin/profile':
        setActive('profile');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <aside
      className={`${
        dark ? 'has-background-black' : ''
      } column is-2 aside is-placed-left is-expanded`}>
      <div className='menu is-menu-main'>
        <p className='pb-1'></p>
        <ul className='menu-list'>
          <li>
            <Link
              to='/admin'
              className={`${dark ? 'text-for-black' : ''} has-icon ${
                active === 'dashboard' ? 'is-active' : ''
              }`}>
              <span className='icon'>
                <i className='mdi mdi-desktop-mac'></i>
              </span>
              <span className='menu-item-label'>Dashboard</span>
            </Link>
          </li>
        </ul>
        <p className='menu-label pr-1'>Administration</p>
        <ul className='menu-list'>
          <li>
            <Link
              to='/admin/users'
              className={`${dark ? 'text-for-black' : ''} has-icon ${
                active === 'users' ? 'is-active' : ''
              }`}>
              <span className='icon has-update-mark'>
                {/* <i className='mdi mdi-table'></i> */}
                <FaTable />
              </span>

              <span className='menu-item-label'>Tables</span>
            </Link>
          </li>

          <li>
            <Link
              to='/admin/add'
              className={`${dark ? 'text-for-black' : ''} has-icon ${
                active === 'add' ? 'is-active' : ''
              }`}>
              <span className='icon has-update-mark'>
                {/* <i className='mdi mdi-table'></i> */}
                <IoMdAdd />
              </span>
              <span className='menu-item-label'>Add new product</span>
            </Link>
          </li>

          <li>
            <Link
              to='/admin/profile'
              className={`${dark ? 'text-for-black' : ''} has-icon ${
                active === 'profile' ? 'is-active' : ''
              }`}>
              <span className='icon has-update-mark'>
                {/* <i className='mdi mdi-table'></i> */}

                <CgProfile />
              </span>
              <span className='menu-item-label'>Profile</span>
            </Link>
          </li>

          {/* <li className='is-active'>
            <a className='has-icon has-dropdown-icon'>
              <span className='icon'>
                <IoMenuSharp className='mdi mdi-view-list' />
              </span>
              <span className='menu-item-label'>Submenus</span>
              <div className='dropdown-icon'>
                <span className='icon'>
                  <i className='mdi mdi-plus'></i>
                </span>
              </div>
            </a>
            <ul>
              <li>
                <a href='#void'>
                  <span>Sub-item One</span>
                </a>
              </li>
              <li>
                <a href='#void'>
                  <span>Sub-item Two</span>
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
        {/* <p className='menu-label'>About</p>
        <ul className='menu-list'>
          <li>
            <a
              href='https://github.com/AlyxZain'
              target='_blank'
              className='has-icon'>
              <span className='icon'>
                <i className='mdi mdi-github-circle'></i>
              </span>
              <span className='menu-item-label'>GitHub</span>
            </a>
          </li>
          <li>
            <a href='#' className='has-icon'>
              <span className='icon'>
                <i className='mdi mdi-help-circle'></i>
              </span>
              <span className='menu-item-label'>About</span>
            </a>
          </li>
        </ul> */}
      </div>
    </aside>
  );
};
