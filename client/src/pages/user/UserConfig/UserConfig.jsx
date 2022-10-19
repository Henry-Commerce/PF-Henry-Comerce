/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Notify } from '../../../components/Notify/Notify';
import { toast } from 'react-toastify';
import '../UserDashboard/User.scss';
import { checkAuth } from '../../../redux/actions/actions';
import { Loading } from '../../../components/Loading/Loading';
import { CountryDropdown } from 'react-country-region-selector';
import { Map } from '../../../components/Map/Map';
import { dataCountrys } from '../../admin/AdminProfile/Countrys';

export const UserConfig = ({ dark }) => {
  const [isActive, setisActive] = useState(false);
  const [isActive1, setisActive1] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let session = null;
  const [data, setData] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authenticated')) {
      const { authenticated, isAdmin } = JSON.parse(
        localStorage.getItem('authenticated')
      );
      if (authenticated) {
        if (isAdmin === false) {
          navigate('/user/config');
        }
      } else {
        navigate('/user/config');
      }
    } else {
      navigate('/user/config');
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
          headers: { 'x-access-token': token },
        }
      );
      setData(user.data);
    };
    profile();
  }, []);

  const success = () =>
    toast.success('Los cambios se han realizado con exito', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const passwordError = () =>
    toast.error('La contraseña no es valida', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const formik = useFormik({
    initialValues: {
      username: '',
      country: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      repitePassword: '',
      confirm: false,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(5, 'El nombre debe tener al menos 5 caracteres')
        .max(15, 'El nombre no puede contener mas de 15 caracteres'),
      oldPassword: Yup.string(),
      newPassword: Yup.string().min(
        6,
        'La contraseña debe tener un minimo de 6 caracteres'
      ),
      repitePassword: Yup.string()
        .min(6, 'La contraseña debe tener un minimo de 6 caracteres')
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir'),
      confirm: Yup.boolean().oneOf(
        [true],
        'Marcar la casilla en caso de estar seguro de querer realizar los cambios'
      ),
    }),
    onSubmit: async (formData) => {
      if (!values.username) values.username = data.username;
      if (!values.country) values.country = data.country;
      if (!values.email) values.email = data.email;
      if (!values.oldPassword || !values.newPassword) {
        delete values.oldPassword;
        delete values.newPassword;
      }
      try {
        const token = JSON.parse(localStorage.getItem('authenticated')).token;
        return await axios
          .put(`https://pfapi.vercel.app/api/user/edituser`, formData, {
            headers: {
              'x-access-token': token,
            },
          })
          .then(() => {
            delete values.repitePassword;
            handleReset();
            return success();
          });
      } catch (error) {
        handleReset();
        return passwordError();
      }
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
    <div
      className={`${
        dark
          ? 'has-background-black columns is-centered'
          : 'columns is-centered'
      }`}>
      <div className='column is-7'>
        <article
          className={`${
            dark
              ? ' text-for-black panel form-user border-yellow'
              : 'panel form-user'
          }`}>
          <Notify />
          <p
            className={`${
              dark
                ? 'has-background-black text-for-black panel-heading title is-3'
                : 'panel-heading title is-3'
            }`}>
            Mi cuenta
          </p>
          <p className='panel-tabs'>
            <Link
              to={`/user`}
              onClick={() => {
                setisActive(!isActive);
                setisActive1(false);
              }}
              className={`${isActive ? 'is-active' : ''}`}>
              MIS DATOS
            </Link>
            <Link
              to={`/user/config`}
              onClick={() => {
                setisActive(false);
                setisActive1(!isActive1);
              }}
              className={`${isActive1 ? 'is-active' : ''}`}>
              EDITAR DATOS
            </Link>
          </p>
          <p className='notification is-info caution m-4 p-4'>
            Los campos que no sean completados no sufriran cambios
          </p>

          <form action='' onSubmit={handleSubmit}>
            <div className='field m-3'>
              <label className={`${dark ? 'text-for-black label' : 'label'}`}>
                Nombre de usuario
              </label>
              <div className='control inputs'>
                <input
                  className='input'
                  type='text'
                  placeholder='Nuevo nombre de usuario'
                  name='username'
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <div className='has-text-danger pt-2'>{errors.username}</div>
                )}
              </div>
            </div>

            <div className='field m-3'>
              <label className={`${dark ? 'text-for-black label' : 'label'}`}>
                Pais
              </label>
              <div className='select'>
                <select
                  name='country'
                  className='input'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}>
                  <option value='DEFAULT'>Cambiar pais</option>
                  {dataCountrys.result.map((countrys, index) => (
                    <option key={index} value={countrys.name}>
                      {countrys.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='field m-3'>
              <label className={`${dark ? 'text-for-black label' : 'label'}`}>
                Contraseña actual
              </label>
              <div className='control inputs'>
                <input
                  className='input'
                  type='password'
                  placeholder='Contraseña actual'
                  name='oldPassword'
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.oldPassword}
                />
                {errors.oldPassword && touched.oldPassword && (
                  <div className='has-text-danger pt-2'>
                    {errors.oldPassword}
                  </div>
                )}
              </div>
            </div>

            <div className='field m-3'>
              <label className={`${dark ? 'text-for-black label' : 'label'}`}>
                Nueva contraseña
              </label>
              <div className='control inputs'>
                <input
                  className='input'
                  type='password'
                  placeholder='Nueva contraseña'
                  name='newPassword'
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                  disabled={
                    !values.oldPassword || values.oldPassword.length < 6
                  }
                />
                {errors.newPassword && touched.newPassword && (
                  <div className='has-text-danger pt-2'>
                    {errors.newPassword}
                  </div>
                )}
              </div>
            </div>

            <div className='field m-3'>
              <label className={`${dark ? 'text-for-black label' : 'label'}`}>
                Repetir la nueva contraseña
              </label>
              <div className='control inputs'>
                <input
                  className='input'
                  type='password'
                  placeholder='Repetir contraseña'
                  name='repitePassword'
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repitePassword}
                  disabled={
                    !values.oldPassword || values.oldPassword.length < 6
                  }
                />
                {errors.repitePassword && touched.repitePassword && (
                  <div className='has-text-danger pt-2'>
                    {errors.repitePassword}
                  </div>
                )}
              </div>
            </div>

            <div className='field m-3'>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    className='m-1'
                    type='checkbox'
                    name='confirm'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm}
                  />
                  ¿Estas seguro que quieres realizar los cambios?
                </label>
                {errors.confirm && touched.confirm && (
                  <div className='has-text-danger pt-2'>{errors.confirm}</div>
                )}
              </div>
            </div>

            <div className='field is-grouped m-3'>
              <div className='control'>
                <button
                  className='button is-primary m-3'
                  type='submit'
                  disabled={
                    errors.username ||
                    errors.oldPassword ||
                    errors.newPassword ||
                    errors.repitePassword ||
                    errors.confirm ||
                    (values.oldPassword &&
                      !values.newPassword &&
                      !values.repitePassword) ||
                    (values.oldPassword &&
                      values.newPassword &&
                      !values.repitePassword)
                  }>
                  Aceptar
                </button>
              </div>

              <div className='control'>
                <Link to={`/user`}>
                  <button className='button is-link is-light m-3'>
                    Cancelar
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};
