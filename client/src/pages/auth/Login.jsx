/** @format */
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Notify } from '../../components';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';

import './Login.scss';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startGithubSignIn,
  startLoginWithEmailPassword,
} from '../../redux/actions/actions';

export const Login = ({ dark }) => {
  const [checked, setChecked] = useState(true);
  const [typeLog, setTypeLog] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = () =>
    toast.error('Datos incorrectos', {
      position: 'top-center',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const dis = async (formData) => {
    const login = await dispatch(startLoginWithEmailPassword(formData));
    if (login.type === 'LOGIN') {
      navigate('/');
    } else if (login.type === 'IncorrectPassword') {
      error();
      // handleReset();
    } else {
      errorUsuarioNoExiste();
    }
  };
  const loginGoogle = async () => {
    await dispatch(startGoogleSignIn());
    navigate('/');
  };

  const loginGithub = async () => {
    await dispatch(startGithubSignIn());
    navigate('/');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email must be a valid email')
        .required('Email is a required field'),
      password: Yup.string().min(6).required('Password is a required field'),
    }),
    onSubmit: (formData) => {
      dis(formData);
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
    <>
      <Notify />

      <section
        className={`${
          dark ? 'text-for-black has-background-black' : 'has-text-black'
        } hero is-success is-fullheight`}>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='column is-4 is-offset-4'>
              <h3
                className={`${
                  dark
                    ? 'text-for-black has-background-black'
                    : 'has-text-black'
                } title`}>
                Login
              </h3>
              <hr className='login-hr' />
              <p
                className={`${
                  dark
                    ? 'text-for-black has-background-black'
                    : 'has-text-black'
                } subtitle`}>
                Please login to proceed.
              </p>
              <div
                className={`${
                  dark ? 'text-for-black has-background-dark' : ''
                } box`}>
                <figure className='avatar'>
                  <img src='https://res.cloudinary.com/dmk0kmt7d/image/upload/ar_1:1,b_rgb:ffffff,bo_0px_solid_rgb:ffffff,c_fill,g_auto,q_100,r_max,w_150,z_3/v1665969945/blsyqex8mixxmqwhdmmh.png' />
                </figure>
                <form onSubmit={handleSubmit}>
                  <div className='field'>
                    <div className='control'>
                      <input
                        className='input is-large'
                        type='email'
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email.toLowerCase()}
                      />
                      {errors.email && touched.email && (
                        <div className='has-text-danger pt-2'>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='field'>
                    <div className='control'>
                      <input
                        className='input is-large'
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <div className='has-text-danger pt-2'>
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='pb-5 pt-2'>
                    {/* <label className='checkbox'>
                      <input
                        type='checkbox'
                        defaultChecked={checked}
                        onChange={() => setChecked(!checked)}
                      />
                      Remember me
                    </label> */}
                  </div>
                  <button
                    type='submit'
                    className='button is-block is-primary is-large is-fullwidth'
                    onClick={() => setTypeLog('normal')}>
                    Login
                    <i className='fa fa-sign-in' aria-hidden='true'></i>
                  </button>
                  <br />

                  <p className='control'>
                    <Link
                      className='button is-primary is-large is-fullwidth'
                      to=''
                      onClick={loginGoogle}>
                      <span className='icon'>
                        <FcGoogle className='fas' />
                      </span>
                      <span>Login With Google</span>
                    </Link>
                  </p>
                  {/* <br /> */}
                  {/* <p className='control'>
                    <Link
                      className='button is-primary is-large is-fullwidth'
                      to=''
                      onClick={loginGithub}>
                      <span className='icon'>
                        <BsGithub className='fas' />
                      </span>
                      <span>Login With Github</span>
                    </Link>
                  </p> */}
                </form>
              </div>
              <p className='has-text-grey s'>
                <Link to='/register'>Sign Up</Link> &nbsp;·&nbsp;
                <a href='#forgot'>Forgot Password</a> &nbsp;·&nbsp;
                <Link to='/faq'>Need Help?</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
