/** @format */
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdminNav, Notify } from '../../components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addClothing } from '../../redux/actions';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FaDollarSign } from 'react-icons/fa';
import { BiRename } from 'react-icons/bi';
import { v4 } from 'uuid';

export const AddClothing = ({ dark }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');

  const handleaddImage = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'images');
    data.append('cloud_name', 'dg50vvzpm');
    data.append('public_id', v4());

    await fetch('https://api.cloudinary.com/v1_1/dg50vvzpm/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    values.image = image;
  }, [image]);

  const navigate = useNavigate();
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
  }, []);

  const notify = () =>
    toast.success('🦄 Prenda añadida correctamente', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: 'T-shirt',
      price: '',
      stock: {
        XS: 10,
        S: 10,
        M: 10,
        L: 10,
        XL: 10,
        XXL: 10,
      },
      image: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string('Name must be string').required(
        'Name is a required field'
      ),
      category: Yup.string('Name must be string').required(
        'You must select any category'
      ),
      price: Yup.number().min(0).required('Price is required'),
      // image: Yup.string().required('You must upload an image'),
      description: Yup.string().required('You must add a description'),
    }),
    onSubmit: (formData) => {
      const { token } = JSON.parse(localStorage.getItem('authenticated'));
      dispatch(addClothing(formData, token));
      handleReset();
      notify();
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
        <AdminNav dark={dark} />
        <main
          className={`${
            dark ? 'has-background-black' : 'has-background-light'
          } column main`}>
          <Notify />
          <div
            className={`${
              dark ? ' has-background-black' : 'has-background-light'
            } container box p-6`}>
            <h1
              className={`${
                dark ? 'text-for-black' : ''
              } title has-text-centered`}>
              Add Product
            </h1>
            <h2
              className={`${
                dark ? 'text-for-black' : ''
              } subtitle has-text-centered`}>
              Fill in the details correctly
            </h2>
            <form action='' onSubmit={handleSubmit}>
              <div className='field'>
                <label className={`${dark ? 'text-for-black' : ''} label`}>
                  Name
                </label>
                <div className='control has-icons-left has-icons-right'>
                  <input
                    className='input'
                    type='text'
                    name='name'
                    autoComplete='off'
                    placeholder='Enter product name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <div className='has-text-danger pt-2'>{errors.name}</div>
                  )}
                  <span className='icon is-small is-left'>
                    <BiRename />
                  </span>
                </div>
              </div>

              <div className='field'>
                <label className={`${dark ? 'text-for-black' : ''} label`}>
                  Choose category
                </label>
                <div className='control'>
                  <div className='select'>
                    <select
                      value={values.category}
                      onChange={handleChange}
                      name='category'>
                      <option>Camisas</option>
                      <option>Pantalones</option>
                      <option>Sudaderas</option>
                      <option>Accesorios</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='field'>
                <label className={`${dark ? 'text-for-black' : ''} label`}>
                  Price
                </label>
                <div className='control has-icons-left has-icons-right'>
                  <input
                    className='input'
                    type='number'
                    placeholder='Enter the price of the garment'
                    name='price'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  {errors.price && touched.price && (
                    <div className='has-text-danger pt-2'>{errors.price}</div>
                  )}
                  <span className='icon is-small is-left'>
                    <FaDollarSign />
                  </span>
                </div>
              </div>

              <div className='field'>
                <label className={`${dark ? 'text-for-black' : ''} label`}>
                  Image
                </label>
                <input type='file' name='image' onChange={handleaddImage} />
              </div>

              <div className='field'>
                <label className={`${dark ? 'text-for-black' : ''} label`}>
                  Product description
                </label>
                <div className='control'>
                  <textarea
                    className='textarea'
                    placeholder='Want to tell anything?'
                    name='description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description && touched.description && (
                    <div className='has-text-danger pt-2'>
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>

              <div className='field is-grouped'>
                <div className='control'>
                  <button className='button is-primary' type='submit'>
                    Add
                  </button>
                </div>

                <div className='control'>
                  <button className='button is-link is-light'>Clear</button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
