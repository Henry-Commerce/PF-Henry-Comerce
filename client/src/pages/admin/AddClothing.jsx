/** @format */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Notify } from '../../components';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { uploadFile } from '../../firebase/config.js';
import { FaDollarSign } from 'react-icons/fa';
import { BiRename } from 'react-icons/bi';

export const AddClothing = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await uploadFile(file);
    console.log(result);
  };

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
      category: '',
      price: '',
      stock: {
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      },
      image: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string('Name must be string').required(
        'Name is a required field'
      ),
      category: Yup.boolean().oneOf([true], 'You must select any category'),
      price: Yup.number().min(0).required('Price is required'),
      image: Yup.string().required('You must upload an image'),
      description: Yup.string().required('You must add a description'),
    }),
    onSubmit: (formData) => {
      // console.log(formData);

      handleReset();
      notify();
    },
  });

  return (
    <div className='container box p-6 has-background-light'>
      <h1 className='title has-text-centered '>Add Product</h1>
      <h2 className='subtitle has-text-centered'>
        Fill in the details correctly
      </h2>
      <form action='' onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input'
              type='text'
              name='name'
              placeholder='Enter product name'
            />
            <span className='icon is-small is-left'>
              <BiRename />
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Choose category</label>
          <div className='control'>
            <div className='select'>
              <select>
                <option>T-shirt</option>
                <option>Pants</option>
                <option>Jacket</option>
                <option>Caps</option>
              </select>
            </div>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Price</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input is-danger'
              type='number'
              placeholder='Enter the price of the garment'
              name='price'
            />
            <span className='icon is-small is-left'>
              <FaDollarSign />
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Image</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className='field'>
          <label className='label'>Product description</label>
          <div className='control'>
            <textarea
              className='textarea'
              placeholder='Want to tell anything?'
              name='description'
            />
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
  );
};
