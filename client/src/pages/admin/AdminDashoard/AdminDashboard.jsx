/** @format */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AdminNav, Loading } from '../../../components';
import './main.scss';
import { BiTachometer } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { HiLocationMarker } from 'react-icons/hi';

import { useDispatch } from 'react-redux';
import { checkAuth } from '../../../redux/actions';
import { Map } from '../../../components/Map/Map';
import { AdminMap } from '../../../components/AdminMap/AdminMap';

export const AdminDashboard = ({ dark }) => {
  const [numberUsers, setNumberUsers] = useState(false);
  const [numberAdmins, setNumberAdmins] = useState(false);
  const [numberAccounts, setNumberAccounts] = useState(false);
  const [comments, setComments] = useState([]);

  const [meow, setMeow] = useState([]);
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

    const commentarios = async () => {
      const { token } = JSON.parse(localStorage.getItem('authenticated'));
      const comment = await axios.get(
        `https://pfapi.vercel.app/api/clothing/allreviews`,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );
      setComments(comment.data[0].comments);
      console.log('commentarios', comment.data[0]);
    };

    commentarios();

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

      setNumberUsers(users.data.length);

      setNumberAccounts(admis.data.length + users.data.length);

      console.log('users', admis.data.concat(users.data));
      setMeow(admis.data.concat(users.data));
      // console.log('admins', users.data);
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
                      // style={{
                      //   display: 'none',
                      // }}
                    >
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
                  {/* <div className='tile is-parent'>
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
                  </div> */}
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
                                Admins
                              </h3>
                              <h1
                                className={`${
                                  dark ? 'text-for-black' : ''
                                } title`}>
                                {numberAdmins}
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
                            <HiLocationMarker className='mdi mdi-comment-multiple-outline default' />
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
                            <VscCommentDiscussion className='mdi mdi-comment-multiple-outline default' />
                          </span>
                          <span className={`${dark ? 'text-for-black' : ''}`}>
                            Recent Comments
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
                                Something important to note{' '}
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
                        <div className='media-list'>
                          <div
                            className='loading-overlay is-active'
                            // style={{
                            //   display: 'none;',
                            // }}
                          >
                            <div className='loading-background'></div>
                            <div className='loading-icon'></div>
                          </div>
                          {comments ? (
                            comments.map((comment, index) => (
                              <article className='media has-media-left'>
                                <figure className='media-left'>
                                  <p className='image '>
                                    <img
                                      src='https://res.cloudinary.com/dmk0kmt7d/image/upload/v1665969945/blsyqex8mixxmqwhdmmh.png'
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                      }}
                                      className='is-rounded'
                                    />
                                  </p>
                                </figure>
                                <div className='media-content'>
                                  <div className='content'>
                                    <p className='media-meta'>
                                      <strong
                                        className={`${
                                          dark ? 'text-for-black' : ''
                                        }`}>
                                        {comment.user}
                                      </strong>{' '}
                                      <small
                                        className={`${
                                          dark ? 'text-for-black' : ''
                                        }`}>
                                        {comment.email}
                                      </small>
                                      {/* <small className='has-text-grey'>
                                    1 month ago
                                  </small> */}
                                    </p>
                                    <p
                                      className={`${
                                        dark ? 'text-for-black' : ''
                                      }`}>
                                      {' '}
                                      {comment.description}{' '}
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
                            ))
                          ) : (
                            <div>hola</div>
                          )}
                        </div>
                      </div>
                      <footer className='card-footer'>
                        <a className='card-footer-item'>
                          <span className='icon'>
                            <i className='mdi mdi-autorenew default'></i>
                          </span>
                          <span>Load more</span>
                        </a>
                      </footer>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
};
