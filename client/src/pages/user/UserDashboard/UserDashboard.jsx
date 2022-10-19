/** @format */

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { HiIdentification, HiMail, HiHome, HiPhone } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAuth } from '../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../components/Loading/Loading';

export const UserDashboard = ({ dark }) => {
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
          navigate('/user');
        }
      } else {
        navigate('/user');
      }
    } else {
      navigate('/user');
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
      /* console.log("data", data); */
    };
    profile();
  }, []);

  /* console.log(data);*/
  return (
    <>
      {!data.username && <Loading />}
      {data.username && (
        <div
          className={`${
            dark
              ? 'has-background-black columns is-centered'
              : 'columns is-centered'
          }`}
          style={{
            height: '100vh',
          }}>
          <div className='column is-7'>
            <article
              className={`${
                dark ? ' text-for-black panel border-yellow' : 'panel'
              }`}>
              <p
                className={`${
                  dark
                    ? 'has-background-black text-for-black panel-heading title is-3'
                    : 'panel-heading title is-3'
                }`}>
                Mi cuenta
              </p>
              <p className='panel-tabs '>
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
              <span
                className={`${
                  dark ? 'text-for-black panel-block' : 'panel-block'
                }`}>
                <HiIdentification className='title is-2 m-1' />
                <p className='is-size-4'>Nombre de usuario: {data.username}</p>
              </span>
              <span
                className={`${
                  dark ? 'text-for-black panel-block' : 'panel-block'
                }`}>
                <HiHome className='title is-2 m-1' />
                <p className='is-size-4'>Pais: {data.country}</p>
              </span>
              <span
                className={`${
                  dark ? 'text-for-black panel-block' : 'panel-block'
                }`}>
                <HiMail className='title is-2 m-1' />
                <p className='is-size-4'>Mail: {data.email}</p>
              </span>
            </article>
          </div>
        </div>
      )}
    </>
  );
};
