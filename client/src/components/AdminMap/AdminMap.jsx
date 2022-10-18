/** @format */

import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Loading } from '../Loading/Loading';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranches } from '../../redux/actions';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import './AdminMap.scss';

export const libraries = ['places'];

export const AdminMap = ({ selected, setSelected, dark }) => {
  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_KEY,
    libraries,
  });

  const branches = useSelector((state) => state.allBranches);

  useEffect(() => {
    dispatch(getAllBranches());
  }, []);

  const center = { lat: -17.3, lng: -60 };

  if (!isLoaded) return <Loading />;

  return (
    <>
      <GoogleMap
        zoom={3.5}
        center={center}
        mapContainerClassName='map-container'>
        <div className='places-container'>
          <PlacesAutocomplete setSelected={setSelected} />
        </div>

        {branches.map((element, index) => (
          <MarkerF
            key={index}
            position={element.coordinates}
            title={element.street}
            icon={element.icon}
          />
        ))}

        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </>
  );
};

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='combobox-input'
        placeholder='Search an address'
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className='combobox-option pb-3'
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
