/** @format */

import React from 'react';

export const AddClothing = () => {
  return (
    <div
      className='container box p-6
                has-background-light'>
      <h1
        className='title has-text-centered
                 has-text-success'>
        GeeksforGeeks
      </h1>
      <h2 className='subtitle has-text-centered'>Sign Up Form</h2>
      <form action=''>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='Enter your name'
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Username</label>
          <div
            className='control has-icons-left
                      has-icons-right'>
            <input
              className='input is-success'
              type='text'
              placeholder='Enter your username'
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-user'></i>
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Email</label>
          <div
            className='control has-icons-left
                      has-icons-right'>
            <input
              className='input is-danger'
              type='email'
              placeholder='Enter your email'
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-envelope'></i>
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Password</label>
          <div
            className='control has-icons-left
                      has-icons-right'>
            <input
              className='input is-danger'
              type='password'
              placeholder='Enter your password'
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-key'></i>
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Choose your Course</label>
          <div className='control'>
            <div className='select'>
              <select>
                <option>Java</option>
                <option>C++</option>
                <option>Python</option>
              </select>
            </div>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Something Else</label>
          <div className='control'>
            <textarea
              className='textarea'
              placeholder='Want to tell anything?'></textarea>
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <label className='checkbox'>
              <input type='checkbox' />I agree to the{' '}
              <a href='#'>terms and conditions</a>
            </label>
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <label className='radio'>
              <input type='radio' name='question' />
              Yes
            </label>
            <label className='radio'>
              <input type='radio' name='question' />
              No
            </label>
          </div>
        </div>

        <div className='field is-grouped'>
          <div className='control'>
            <button className='button is-success'>Sign up</button>
          </div>
          <div className='control'>
            <button className='button is-link is-light'>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};
