/** @format */

import { AdminNav } from '../../../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAccountCircleFill, RiLockPasswordFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../../redux/actions';
import axios from 'axios';

export const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let session = null;
  const [data, setData] = useState('');
  const [meow, setMeow] = useState(false);

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

    if (localStorage.getItem('authenticated')) {
      session = JSON.parse(localStorage.getItem('authenticated'));
      dispatch(checkAuth(session));
    }

    const profile = async () => {
      const { email, token } = session;
      const user = await axios.get(
        `http://localhost:3001/api/user/info/${email}`,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );

      setData(user.data);
      console.log('data', data);
    };
    profile();
  }, []);

  useEffect(() => {}, [data]);

  const change = async (e) => {
    console.log('hola mundo', data);
    const { token } = JSON.parse(localStorage.getItem('authenticated'));

    const res = await axios({
      method: 'put',
      url: `http://localhost:3001/api/user/change/${data.email}`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        username: 'AlyxZain',
        country: 'Colombia',
      },
    });
    console.log('change', res);
  };

  return (
    <div className='wrapper'>
      <div className='columns'>
        <AdminNav />
        <main className='column main'>
          <section className='hero is-hero-bar'>
            <div className='hero-body'>
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>
                    <h1 className='title'>Profile</h1>
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
                <div className='card tile is-child'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      <span className='icon'>
                        <RiAccountCircleFill className='mdi mdi-account default' />
                        {/* <i className='mdi mdi-account-circle default'></i> */}
                      </span>
                      Edit Profile
                    </p>
                  </header>
                  <div className='card-content'>
                    <form>
                      <div className='field is-horizontal'>
                        <div className='field-label is-normal'>
                          <label className='label'>Avatar</label>
                        </div>
                        <div className='field-body'>
                          <div className='field'>
                            <div className='field file'>
                              <label className='upload control'>
                                {/* <a className='button is-primary'>
                                  <span className='icon'>
                                    <i className='mdi mdi-upload default'></i>
                                  </span>
                                  <span>Pick a file</span>
                                </a> */}
                                <input type='file' />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className='field is-horizontal'>
                        <div className='field-label is-normal'>
                          <label className='label'>Name</label>
                        </div>
                        <div className='field-body'>
                          <div className='field'>
                            <div className='control'>
                              <input
                                type='text'
                                autoComplete='on'
                                name='name'
                                // value='John Doe'
                                className='input'
                                required=''
                              />
                            </div>
                            <p className='help'>Required. Your name</p>
                          </div>
                        </div>
                      </div>
                      <div className='field is-horizontal'>
                        <div className='field-label is-normal'>
                          <label className='label'>Country</label>
                        </div>
                        <div className='field-body'>
                          <div className='field'>
                            <div className='control'>
                              <input
                                type='email'
                                autoComplete='on'
                                name='email'
                                // value='user@example.com'
                                className='input'
                                required=''
                              />
                            </div>
                            {/* <p className='help'>Required. Your e-mail</p> */}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className='field is-horizontal'>
                        <div className='field-label is-normal'></div>
                        <div className='field-body'>
                          <div className='field'>
                            <div className='control'>
                              <button
                                type='submit'
                                className='button is-primary'
                                onClick={change}>
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='tile is-parent'>
                <div className='card tile is-child'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      <span className='icon'>
                        <RiAccountCircleFill className='mdi mdi-account default' />
                      </span>
                      Profile
                    </p>
                  </header>
                  <div className='card-content'>
                    <div className='is-user-avatar image has-max-width is-aligned-center'>
                      <img
                        src='https://avatars.dicebear.com/v2/initials/john-doe.svg'
                        alt='John Doe'
                      />
                    </div>
                    <hr />
                    <div className='field'>
                      <label className='label'>Name</label>
                      <div className='control is-clearfix'>
                        <text className='input is-static'>
                          {data ? data.username : ''}
                        </text>
                        {/* <input
                          type='text'
                          readOnly=''
                          value={data ? data.username : ''}
                          className='input is-static'
                        /> */}
                      </div>
                    </div>
                    <hr />
                    <div className='field'>
                      <label className='label'>E-mail</label>
                      <div className='control is-clearfix'>
                        <text className='input is-static'>
                          {data ? data.email : ''}
                        </text>
                        {/* <input
                          type='text'
                          readOnly=''
                          value='user@example.com'
                          className='input is-static'
                        /> */}
                      </div>
                    </div>
                    <hr />
                    <div className='field'>
                      <label className='label'>Country</label>
                      <div className='control is-clearfix'>
                        <text className='input is-static'>
                          {data ? data.country : ''}
                        </text>
                        {/* <input
                          type='text'
                          readOnly=''
                          value='user@example.com'
                          className='input is-static'
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  <span className='icon'>
                    <RiLockPasswordFill className='mdi mdi-lock default' />
                    {/* <i className='mdi mdi-lock default'></i> */}
                  </span>
                  Change Password
                </p>
              </header>
              <div className='card-content'>
                <form>
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                      <label className='label'>Current password</label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            type='password'
                            name='password_current'
                            autoComplete='current-password'
                            className='input'
                            required=''
                          />
                        </div>
                        <p className='help'>Required. Your current password</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                      <label className='label'>New password</label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            type='password'
                            autoComplete='new-password'
                            name='password'
                            className='input'
                            required=''
                          />
                        </div>
                        <p className='help'>Required. New password</p>
                      </div>
                    </div>
                  </div>
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                      <label className='label'>Confirm password</label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            type='password'
                            autoComplete='new-password'
                            name='password_confirmation'
                            className='input'
                            required=''
                          />
                        </div>
                        <p className='help'>
                          Required. New password one more time
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'></div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <button type='submit' className='button is-primary'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* <div>
            <section class='section is-title-bar'>
              <div class='level'>
                <div class='level-left'>
                  <div class='level-item'>
                    <ul>
                      <li> Admin </li>
                      <li> Profile </li>
                    </ul>
                  </div>
                </div>
                <div class='level-right'>
                  <div class='level-item'>
                    <div class='buttons is-right'>
                      <a
                        href='https://justboil.me/bulma-admin-template/one/'
                        target='_blank'
                        class='button is-info'>
                        <span class='icon'>
                          <i class='mdi mdi-credit-card default'></i>
                        </span>
                        <span>Buy theme</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class='hero is-hero-bar'>
              <div class='hero-body'>
                <div class='level'>
                  <div class='level-left'>
                    <div class='level-item'>
                      <h1 class='title'> Profile </h1>
                    </div>
                  </div>
                  <div class='level-right'>
                    <div class='level-item'>
                      <a href='#/' class='button router-link-active'>
                        {' '}
                        Dashboard{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class='section is-main-section'>
              <div class='tile is-ancestor'>
                <div class='tile is-parent'>
                  <div class='card tile is-child'>
                    <header class='card-header'>
                      <p class='card-header-title'>
                        <span class='icon'>
                          <i class='mdi mdi-account-circle default'></i>
                        </span>
                        <span>Edit Profile</span>
                      </p>
                    </header>
                    <div class='card-content'>
                      <form>
                        <div class='field is-horizontal'>
                          <div class='field-label is-normal'>
                            <label class='label'>Avatar</label>
                          </div>
                          <div class='field-body'>
                            <div class='field'>
                              <div class='field file'>
                                <label class='upload control'>
                                  <a class='button is-info'>
                                    <span class='icon'>
                                      <i class='mdi mdi-upload default'></i>
                                    </span>
                                    <span>Pick a file</span>
                                  </a>
                                  <input type='file' />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div class='field is-horizontal'>
                          <div class='field-label is-normal'>
                            <label class='label'>Name</label>
                          </div>
                          <div class='field-body'>
                            <div class='field'>
                              <div class='control'>
                                <input
                                  type='text'
                                  autocomplete='on'
                                  name='name'
                                  required='required'
                                  class='input'
                                />
                              </div>
                              <p class='help'> Required. Your name </p>
                            </div>
                          </div>
                        </div>
                        <div class='field is-horizontal'>
                          <div class='field-label is-normal'>
                            <label class='label'>E-mail</label>
                          </div>
                          <div class='field-body'>
                            <div class='field'>
                              <div class='control'>
                                <input
                                  type='email'
                                  autocomplete='on'
                                  name='email'
                                  required='required'
                                  class='input'
                                />
                              </div>
                              <p class='help'> Required. Your e-mail </p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div class='field is-horizontal'>
                          <div class='field-label is-normal'></div>
                          <div class='field-body'>
                            <div class='field'>
                              <div class='field'>
                                <div class='field-body'>
                                  <div class='field is-grouped'>
                                    <div class='control'>
                                      <button
                                        type='submit'
                                        class='button is-info'>
                                        <span> Submit </span>
                                      </button>
                                    </div>
                                    <div class='control'>
                                      <button
                                        type='button'
                                        class='button is-info is-outlined'>
                                        <span> Reset </span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class='tile is-parent'>
                  <div class='card tile is-child'>
                    <header class='card-header'>
                      <p class='card-header-title'>
                        <span class='icon'>
                          <i class='mdi mdi-account default'></i>
                        </span>
                        <span>Profile</span>
                      </p>
                    </header>
                    <div class='card-content'>
                      <div class='is-user-avatar has-max-width is-aligned-center'>
                        <img src='https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&amp;options[accessoriesChance]=93' />
                      </div>
                      <hr />
                      <div class='field'>
                        <label class='label'>Name</label>
                        <div class='control is-clearfix'>
                          <input
                            type='text'
                            autocomplete='on'
                            readOnly='readOnly'
                            class='input is-static'
                            value='sebastian'
                          />
                        </div>
                      </div>
                      <hr />
                      <div class='field'>
                        <label class='label'>E-mail</label>
                        <div class='control is-clearfix'>
                          <input
                            type='text'
                            autocomplete='on'
                            readOnly='readOnly'
                            class='input is-static'
                            value='sebastian@hotmail.com'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='card'>
                <header class='card-header'>
                  <p class='card-header-title'>
                    <span class='icon'>
                      <i class='mdi mdi-lock default'></i>
                    </span>
                    <span>Change Password</span>
                  </p>
                </header>
                <div class='card-content'>
                  <form>
                    <div class='field is-horizontal'>
                      <div class='field-label is-normal'>
                        <label class='label'>Current password</label>
                      </div>
                      <div class='field-body'>
                        <div class='field'>
                          <div class='control'>
                            <input
                              type='password'
                              autocomplete='on'
                              name='password_current'
                              required='required'
                              autcomplete='current-password'
                              class='input'
                            />
                          </div>
                          <p class='help'> Required. Your current password </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class='field is-horizontal'>
                      <div class='field-label is-normal'>
                        <label class='label'>New password</label>
                      </div>
                      <div class='field-body'>
                        <div class='field'>
                          <div class='control'>
                            <input
                              type='password'
                              autocomplete='new-password'
                              name='password'
                              required='required'
                              class='input'
                            />
                          </div>
                          <p class='help'> Required. New password </p>
                        </div>
                      </div>
                    </div>
                    <div class='field is-horizontal'>
                      <div class='field-label is-normal'>
                        <label class='label'>Confirm password</label>
                      </div>
                      <div class='field-body'>
                        <div class='field'>
                          <div class='control'>
                            <input
                              type='password'
                              autocomplete='new-password'
                              name='password_confirmation'
                              required='required'
                              class='input'
                            />
                          </div>
                          <p class='help'>
                            {' '}
                            Required. New password one more time{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class='field is-horizontal'>
                      <div class='field-label is-normal'></div>
                      <div class='field-body'>
                        <div class='field'>
                          <div class='control'>
                            <button type='submit' class='button is-info'>
                              <span> Submit </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div> */}
        </main>
      </div>
    </div>
  );
};
