/** @format */

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyADJMgQBahcCWIOGmEsaqiWt3c3oopyU9E',
  authDomain: 'pf-henry-commerce.firebaseapp.com',
  projectId: 'pf-henry-commerce',
  storageBucket: 'pf-henry-commerce.appspot.com',
  messagingSenderId: '451094181305',
  appId: '1:451094181305:web:838c4e80e24757b0bef268',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * Upload File to Firebase Storage
 *  @param {file} file the file to upload
 * @returns {promise<string>} string url of the upload file
 * */

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
