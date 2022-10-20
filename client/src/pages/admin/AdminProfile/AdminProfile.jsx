/** @format */

import { AdminNav, Notify } from '../../../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAccountCircleFill, RiLockPasswordFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { checkAuth, editUser } from '../../../redux/actions';
import axios from 'axios';
import { dataCountrys } from './Countrys.js';
import { v4 } from 'uuid';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export const AdminProfile = ({ dark }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let session = null;
  const [data, setData] = useState('');
  const [nameChange, setNameChange] = useState('');
  const [pais, setPais] = useState(false);

  const [gg, setGG] = useState(false);

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
        `https://pfapi.vercel.app/api/user/info/${email}`,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );

      setData(user.data);
    };
    profile();
  }, []);

  useEffect(() => {}, [data]);

  const change = async (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('authenticated'));

    const res = await axios({
      method: 'put',
      url: `https://pfapi.vercel.app/api/user/edit/info`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        email: `${data.email}`,
        username: `${nameChange}`,
        country: `${pais}`,
      },
    });
    if (res) {
      window.location.reload();
    }
  };

  const country = async (e) => {
    e.preventDefault();
    if (e.target.value === 'DEFAULT') {
      // pais = '';
      setPais('');
    } else {
      setPais(e.target.value);
      // pais = e.target.value;
    }
  };

  const nombresito = async (e) => {
    e.preventDefault();
    setNameChange(e.target.value);
  };

  const [image, setImage] = useState('');

  const successPasswordChange = () =>
    toast.success('La contraseña a sido cambiada con exito', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const failePasswordChange = () =>
    toast.error('A ocurrido un error al intentar cambiar la contraseña', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const handleaddImage = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'images');
    data.append('cloud_name', 'dg50vvzpm');
    data.append('public_id', v4());
    let imagensita = '';
    await fetch('https://api.cloudinary.com/v1_1/dg50vvzpm/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        imagensita = data.url;
      })
      .catch((err) => console.log(err));

    const { token, email } = JSON.parse(localStorage.getItem('authenticated'));

    const change = await axios({
      method: 'put',
      url: `https://pfapi.vercel.app/api/user/edit/image`,
      headers: {
        'x-access-token': `${token}`,
      },
      data: {
        email: email,
        image: imagensita,
      },
    });

    if (change.data.message === 'image updated') {
      setImage(imagensita);
      navigate('/admin');
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be no more than 20 characters')
        .required('Your current password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be no more than 20 characters')
        .required('New password is a required field')
        .oneOf([Yup.ref('newPasswordAgain')], 'Passwords must be the same'),
      newPasswordAgain: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be no more than 20 characters')
        .required('New password is a required field one more time')
        .oneOf([Yup.ref('newPassword')], 'Passwords must be the same'),
    }),
    onSubmit: (formData) => {
      const { email, token } = JSON.parse(
        localStorage.getItem('authenticated')
      );

      formData = {
        ...formData,
        email,
      };

      const submitPass = async (formData) => {
        let putUser = await axios.put(
          `https://pfapi.vercel.app/api/user/edituser`,
          formData,
          {
            headers: {
              'x-access-token': token,
            },
          }
        );
        if (putUser.data === 'OK') {
          successPasswordChange();
        } else {
          failePasswordChange();
        }
      };
      submitPass(formData);

      // dispatch(editUser(formData));
      handleReset();
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    errors,
    touched,
  } = formik;

  return (
    <div className='wrapper'>
      <div className='columns'>
        <Notify />
        <AdminNav dark={dark} />
        <main className={`${dark ? 'has-background-black' : ''} column main`}>
          <section
            className={`${
              dark ? 'has-background-black' : ''
            } hero is-hero-bar`}>
            <div className='hero-body'>
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>
                    <h1 className={`${dark ? 'text-for-black' : ''} title`}>
                      Profile
                    </h1>
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
                  <header className='card-header'>
                    <p
                      className={`${
                        dark ? 'text-for-black' : ''
                      } card-header-title`}>
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
                          <label
                            className={`${dark ? 'text-for-black' : ''} label`}>
                            Avatar
                          </label>
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
                                <input
                                  type='file'
                                  name='image'
                                  accept='image/png, image/gif, image/jpeg'
                                  onChange={handleaddImage}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className={`${dark ? 'has-background-dark' : ''}`} />
                      <div className='field is-horizontal'>
                        <div className='field-label is-normal'>
                          <label
                            className={`${dark ? 'text-for-black' : ''} label`}>
                            Name
                          </label>
                        </div>
                        <div className='field-body'>
                          <div className='field'>
                            <div className='control'>
                              <input
                                type='text'
                                autoComplete='on'
                                name='name'
                                placeholder='Write your new username'
                                onChange={nombresito}
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
                          <label
                            className={`${dark ? 'text-for-black' : ''} label`}>
                            Country
                          </label>
                        </div>
                        <div className='field-body'>
                          <div className='field'>
                            <div className='control'>
                              <select
                                name='lenguajes'
                                id='lang'
                                className='input'
                                onChange={country}>
                                <option value='DEFAULT'>No change</option>
                                {dataCountrys.result.map((countrys, index) => (
                                  <option key={index} value={countrys.name}>
                                    {countrys.name}
                                  </option>
                                ))}
                              </select>

                              {/* <input
                                type='email'
                                autoComplete='on'
                                name='email'
                                // value='user@example.com'
                                className='input'
                                required=''
                              /> */}
                            </div>
                            {/* <p className='help'>Required. Your e-mail</p> */}
                          </div>
                        </div>
                      </div>
                      <hr className={`${dark ? 'has-background-dark' : ''}`} />
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
                <div
                  className={`${
                    dark ? 'has-background-black border-yellow' : ''
                  } card tile is-child`}>
                  <header className='card-header'>
                    <p
                      className={`${
                        dark ? 'text-for-black' : ''
                      } card-header-title`}>
                      <span className='icon'>
                        <RiAccountCircleFill className='mdi mdi-account default' />
                      </span>
                      Profile
                    </p>
                  </header>
                  <div className='card-content'>
                    <div className='is-user-avatar image has-max-width is-aligned-center'>
                      <img src={`${data.image}`} alt={`${data.username}`} />
                    </div>
                    <hr className={`${dark ? 'has-background-dark' : ''}`} />
                    <div className='field'>
                      <label
                        className={`${dark ? 'text-for-black' : ''} label`}>
                        Name
                      </label>
                      <div className='control is-clearfix'>
                        <p
                          className={`${
                            dark ? 'text-for-black' : ''
                          } input is-static`}>
                          {data ? data.username : ''}
                        </p>
                        {/* <input
                          type='text'
                          readOnly=''
                          value={data ? data.username : ''}
                          className='input is-static'
                        /> */}
                      </div>
                    </div>
                    <hr className={`${dark ? 'has-background-dark' : ''}`} />
                    <div className='field'>
                      <label
                        className={`${dark ? 'text-for-black' : ''} label`}>
                        E-mail
                      </label>
                      <div className='control is-clearfix'>
                        <p
                          className={`${
                            dark ? 'text-for-black' : ''
                          } input is-static`}>
                          {data ? data.email : ''}
                        </p>
                        {/* <input
                          type='text'
                          readOnly=''
                          value='user@example.com'
                          className='input is-static'
                        /> */}
                      </div>
                    </div>
                    <hr className={`${dark ? 'has-background-dark' : ''}`} />
                    <div className='field'>
                      <label
                        className={`${dark ? 'text-for-black' : ''} label`}>
                        Country
                      </label>
                      <div className='control is-clearfix'>
                        <p
                          className={`${
                            dark ? 'text-for-black' : ''
                          } input is-static`}>
                          {data ? data.country : ''}
                        </p>
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
            <div
              className={`${
                dark ? 'has-background-black border-yellow' : ''
              } card `}>
              <header className='card-header'>
                <p
                  className={`${
                    dark ? 'text-for-black' : ''
                  } card-header-title`}>
                  <span className='icon'>
                    <RiLockPasswordFill className='mdi mdi-lock default' />
                    {/* <i className='mdi mdi-lock default'></i> */}
                  </span>
                  Change Password
                  {/* {errors.oldPassword && touched.oldPassword && (
                    <div className='has-text-danger pt-2'>
                      {errors.oldPassword}
                    </div>
                  )} */}
                </p>
              </header>
              <div className='card-content'>
                <form onSubmit={handleSubmit}>
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                      <label
                        className={`${dark ? 'text-for-black' : ''} label`}>
                        Current password
                      </label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            className='input'
                            type='password'
                            name='oldPassword'
                            autoComplete='off'
                            placeholder='Enter your current password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.oldPassword}
                          />
                        </div>

                        {errors.oldPassword && touched.oldPassword && (
                          <div className='has-text-danger pt-2'>
                            {errors.oldPassword}
                          </div>
                        )}

                        {/* <p className='help'>Required. Your current password</p> */}
                      </div>
                    </div>
                  </div>
                  <hr className={`${dark ? 'has-background-dark' : ''}`} />
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                      <label
                        className={`${dark ? 'text-for-black' : ''} label`}>
                        New password
                      </label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            className='input'
                            type='password'
                            name='newPassword'
                            autoComplete='off'
                            placeholder='Enter new password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
                          />
                        </div>

                        {errors.newPassword && touched.newPassword && (
                          <div className='has-text-danger pt-2'>
                            {errors.newPassword}
                          </div>
                        )}

                        {/* <p className='help'>Required. New password</p> */}
                      </div>
                    </div>
                  </div>
                  <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                      <label
                        className={`${dark ? 'text-for-black' : ''} label`}>
                        Confirm password
                      </label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            className='input'
                            type='password'
                            name='newPasswordAgain'
                            autoComplete='off'
                            placeholder='Enter new password again'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPasswordAgain}
                          />
                        </div>

                        {errors.newPasswordAgain &&
                          touched.newPasswordAgain && (
                            <div className='has-text-danger pt-2'>
                              {errors.newPasswordAgain}
                            </div>
                          )}

                        {/* <p className='help'>
                          Required. New password one more time
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <hr className={`${dark ? 'has-background-dark' : ''}`} />
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
