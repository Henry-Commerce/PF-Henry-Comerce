import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Loading } from "../Loading/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Map.scss";
import { getAllBranches } from "../../redux/actions";

export const Map = () => {
  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_KEY,
  });

  const branches = useSelector((state) => state.allBranches);

  useEffect(() => {
    dispatch(getAllBranches());
  }, []);

  const center = { lat: -13.782944845843048, lng: -57.73871475346553 };

  if (!isLoaded) return <Loading />;

  -16.782944845843048, -57.73871475346553;

  return (
    
    <GoogleMap zoom={4} center={center} mapContainerClassName="map-container">
      {branches.map((element, index) => (
        <MarkerF
          key={index}
          position={element.coordinates}
          title={element.street}
          icon={element.icon}
        />
      ))}
    </GoogleMap>
    
  );
};
