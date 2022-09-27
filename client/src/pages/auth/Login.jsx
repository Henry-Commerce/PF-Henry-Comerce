/** @format */
import { Notify } from '../../components';
import { toast } from 'react-toastify';

import { MdEmail } from 'react-icons/md';
import { GiPadlock } from 'react-icons/gi';

import './Login.scss';

export const Login = () => {
  const notify = () =>
    toast.success('🦄 Logeado Correctamente', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  return (
    <>
      <Notify />

      <section className='hero is-success is-fullheight'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='column is-4 is-offset-4'>
              <h3 className='title has-text-black'>Login</h3>
              <hr className='login-hr' />
              <p className='subtitle has-text-black'>
                Please login to proceed.
              </p>
              <div className='box'>
                <figure className='avatar'>
                  <img src='https://via.placeholder.com/150' />
                </figure>
                <form>
                  <div className='field'>
                    <div className='control'>
                      <input
                        className='input is-large'
                        type='email'
                        name='email'
                        placeholder='Email'
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className='field'>
                    <div className='control'>
                      <input
                        className='input is-large'
                        type='password'
                        name='password'
                        placeholder='Password'
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className='pb-5 pt-2'>
                    <label className='checkbox'>
                      <input type='checkbox' />
                      Remember me
                    </label>
                  </div>
                  <button
                    className='button is-block is-primary is-large is-fullwidth'
                    onClick={notify}>
                    Login <i className='fa fa-sign-in' aria-hidden='true'></i>
                  </button>
                </form>
              </div>
              <p className='has-text-grey s'>
                <a href='#sign'>Sign Up</a> &nbsp;·&nbsp;
                <a href='#forgot'>Forgot Password</a> &nbsp;·&nbsp;
                <a href='#need'>Need Help?</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
