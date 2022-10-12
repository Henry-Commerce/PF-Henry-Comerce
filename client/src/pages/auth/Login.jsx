/** @format */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Notify } from '../../components'
import { toast } from 'react-toastify'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FcGoogle } from 'react-icons/fc'

import './Login.scss'
import {
    checkingAuthentication,
    startGoogleSignIn,
    startGithubSignIn,
    startLoginWithEmailPassword,
} from '../../redux/actions/actions'

export const Login = () => {
    const [checked, setChecked] = useState(true)
    const [typeLog, setTypeLog] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const session = sessionStorage.getItem('authenticated')
        if (session) {
            navigate('/')
        }
    }, [])

    const notify = () =>
        toast.success('🦄 Logeado Correctamente', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })

    const loginGoogle = async () => {
        await dispatch(startGoogleSignIn())
        navigate('/')
    }

    const loginGithub = async () => {
        await dispatch(startGithubSignIn())
        navigate('/')
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Email must be a valid email')
                .required('Email is a required field'),
            password: Yup.string()
                .min(6)
                .required('Password is a required field'),
        }),
        onSubmit: (formData) => {
            // console.log(formData);
            dispatch(startLoginWithEmailPassword(formData))
            navigate('/')
            // if (checked === true) {
            //     localStorage.setItem(
            //         'auth',
            //         JSON.stringify({
            //             email: formData.email,
            //             password: formData.password,
            //             checked: checked,
            //         })
            //     )
            // }
            // handleReset()
            // notify()
        },
    })

    const {
        values,
        handleBlur,
        handleChange,
        handleReset,
        handleSubmit,
        errors,
        touched,
    } = formik

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
                                                value={values.email}
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
                                            {errors.password &&
                                                touched.password && (
                                                    <div className='has-text-danger pt-2'>
                                                        {errors.password}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className='pb-5 pt-2'>
                                        <label className='checkbox'>
                                            <input
                                                type='checkbox'
                                                defaultChecked={checked}
                                                onChange={() =>
                                                    setChecked(!checked)
                                                }
                                            />
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type='submit'
                                        className='button is-block is-primary is-large is-fullwidth'
                                        onClick={() => setTypeLog('normal')}>
                                        Login
                                        <i
                                            className='fa fa-sign-in'
                                            aria-hidden='true'></i>
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
                                    <br />
                                    <p className='control'>
                                        <Link
                                            className='button is-primary is-large is-fullwidth'
                                            to=''
                                            onClick={loginGithub}>
                                            <span className='icon'>
                                                <FcGoogle className='fas' />
                                            </span>
                                            <span>Login With Github</span>
                                        </Link>
                                    </p>
                                </form>
                            </div>
                            <p className='has-text-grey s'>
                                <Link to='/register'>Sign Up</Link>{' '}
                                &nbsp;·&nbsp;
                                <a href='#forgot'>Forgot Password</a>{' '}
                                &nbsp;·&nbsp;
                                <Link to='/faq'>Need Help?</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
