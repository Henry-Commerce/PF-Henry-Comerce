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

      <div id='login'>
        <div className='login-card'>
          <div className='card-title'>
            <h1>Sign In</h1>
          </div>

          <div className='content'>
            <form method='POST' action='#'>
              <div className='field'>
                <p className='control has-icons-left has-icons-right'>
                  <input
                    className='input is-danger'
                    type='email'
                    name='email'
                    title='email'
                    placeholder='Email'
                    required
                    autoFocus
                  />

                  <span className='icon is-small is-left'>
                    <MdEmail />
                  </span>
                  <span className='icon is-small is-right'>
                    <i className='fas fa-check'></i>
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control has-icons-left'>
                  <input
                    className='input is-success'
                    type='password'
                    name='password'
                    title='password'
                    placeholder='Password'
                    required
                  />
                  <span className='icon is-small is-left'>
                    <GiPadlock />
                  </span>
                </p>
              </div>
              <div className='level options'>
                <div className='checkbox level-left'>
                  <input
                    type='checkbox'
                    id='checkbox'
                    className='regular-checkbox'
                  />
                  <label htmlFor='checkbox'></label>
                  <span>Remember me</span>
                </div>

                <a className='btn btn-link level-right' href='#'>
                  Forgot Password?
                </a>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-log '
                onClick={notify}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
{
  /* <div id='login'>
        <div className='login-card'>
          <div className='card-title'>
            <h1>Sign In</h1>
          </div>

          <div className='content'>
            <form method='POST' action='#'>
              <div className='field'>
                <p className='control has-icons-left has-icons-right'>
                  <input
                    className='input is-danger'
                    type='email'
                    name='email'
                    title='email'
                    placeholder='Email'
                    required
                    autoFocus
                  />

                  <span className='icon is-small is-left'>
                    <MdEmail />
                  </span>
                  <span className='icon is-small is-right'>
                    <i className='fas fa-check'></i>
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control has-icons-left'>
                  <input
                    className='input is-success'
                    type='password'
                    name='password'
                    title='password'
                    placeholder='Password'
                    required
                  />
                  <span className='icon is-small is-left'>
                    <GiPadlock />
                  </span>
                </p>
              </div>
              <div className='level options'>
                <div className='checkbox level-left'>
                  <input
                    type='checkbox'
                    id='checkbox'
                    className='regular-checkbox'
                  />
                  <label htmlFor='checkbox'></label>
                  <span>Remember me</span>
                </div>

                <a className='btn btn-link level-right' href='#'>
                  Forgot Password?
                </a>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-log '
                onClick={notify}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div> */
}
