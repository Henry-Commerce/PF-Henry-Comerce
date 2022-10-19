/** @format */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AdminNav, Loading } from '../../../components';
import './main.scss';
import { BiTachometer } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { checkAuth } from '../../../redux/actions';
import { Map } from '../../../components/Map/Map';
import { AdminMap } from '../../../components/AdminMap/AdminMap';

export const AdminDashboard = ({ dark }) => {
  const [numberUsers, setNumberUsers] = useState(false);
  const [numberAdmins, setNumberAdmins] = useState(false);
  const [numberAccounts, setNumberAccounts] = useState(false);
  const [day, setDay] = useState(false);

  var hoy = new Date();
  var fecha =
    hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState({
    lat: 0,
    lng: 0,
  });
  const [nameOfBranch, setNameOfBranch] = useState('');

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
      const users = await axios.get(`https://pfapi.vercel.app/api/user/info`, {
        headers: { 'x-access-token': `${token}` },
      });
      const admis = await axios.get(
        `https://pfapi.vercel.app/api/user/adminsinfo`,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );
      setNumberAdmins(admis.data.length);
      // console.log(numberAdmins);

      setNumberUsers(users.data.length);
      // console.log(numberUsers);

      setNumberAccounts(admis.data.length + users.data.length);
      // console.log(numberAccounts);

      setDay(fecha);
    };
    users();

    if (localStorage.getItem('authenticated')) {
      const session = JSON.parse(localStorage.getItem('authenticated'));
      dispatch(checkAuth(session));
    }
  }, []);

  const nameBranch = (e) => {
    setNameOfBranch(e.target.value);
  };

  const addBranch = async (e) => {
    e.preventDefault();
    setSelected(selected);
    const { lat, lng } = selected;
    const { token } = JSON.parse(localStorage.getItem('authenticated'));
    const branch = await axios({
      method: 'post',
      url: `https://pfapi.vercel.app/api/branch/add`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        street: `${nameOfBranch}`,
        coordinates: {
          lat,
          lng,
        },
      },
    });
    if (branch.status === 200) {
      window.location.reload();
    }
    console.log('Branch', branch);
  };

  return (
    <>
      {numberUsers === false && numberAdmins === false && <Loading />}
      {numberUsers && numberAccounts && (
        <div className='wrapper'>
          <div className='columns'>
            <AdminNav dark={dark} />
            <main
              className={`${dark ? 'has-background-black' : ''} column main`}>
              {/* <nav className='breadcrumb is-small pt-3' aria-label='breadcrumbs'>
            <ul>
              <li>
                <a href='#'>Home</a>
              </li>
              <li className='is-active'>
                <a href='#' aria-current='page'>
                  Dashboard
                </a>
              </li>
            </ul>
          </nav> */}
              <section
                className={`${
                  dark
                    ? 'is-black has-background-black'
                    : 'has-background-light'
                } hero is-hero-bar`}>
                <div className='hero-body'>
                  <div className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <span className='icon'>
                          <BiTachometer
                            className='mdi mdi-account default'
                            style={{
                              fontSize: '40px',
                            }}
                          />
                        </span>

                        <h1 className='title'>Dashboard</h1>
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

              <section className='section is-main-section'>
                <div className='tile is-ancestor'>
                  <div className='tile is-parent'>
                    <div
                      className={`${
                        dark ? 'has-background-black border-yellow' : ''
                      } card tile is-child`}>
                      <div className='card-content'>
                        <div className='level is-mobile'>
                          <div className='level-item'>
                            <div className='is-widget-label'>
                              <h3
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } subtitle is-spaced`}>
                                Clients
                              </h3>
                              <h1
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } title`}>
                                {numberUsers}
                              </h1>
                            </div>
                          </div>
                          <div className='level-item has-widget-icon'>
                            <div className='is-widget-icon'>
                              <span className='icon has-text-primary is-large'>
                                <i className='mdi mdi-account-multiple mdi-48px'></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='tile is-parent'>
                    <div
                      className={`${
                        dark ? 'has-background-black border-yellow' : ''
                      } card tile is-child`}>
                      <div className='card-content'>
                        <div className='level is-mobile'>
                          <div className='level-item'>
                            <div className='is-widget-label'>
                              <h3
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } subtitle is-spaced`}>
                                Sales
                              </h3>
                              <h1
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } title`}>
                                $7,770
                              </h1>
                            </div>
                          </div>
                          <div className='level-item has-widget-icon'>
                            <div className='is-widget-icon'>
                              <span className='icon has-text-info is-large'>
                                <i className='mdi mdi-cart-outline mdi-48px'></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='tile is-parent'>
                    <div
                      className={`${
                        dark ? 'has-background-black border-yellow' : ''
                      } card tile is-child`}>
                      <div className='card-content'>
                        <div className='level is-mobile'>
                          <div className='level-item'>
                            <div className='is-widget-label'>
                              <h3
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } subtitle is-spaced`}>
                                Performance
                              </h3>
                              <h1
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } title`}>
                                256%
                              </h1>
                            </div>
                          </div>
                          <div className='level-item has-widget-icon'>
                            <div className='is-widget-icon'>
                              <span className='icon has-text-success is-large'>
                                <i className='mdi mdi-finance mdi-48px'></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    dark ? 'has-background-black border-yellow' : ''
                  } card`}>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      <span className='icon'>
                        <i className='mdi mdi-finance default'></i>
                      </span>
                      <span className={`${dark ? 'text-for-black' : ''} `}>
                        Branch Map
                      </span>
                    </p>
                    <a
                      href='#'
                      aria-label='more options'
                      className='card-header-icon'>
                      <span className='icon'>
                        <i className='mdi mdi-reload default'></i>
                      </span>
                    </a>
                  </header>
                  <div className='card-content'>
                    <div className='chart-area'>
                      <AdminMap
                        setSelected={setSelected}
                        selected={selected}
                        dark={dark}
                      />
                      {/* <div
                        className=''
                        style={{
                          height: '100%',
                        }}>
                        <div className='chartjs-size-monitor'>
                          <div className='chartjs-size-monitor-expand'>
                            <div className=''></div>
                          </div>
                          <div className='chartjs-size-monitor-shrink'>
                            <div className=''></div>
                          </div>
                        </div>
                        <canvas
                          id='big-line-chart'
                          width='1271'
                          height='500'
                          style={{
                            display: 'block',
                            height: '400px',
                            // width: '856px',
                          }}
                          className='chartjs-render-monitor'></canvas>
                      </div> */}
                    </div>
                  </div>
                </div>

                <hr className={`${dark ? 'has-background-dark' : ''}`} />
                <div className='columns is-desktop'>
                  <div className='column'>
                    <div
                      className={`${
                        dark ? 'has-background-black' : ''
                      }card is-scrollable-height-medium`}>
                      <header className='card-header'>
                        <p className='card-header-title'>
                          <span className='icon'>
                            <i className='mdi mdi-comment-multiple-outline default'></i>
                          </span>
                          <span className={`${dark ? 'text-for-black' : ''}`}>
                            Create new branch
                          </span>
                        </p>
                        <button
                          type='button'
                          className='button button is-small'>
                          <span>
                            <span className='icon'>
                              <FiRefreshCcw className='mdi mdi-refresh default' />
                            </span>
                            <span>Refresh</span>
                          </span>
                        </button>
                      </header>
                      <div
                        className={`${
                          dark ? 'notification-black' : 'notification'
                        } is-card-toolbar is-upper is-upper`}>
                        <div className='level'>
                          <div className='level-left'>
                            <div className='level-item'>
                              <div
                                className={`${dark ? 'text-for-black' : ''}`}>
                                First find the site of the next branch on the
                                map
                              </div>
                            </div>
                          </div>
                          <div className='level-right'>
                            <div className='level-item'>
                              <span className='tag is-warning'>
                                <span>Warning</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-content'>
                        <form>
                          <div className='field is-horizontal'>
                            <div className='field-label is-normal'>
                              <label className='label'>Name of branch</label>
                            </div>
                            <div className='field-body'>
                              <div className='field'>
                                <div className='control'>
                                  <input
                                    type='text'
                                    autoComplete='on'
                                    name='name'
                                    // value='John Doe'
                                    onChange={nameBranch}
                                    className='input'
                                    required=''
                                  />
                                </div>
                                {/* <p className='help'>Required. Your name</p> */}
                              </div>
                            </div>
                          </div>
                          <div className='field is-horizontal'>
                            <div className='field-label is-normal'>
                              <label className='label'>Latitud</label>
                            </div>
                            <div className='field-body'>
                              <div className='field'>
                                <div className='control'>
                                  <input
                                    type='text'
                                    autoComplete='on'
                                    name='name'
                                    value={selected?.lat}
                                    // onChange={nombresito}
                                    className='input'
                                    required=''
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='field is-horizontal'>
                            <div className='field-label is-normal'>
                              <label className='label'>longitud</label>
                            </div>
                            <div className='field-body'>
                              <div className='field'>
                                <div className='control'>
                                  <input
                                    type='text'
                                    autoComplete='on'
                                    name='name'
                                    value={selected?.lng}
                                    // onChange={nombresito}
                                    className='input'
                                    required=''
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr
                            className={`${dark ? 'has-background-dark' : ''}`}
                          />
                          <div className='field is-horizontal'>
                            <div className='field-label is-normal'></div>
                            <div className='field-body'>
                              <div className='field'>
                                <div className='control'>
                                  <button
                                    type='submit'
                                    className='button is-primary'
                                    onClick={addBranch}>
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                        {/* <div className='media-list'>
                          <div
                            className='loading-overlay is-active'
                            style={{
                              display: 'none',
                            }}>
                            <div className='loading-background'></div>
                            <div className='loading-icon'></div>
                          </div>
                          <article className='media has-media-left'>
                            <figure className='media-left'>
                              <p className='image is-64x64'>
                                <img
                                  src='https://avatars.dicebear.com/v2/gridy/Ms.-Lora-Kiehn.svg'
                                  className='is-rounded'
                                />
                              </p>
                            </figure>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Ms. Lora Kiehn</strong>
                                  <small>@ena.wiegand</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ut nemo sunt vero tenetur eos ducimus
                                  laboriosam. Vel dignissimos repellendus dolor
                                  temporibus deleniti.{' '}
                                </p>
                              </div>
                              <nav className='level is-mobile'>
                                <div className='level-left'>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-reply default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-twitter-retweet default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-heart-outline default'></i>
                                    </span>
                                  </a>
                                </div>
                              </nav>
                            </div>
                          </article>
                          <article className='media has-media-left'>
                            <figure className='media-left'>
                              <p className='image is-64x64'>
                                <img
                                  src='https://avatars.dicebear.com/v2/gridy/Prof.-Vince-Orn-DDS.svg'
                                  className='is-rounded'
                                />
                              </p>
                            </figure>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Prof. Vince Orn DDS</strong>
                                  <small>@brady.cassin</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ut inventore a qui velit quia dolorem modi
                                  autem. Sit in a quos a sed iure delectus
                                  aperiam. Consectetur sint hic assumenda
                                  laborum quia repellat quas.{' '}
                                </p>
                              </div>
                              <nav className='level is-mobile'>
                                <div className='level-left'>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-reply default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-twitter-retweet default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-heart-outline default'></i>
                                    </span>
                                  </a>
                                </div>
                              </nav>
                            </div>
                          </article>
                          <article className='media has-media-left'>
                            <figure className='media-left'>
                              <p className='image is-64x64'>
                                <img
                                  src='https://avatars.dicebear.com/v2/gridy/Junius-Simonis-DVM.svg'
                                  className='is-rounded'
                                />
                              </p>
                            </figure>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Junius Simonis DVM</strong>
                                  <small>@johns.cedrick</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Culpa esse voluptatum est et nam quia sed
                                  expedita. Voluptatem non deleniti itaque
                                  officia quibusdam vitae nihil aut. Est est
                                  dicta qui magnam.{' '}
                                </p>
                              </div>
                              <nav className='level is-mobile'>
                                <div className='level-left'>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-reply default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-twitter-retweet default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-heart-outline default'></i>
                                    </span>
                                  </a>
                                </div>
                              </nav>
                            </div>
                          </article>
                          <article className='media has-media-left'>
                            <figure className='media-left'>
                              <p className='image is-64x64'>
                                <img
                                  src='https://avatars.dicebear.com/v2/gridy/Ally-Schroeder-Sr..svg'
                                  className='is-rounded'
                                />
                              </p>
                            </figure>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Ally Schroeder Sr.</strong>
                                  <small>@pollich.kaleb</small>
                                  <small className='has-text-grey'>
                                    2 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Non dolore quibusdam aut id voluptas minima.
                                  Enim aut aliquid optio accusamus libero earum
                                  animi nihil. Qui voluptates doloremque
                                  eveniet.{' '}
                                </p>
                              </div>
                              <nav className='level is-mobile'>
                                <div className='level-left'>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-reply default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-twitter-retweet default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-heart-outline default'></i>
                                    </span>
                                  </a>
                                </div>
                              </nav>
                            </div>
                          </article>
                          <article className='media has-media-left'>
                            <figure className='media-left'>
                              <p className='image is-64x64'>
                                <img
                                  src='https://avatars.dicebear.com/v2/gridy/Ms.-Aracely-Johnson.svg'
                                  className='is-rounded'
                                />
                              </p>
                            </figure>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Ms. Aracely Johnson</strong>
                                  <small>@ewatsica</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ab voluptatem officiis nobis sed perferendis.
                                  Expedita magnam dolor nemo cumque veniam
                                  impedit occaecati. Mollitia numquam neque
                                  voluptas laborum corrupti.{' '}
                                </p>
                              </div>
                              <nav className='level is-mobile'>
                                <div className='level-left'>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-reply default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-twitter-retweet default'></i>
                                    </span>
                                  </a>
                                  <a className='level-item'>
                                    <span className='icon'>
                                      <i className='mdi mdi-heart-outline default'></i>
                                    </span>
                                  </a>
                                </div>
                              </nav>
                            </div>
                          </article>
                        </div> */}
                      </div>
                      <hr className={`${dark ? 'has-background-dark' : ''}`} />
                      {/* <footer className='card-footer'>
                        <a className='card-footer-item'>
                          <span className='icon'>
                            <i className='mdi mdi-autorenew default'></i>
                          </span>
                          <span>Load more</span>
                        </a>
                      </footer> */}
                    </div>
                  </div>
                  <div className='column'>
                    <div
                      className={`${
                        dark ? 'has-background-black' : ''
                      }card is-scrollable-height-medium`}>
                      <header className='card-header'>
                        <p className='card-header-title'>
                          <span className='icon'>
                            <i className='mdi mdi-animation-outline default'></i>
                          </span>
                          <span className={`${dark ? 'text-for-black' : ''}`}>
                            Updates
                          </span>
                        </p>
                        <button
                          type='button'
                          className='button button is-small'>
                          <span>
                            <span className='icon'>
                              <FiRefreshCcw className='mdi mdi-refresh default' />
                            </span>
                            <span>Refresh</span>
                          </span>
                        </button>
                      </header>
                      <div
                        className={`${
                          dark ? 'notification-black' : 'notification'
                        } is-card-toolbar is-upper is-upper`}>
                        <div className='level'>
                          <div className='level-left'>
                            <div className='level-item'>
                              <div
                                className={`${dark ? 'text-for-black' : ''}`}>
                                {' '}
                                You're up to date :-){' '}
                              </div>
                            </div>
                          </div>
                          <div className='level-right'>
                            <div className='level-item'>
                              <span className='tag is-success'>
                                <span>All done</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-content'>
                        {/* <div className='media-list'>
                          <div
                            className='loading-overlay is-active'
                            style={{
                              display: 'none',
                            }}>
                            <div className='loading-background'></div>
                            <div className='loading-icon'></div>
                          </div>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Dahlia Dibbert</strong>
                                  <small>@margarett.schmidt</small>
                                  <small className='has-text-grey'>
                                    22 hours ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Omnis excepturi sed quas occaecati. Vitae sed
                                  inventore consequuntur quos et. Nihil iste
                                  molestias ducimus quas natus qui.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Sigmund Abbott</strong>
                                  <small>@xdaniel</small>
                                  <small className='has-text-grey'>
                                    2 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Et quam aut aperiam expedita eos sit. Autem
                                  accusantium impedit debitis. Ea dolores at
                                  rerum. Dolorem et quia iusto modi non atque
                                  ea. Sunt ipsam sint aliquam eveniet quaerat
                                  et.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Hertha Simonis</strong>
                                  <small>@alverta.bernhard</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Optio laboriosam illo consectetur hic.
                                  Perspiciatis veritatis suscipit assumenda
                                  porro a vero necessitatibus ipsa.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Mrs. Elise Corwin I</strong>
                                  <small>@lisandro35</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Est in et aliquid mollitia. Nesciunt autem
                                  aspernatur veniam non. Ducimus et et
                                  voluptatibus voluptas aut. Aut est aliquid qui
                                  amet id.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Dominique Douglas</strong>
                                  <small>@xwalker</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Possimus quas velit consequatur cumque minima
                                  et eos. Et ab ut et consequatur. Assumenda
                                  mollitia quas saepe ad adipisci error.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Dr. Abbie Hilpert II</strong>
                                  <small>@kathlyn.bogan</small>
                                  <small className='has-text-grey'>
                                    1 week ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Adipisci consequuntur nulla aut perferendis
                                  quidem non. Sed suscipit enim omnis ut quis
                                  quibusdam. Commodi dolor ut et velit ut.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Prof. Vince Orn DDS</strong>
                                  <small>@brady.cassin</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ut inventore a qui velit quia dolorem modi
                                  autem. Sit in a quos a sed iure delectus
                                  aperiam. Consectetur sint hic assumenda
                                  laborum quia repellat quas.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Gudrun Stark V</strong>
                                  <small>@zdooley</small>
                                  <small className='has-text-grey'>1 day ago</small>
                                </p>
                                <p>
                                  {' '}
                                  Iste officiis magnam voluptatibus quasi aut.
                                  Ut aperiam vitae quia dolore. Rem sit
                                  doloremque ut aliquam cupiditate et
                                  voluptatibus.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Hertha Simonis</strong>
                                  <small>@alverta.bernhard</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ducimus doloribus autem maxime voluptatem
                                  eligendi aut aut. Velit unde accusamus
                                  blanditiis harum incidunt id iste. Dicta
                                  debitis eos non unde numquam.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Favian Turcotte</strong>
                                  <small>@zetta73</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Fuga eum veritatis placeat cumque rerum.
                                  Voluptates ullam id veritatis est a ullam.
                                  Maxime eos aut qui reiciendis accusantium et.
                                  Voluptatibus quis voluptatem est nihil
                                  recusandae.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Gudrun Stark V</strong>
                                  <small>@zdooley</small>
                                  <small className='has-text-grey'>
                                    5 days ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Qui architecto ut sequi quasi nesciunt
                                  perspiciatis deserunt facere. Quae ipsa
                                  exercitationem illo quia nostrum ex. Error aut
                                  odio est nihil aut dolor.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Lauriane Brakus</strong>
                                  <small>@xtremblay</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Consequuntur accusantium reprehenderit facilis
                                  deleniti tempora. Et perspiciatis quo atque
                                  id. Aut quam asperiores et temporibus odit.
                                  Delectus rem rerum autem et ipsum quo fugit.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Prof. Amelie Mann</strong>
                                  <small>@mario53</small>
                                  <small className='has-text-grey'>
                                    2 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Quaerat est saepe saepe corporis quia
                                  architecto vitae quia. Ut a incidunt nesciunt
                                  assumenda voluptatibus.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Werner Kuvalis</strong>
                                  <small>@hudson32</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Rerum quia repellendus nam aspernatur itaque
                                  quidem. Consequuntur architecto deserunt
                                  aliquam. Nesciunt ut et similique earum
                                  dolorem. Similique minus amet et dicta quis
                                  distinctio doloremque.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Brandy Gleason</strong>
                                  <small>@rbashirian</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Provident nulla nesciunt necessitatibus
                                  eligendi culpa tenetur blanditiis iusto.
                                  Itaque magni nihil rerum ut ut ipsam totam.
                                  Officia ut possimus earum molestias delectus
                                  recusandae dolorem veniam.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                        </div> */}
                      </div>
                      {/* <footer className='card-footer'>
                        <a className='card-footer-item'>
                          <span className='icon'>
                            <i className='mdi mdi-autorenew default'></i>
                          </span>
                          <span>Load more</span>
                        </a>
                      </footer> */}
                    </div>
                  </div>
                </div>
              </section>

              {/* <div className='card has-table has-mobile-sort-spaced'>
                <div className='columns is-multiline'>
                  <div className='column'>
                    <div
                      className='box notification is-yellow'
                      style={{
                        marginTop: '10px',
                      }}>
                      <div className='heading'>Top Seller Total</div>
                      <div className='title'>56,950</div>
                      <div className='level'>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Sales $</div>
                            <div className='title is-5'>250K</div>
                          </div>
                        </div>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Overall $</div>
                            <div className='title is-5'>750K</div>
                          </div>
                        </div>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Sales %</div>
                            <div className='title is-5'>25%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='column '>
                    <div
                      className='box notification is-warning'
                      style={{
                        marginTop: '10px',
                      }}>
                      <div className='heading'>Accounts</div>
                      <div className='title'>{numberAccounts}</div>

                      <div className='level'>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading '>Users</div>
                            <div className='title is-5'>{numberUsers}</div>
                          </div>
                        </div>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading '>Admins</div>
                            <div className='title is-5'>{numberAdmins}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='column'>
                    <div
                      className='box notification is-info'
                      style={{
                        marginTop: '10px',
                      }}>
                      <div className='heading'>Feedback Comments</div>
                      <div className='title'>78% &uarr;</div>
                      <div className='level'>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Pos</div>
                            <div className='title is-5'>1560</div>
                          </div>
                        </div>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Neg</div>
                            <div className='title is-5 '>368</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='column'>
                    <div
                      className='box notification is-danger'
                      style={{
                        marginTop: '10px',
                      }}>
                      <div className='heading'>Orders / Returns</div>
                      <div className='title'>75% / 25%</div>
                      <div className='level'>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Orders $</div>
                            <div className='title is-5'>425K</div>
                          </div>
                        </div>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Returns $</div>
                            <div className='title is-5'>106K</div>
                          </div>
                        </div>
                        <div className='level-item'>
                          <div className=''>
                            <div className='heading'>Success %</div>
                            <div className='title is-5'>+ 28,5%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='columns is-multiline'>
                  <div className='column is-6'>
                    <article className='message is-dark'>
                      <div className='message-header'>
                        <p>Chart</p>
                      </div>
                      <div className='message-body'>
                        <div
                          id='chartLine'
                          style={{
                            width: '100%',
                          }}></div>
                      </div>
                    </article>
                  </div>
                  <div className='column is-6'>
                    <article className='message is-dark'>
                      <div className='message-header'>
                        <p>Chart</p>
                      </div>
                      <div className='message-body'>
                        <div
                          id='chartScatter'
                          style={{
                            width: '100%',
                          }}></div>
                      </div>
                    </article>
                  </div>
                  <div className='column is-6'>
                    <article className='message is-dark'>
                      <div className='message-header'>
                        <p>Chart</p>
                      </div>
                      <div className='message-body'>
                        <div
                          id='chartDoughnut'
                          style={{
                            width: '100%',
                          }}></div>
                      </div>
                    </article>
                  </div>
                  <div className='column is-6'>
                    <article className='message is-dark'>
                      <div className='message-header'>
                        <p>Chart</p>
                      </div>
                      <div className='message-body'>
                        <div
                          id='chartBar'
                          style={{
                            width: '100%',
                          }}></div>
                      </div>
                    </article>
                  </div>
                </div>
              </div> */}
            </main>
          </div>
        </div>
      )}
    </>
  );
};
