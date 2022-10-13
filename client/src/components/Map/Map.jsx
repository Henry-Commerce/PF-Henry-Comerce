import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Loading } from "../Loading/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Map.scss";
import { getAllBranches } from "../../redux/actions";

export const Map = () => {
  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDTTPFDiXGdQArbLt0mJsKsoBJkCosTEPw",
  });

  const branches = useSelector((state) => state.allBranches);

  useEffect(() => {
    dispatch(getAllBranches());
  }, []);

  const center = { lat: -17.3, lng: -60 };

  if (!isLoaded) return <Loading />;

  return (
    <GoogleMap zoom={5} center={center} mapContainerClassName="map-container">
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
