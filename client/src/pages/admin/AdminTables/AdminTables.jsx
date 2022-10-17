/** @format */

import { useNavigate } from 'react-router-dom';
import { AdminNav, Loading } from '../../../components';
import { useState, useEffect } from 'react';

import './admintables.scss';
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight, BsThreeDots } from 'react-icons/bs';
import axios from 'axios';
import { checkAuth, getClothing } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TablesPagination } from './TablesPagination';

export const AdminTables = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);

  const clothing = useSelector((state) => state.allClothing);

  const [clothings, setClothing] = useState([]);
  const [allclothing, setAllClothing] = useState([]);

  const [user, setUser] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('authenticated')) {
      const { authenticated, isAdmin } = JSON.parse(
        localStorage.getItem('authenticated')
      );
      if (authenticated) {
        if (isAdmin === false) {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
    const users = async () => {
      const { token } = JSON.parse(localStorage.getItem('authenticated'));
      const usuarios = await axios.get(`http://localhost:3001/api/user/info`, {
        headers: { 'x-access-token': `${token}` },
      });
      const admis = await axios.get(
        `http://localhost:3001/api/user/adminsinfo`,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );
      setAll(usuarios.data.concat(admis.data));
      setUser(usuarios.data.concat(admis.data));
    };
    users();

    // const clo = async () => {
    //   const { token } = JSON.parse(localStorage.getItem('authenticated'));
    //   const clothing = await axios.get(`http://localhost:3001/api/user/info`, {
    //     headers: { 'x-access-token': `${token}` },
    //   });
    //   const admis = await axios.get(
    //     `http://localhost:3001/api/user/adminsinfo`,
    //     {
    //       headers: { 'x-access-token': `${token}` },
    //     }
    //   );
    //   setClothing(clothing.data);
    //   setAllClothing(clothing.data);
    // };
    // clo();

    dispatch(getClothing());

    if (localStorage.getItem('authenticated')) {
      const session = JSON.parse(localStorage.getItem('authenticated'));
      dispatch(checkAuth(session));
    }
  }, []);
  const [arrowNombre, setArrowNombre] = useState();
  const [arrowMaile, setArrowMaile] = useState();
  const [arrowCities, setArrowCities] = useState();

  useEffect(() => {
    const orden = () => {
      if (arrowNombre === true) {
        setUser(user.sort());
      } else if (arrowNombre === false) {
        setUser(user.reverse());
      }
    };
    orden();
  }, [arrowNombre]);

  const arrowName = () => {
    setArrowNombre(!arrowNombre);
    setArrowMaile(null);
    setArrowCities(null);
  };

  const arrowMail = () => {
    setArrowMaile(!arrowMaile);
    setArrowCities(null);
    setArrowNombre(null);
  };

  const arrowCity = () => {
    setArrowCities(!arrowCities);
    setArrowNombre(null);
    setArrowMaile(null);
  };

  const userSearch = (e) => {
    e.preventDefault();
    const usuario = e.target.value.toLowerCase().trim();

    if (usuario === '') {
      setUser(all);
    } else {
      setUser(
        user.filter((champion) =>
          champion.username.toLowerCase().startsWith(usuario)
        )
      );
    }
  };

  const newAdmin = async (userEmail, admin) => {
    admin = !admin;
    const { token } = JSON.parse(localStorage.getItem('authenticated'));
    const res = await axios({
      method: 'put',
      url: `http://localhost:3001/api/user/newadmin`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        email: `${userEmail}`,
        isAdmin: admin,
      },
    });
    if (res.status === 200) {
      window.location.reload();
    }
  };

  const changeShow = async (name, show) => {
    show = !show;
    const { token } = JSON.parse(localStorage.getItem('authenticated'));
    const res = await axios({
      method: 'put',
      url: `http://localhost:3001/api/clothing/showable`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        name,
        show,
      },
    });
    if (res.status === 200) {
      window.location.reload();
    }
  };

  const discountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleChangeDiscount = async (name) => {
    const { token } = JSON.parse(localStorage.getItem('authenticated'));

    const res = await axios({
      method: 'put',
      url: `http://localhost:3001/api/clothing/updateoffer`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        name,
        offer: discount,
      },
    });
  };

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleChangePrice = async (name) => {
    const { token } = JSON.parse(localStorage.getItem('authenticated'));

    const res = await axios({
      method: 'put',
      url: `http://localhost:3001/api/clothing/updateprice`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        name,
        price,
      },
    });
  };
  // PAGINADO USER
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [usersPage] = useState(12);
  const lastUser = currentPageUser * usersPage;
  const firtsUser = lastUser - usersPage;

  const currentUser = user.slice(firtsUser, lastUser);

  const paginadoU = (pageNumber) => {
    setCurrentPageUser(pageNumber);
  };

  return (
    <>
      {user.length <= 0 && all.length <= 0 && <Loading />}
      <div className='wrapper'>
        <div className='columns'>
          <AdminNav />
          <main className='column main'>
            <div className='card has-table has-mobile-sort-spaced'>
              <hr />
              <section className='hero is-hero-bar'>
                <div className='hero-body'>
                  <div className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <span className='icon'>
                          {/* <BiTachometer
                          className='mdi mdi-account default'
                          style={{
                            fontSize: '40px',
                          }}
                        /> */}
                        </span>

                        <h1 className='title'>Tables</h1>
                      </div>
                    </div>
                    <div
                      className='level-right'
                      style={{
                        display: 'none',
                      }}>
                      <div className='level-item'></div>
                    </div>
                  </div>
                </div>
              </section>

              <div className='card has-table'>
                <header className='card-header'>
                  <p className='card-header-title'>
                    <span className='icon'>
                      <i className='mdi mdi-account-multiple'></i>
                    </span>
                    Clothing
                  </p>

                  <div className='level-right'>
                    <div className='level-item'>
                      <form>
                        <div className='field has-addons'>
                          <div className='control'>
                            <input
                              type='text'
                              placeholder='Find any user...'
                              className='input'
                              onChange={userSearch}
                              autoComplete='off'
                            />
                          </div>
                          <div className='control'>
                            <button type='submit' className='button is-primary'>
                              <span>
                                <span className='icon'>
                                  <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    viewBox='0 0 16 16'
                                    className='mdi'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'></path>
                                  </svg>
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <a href='#' className='card-header-icon'>
                    <span className='icon'>
                      <i className='mdi mdi-reload'></i>
                    </span>
                  </a>
                </header>

                <div className='card-content'>
                  <div className='b-table has-pagination'>
                    <div className='table-wrapper has-mobile-cards'>
                      <table className='table is-fullwidth is-striped is-hoverable is-fullwidth'>
                        {/* <thead>
                          <tr>
                            <th className='is-checkbox-cell'>
                              <label className='b-checkbox checkbox'>
                                <input type='checkbox' value='false' />
                                <span className='check'></span>
                              </label>
                            </th>
                            <th></th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>City</th>
                            <th>Progress</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead> */}
                        <thead>
                          <tr>
                            <th className='checkbox-cell'>
                              <label className='b-checkbox checkbox'>
                                <input
                                  type='checkbox'
                                  autoComplete='off'
                                  true-value='true'
                                  value='false'
                                />
                                <span className='check'></span>
                                <span className='control-label'></span>
                              </label>
                            </th>
                            <th draggable='false' className=''>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  {/* {arrowNombre === true && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowNombre === false && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )} */}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable is-current-sort'>
                              <div className='th-wrap'>
                                <span
                                  className='is-relative'
                                  onClick={arrowName}>
                                  Name
                                  {arrowNombre === null && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowNombre === true && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowNombre === false && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable'>
                              <div className='th-wrap'>
                                <span
                                  className='is-relative'
                                  onClick={arrowMail}>
                                  Type
                                  {arrowMaile === null && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowMaile === true && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowMaile === false && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable'>
                              <div className='th-wrap'>
                                <span
                                  className='is-relative'
                                  onClick={arrowCity}>
                                  Price
                                  {arrowCities === null && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowCities === true && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowCities === false && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable'>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  Discount
                                  <span className='icon sort-icon is-small is-invisible'>
                                    <i className='mdi mdi-arrow-up'></i>
                                  </span>
                                </span>
                              </div>
                            </th>
                            <th draggable='false' className=''>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  Show
                                  <span className='icon sort-icon is-small is-invisible'>
                                    <i className='mdi mdi-arrow-up'></i>
                                  </span>
                                </span>
                              </div>
                            </th>
                            <th draggable='false' className=''>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  {' '}
                                  <span className='icon sort-icon is-small is-invisible'>
                                    <i className='mdi mdi-arrow-up'></i>
                                  </span>
                                </span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {clothing.map((cloth, index) => (
                            <tr key={index}>
                              <td className='is-checkbox-cell'>
                                <label className='b-checkbox checkbox'>
                                  <input type='checkbox' value='false' />
                                  <span className='check'></span>
                                </label>
                              </td>
                              <td className='is-image-cell'>
                                <div className='image'>
                                  <img
                                    src='https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg'
                                    className='is-rounded'
                                  />
                                </div>
                              </td>
                              <td data-label='Name'>{cloth.name}</td>
                              <td data-label='Type'>{cloth.category}</td>
                              <td data-label='Price'>
                                <input
                                  placeholder={cloth.price}
                                  onChange={priceChange}
                                  onBlur={() => {
                                    handleChangePrice(cloth.name);
                                  }}
                                />
                              </td>
                              <td className='admin' data-label='Admin'>
                                <input
                                  placeholder={cloth.discount}
                                  onChange={discountChange}
                                  onBlur={() =>
                                    handleChangeDiscount(cloth.name)
                                  }
                                />
                              </td>
                              {/* <td
                                data-label='Progress'
                                className='is-progress-cell'>
                                <progress
                                  max='100'
                                  className='progress is-small is-primary'
                                  value='79'>
                                  79
                                </progress>
                              </td> */}
                              <td
                                data-label='Show'
                                onClick={() =>
                                  changeShow(cloth.name, cloth.show)
                                }>
                                {cloth.show === true && 'yes'}
                                {cloth.show === false && 'no'}

                                {/* <small
                                  className='has-text-grey is-abbr-like'
                                  title='Oct 25, 2020'>
                                  Oct 25, 2020
                                </small> */}
                              </td>
                              <td className='is-actions-cell'>
                                <div className='buttons is-right'>
                                  <button
                                    className='button is-small is-primary'
                                    type='button'>
                                    <span className='icon'>
                                      <AiFillEdit className='mdi mdi-eye' />
                                    </span>
                                  </button>
                                  <button
                                    className='button is-small is-danger jb-modal'
                                    data-target='sample-modal'
                                    type='button'>
                                    <span className='icon'>
                                      <AiFillDelete className='mdi mdi-trash-can' />
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {/* <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Rebecca Bauch</td>
                          <td data-label='Company'>Daugherty-Daniel</td>
                          <td data-label='City'>South Cory</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='79'>
                              79
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Oct 25, 2020'>
                              Oct 25, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/felicita-yundt.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Felicita Yundt</td>
                          <td data-label='Company'>Johns-Weissnat</td>
                          <td data-label='City'>East Ariel</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='67'>
                              67
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Jan 8, 2020'>
                              Jan 8, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/mr-larry-satterfield-v.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Mr. Larry Satterfield V</td>
                          <td data-label='Company'>Hyatt Ltd</td>
                          <td data-label='City'>Windlerburgh</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='16'>
                              16
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Dec 18, 2020'>
                              Dec 18, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/mr-broderick-kub.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Mr. Broderick Kub</td>
                          <td data-label='Company'>
                            Kshlerin, Bauch and Ernser
                          </td>
                          <td data-label='City'>New Kirstenport</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='71'>
                              71
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Sep 13, 2020'>
                              Sep 13, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/barry-weber.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Barry Weber</td>
                          <td data-label='Company'>
                            Schulist, Mosciski and Heidenreich
                          </td>
                          <td data-label='City'>East Violettestad</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='80'>
                              80
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Jul 24, 2020'>
                              Jul 24, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/bert-kautzer-md.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Bert Kautzer MD</td>
                          <td data-label='Company'>Gerhold and Sons</td>
                          <td data-label='City'>Mayeport</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='62'>
                              62
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Mar 30, 2020'>
                              Mar 30, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/lonzo-steuber.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Lonzo Steuber</td>
                          <td data-label='Company'>Skiles Ltd</td>
                          <td data-label='City'>Marilouville</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='17'>
                              17
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Feb 12, 2020'>
                              Feb 12, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/jonathon-hahn.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Jonathon Hahn</td>
                          <td data-label='Company'>Flatley Ltd</td>
                          <td data-label='City'>Billiemouth</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='74'>
                              74
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Dec 30, 2020'>
                              Dec 30, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/ryley-wuckert.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Ryley Wuckert</td>
                          <td data-label='Company'>Heller-Little</td>
                          <td data-label='City'>Emeraldtown</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='54'>
                              54
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Jun 28, 2020'>
                              Jun 28, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='is-checkbox-cell'>
                            <label className='b-checkbox checkbox'>
                              <input type='checkbox' value='false' />
                              <span className='check'></span>
                            </label>
                          </td>
                          <td className='is-image-cell'>
                            <div className='image'>
                              <img
                                src='https://avatars.dicebear.com/v2/initials/sienna-hayes.svg'
                                className='is-rounded'
                              />
                            </div>
                          </td>
                          <td data-label='Name'>Sienna Hayes</td>
                          <td data-label='Company'>Conn, Jerde and Douglas</td>
                          <td data-label='City'>Jonathanfort</td>
                          <td
                            data-label='Progress'
                            className='is-progress-cell'>
                            <progress
                              max='100'
                              className='progress is-small is-primary'
                              value='55'>
                              55
                            </progress>
                          </td>
                          <td data-label='Created'>
                            <small
                              className='has-text-grey is-abbr-like'
                              title='Mar 7, 2020'>
                              Mar 7, 2020
                            </small>
                          </td>
                          <td className='is-actions-cell'>
                            <div className='buttons is-right'>
                              <button
                                className='button is-small is-primary'
                                type='button'>
                                <span className='icon'>
                                  <AiFillEdit className='mdi mdi-eye' />
                                </span>
                              </button>
                              <button
                                className='button is-small is-danger jb-modal'
                                data-target='sample-modal'
                                type='button'>
                                <span className='icon'>
                                  <AiFillDelete className='mdi mdi-trash-can' />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr> */}
                        </tbody>
                      </table>
                    </div>
                    <div className='notification'>
                      <div className='level'>
                        <div className='level-left'>
                          <div className='level-item'>
                            <div className='buttons has-addons'>
                              <button
                                type='button'
                                className='button is-active'>
                                1
                              </button>
                              <button type='button' className='button'>
                                2
                              </button>
                              <button type='button' className='button'>
                                3
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='level-right'>
                          <div className='level-item'>
                            <small>Page 1 of 3</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card has-table'>
                <header className='card-header'>
                  <p className='card-header-title'>
                    <span className='icon'>
                      <i className='mdi mdi-account-multiple'></i>
                    </span>
                    Clients
                  </p>

                  <div className='level-right'>
                    <div className='level-item'>
                      <form>
                        <div className='field has-addons'>
                          <div className='control'>
                            <input
                              type='text'
                              placeholder='Find any user...'
                              className='input'
                              onChange={userSearch}
                              autoComplete='off'
                            />
                          </div>
                          <div className='control'>
                            <button type='submit' className='button is-primary'>
                              <span>
                                <span className='icon'>
                                  <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    viewBox='0 0 16 16'
                                    className='mdi'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'></path>
                                  </svg>
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <a href='#' className='card-header-icon'>
                    <span className='icon'>
                      <i className='mdi mdi-reload'></i>
                    </span>
                  </a>
                </header>

                <div className='card-content'>
                  <div className='b-table has-pagination'>
                    <div className='table-wrapper has-mobile-cards'>
                      <table className='table is-fullwidth is-striped is-hoverable is-fullwidth'>
                        {/* <thead>
                          <tr>
                            <th className='is-checkbox-cell'>
                              <label className='b-checkbox checkbox'>
                                <input type='checkbox' value='false' />
                                <span className='check'></span>
                              </label>
                            </th>
                            <th></th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>City</th>
                            <th>Progress</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead> */}
                        <thead>
                          <tr>
                            <th className='checkbox-cell'>
                              <label className='b-checkbox checkbox'>
                                <input
                                  type='checkbox'
                                  autoComplete='off'
                                  true-value='true'
                                  value='false'
                                />
                                <span className='check'></span>
                                <span className='control-label'></span>
                              </label>
                            </th>
                            <th draggable='false' className=''>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  {arrowNombre === true && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowNombre === false && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable is-current-sort'>
                              <div className='th-wrap'>
                                <span
                                  className='is-relative'
                                  onClick={arrowName}>
                                  Name
                                  {arrowNombre === null && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowNombre === true && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowNombre === false && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable'>
                              <div className='th-wrap'>
                                <span
                                  className='is-relative'
                                  onClick={arrowMail}>
                                  Mail
                                  {arrowMaile === null && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowMaile === true && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowMaile === false && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable'>
                              <div className='th-wrap'>
                                <span
                                  className='is-relative'
                                  onClick={arrowCity}>
                                  City
                                  {arrowCities === null && (
                                    <span className='icon sort-icon is-small is-invisible'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowCities === true && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowUp className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                  {arrowCities === false && (
                                    <span className='icon sort-icon is-small'>
                                      <AiOutlineArrowDown className='mdi mdi-arrow-up' />
                                    </span>
                                  )}
                                </span>
                              </div>
                            </th>
                            <th
                              draggable='false'
                              className='is-sortable is-unselectable'>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  Admin
                                  <span className='icon sort-icon is-small is-invisible'>
                                    <i className='mdi mdi-arrow-up'></i>
                                  </span>
                                </span>
                              </div>
                            </th>
                            <th draggable='false' className=''>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  {' '}
                                  Created{' '}
                                  <span className='icon sort-icon is-small is-invisible'>
                                    <i className='mdi mdi-arrow-up'></i>
                                  </span>
                                </span>
                              </div>
                            </th>
                            <th draggable='false' className=''>
                              <div className='th-wrap'>
                                <span className='is-relative'>
                                  {' '}
                                  <span className='icon sort-icon is-small is-invisible'>
                                    <i className='mdi mdi-arrow-up'></i>
                                  </span>
                                </span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log(user)}
                          {user.map((user, index) => (
                            <tr key={index}>
                              <td className='is-checkbox-cell'>
                                <label className='b-checkbox checkbox'>
                                  <input type='checkbox' value='false' />
                                  <span className='check'></span>
                                </label>
                              </td>
                              <td className='is-image-cell'>
                                <div className='image'>
                                  <img
                                    src='https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg'
                                    className='is-rounded'
                                  />
                                </div>
                              </td>
                              <td data-label='Name'>{user.username}</td>
                              <td data-label='Mail'>{user.email}</td>
                              <td data-label='City'>{user.country}</td>
                              <td
                                className='admin'
                                data-label='Admin'
                                onClick={() =>
                                  newAdmin(user.email, user.isAdmin)
                                }>
                                {user.isAdmin === true && 'yes'}
                                {user.isAdmin === false && 'no'}
                              </td>
                              {/* <td
                                data-label='Progress'
                                className='is-progress-cell'>
                                <progress
                                  max='100'
                                  className='progress is-small is-primary'
                                  value='79'>
                                  79
                                </progress>
                              </td> */}
                              <td data-label='Created'>
                                <small
                                  className='has-text-grey is-abbr-like'
                                  title='Oct 25, 2020'>
                                  Oct 25, 2020
                                </small>
                              </td>
                              <td className='is-actions-cell'>
                                <div className='buttons is-right'>
                                  <button
                                    className='button is-small is-primary'
                                    type='button'>
                                    <span className='icon'>
                                      <AiFillEdit className='mdi mdi-eye' />
                                    </span>
                                  </button>
                                  <button
                                    className='button is-small is-danger jb-modal'
                                    data-target='sample-modal'
                                    type='button'>
                                    <span className='icon'>
                                      <AiFillDelete className='mdi mdi-trash-can' />
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <TablesPagination
                      productsPage={usersPage}
                      clothing={user.length}
                      paginado={paginadoU}
                      currentPage={currentPageUser}
                      setCurrentPage={setCurrentPageUser}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
