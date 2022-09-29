/** @format */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getClothing } from "../redux/actions";

import { Loading, Product } from "../components";
import { Order } from "../components/Order/Order";
import { Filter } from "../components/Filter/Filter";

export const Inicio = () => {
  const dispatch = useDispatch();

  const clothing = useSelector((state) => state.allClothing);
  const notFound = useSelector((state) => state.notFound);
  const Added = useSelector((state) => state.added);

  useEffect(() => {
    dispatch(getClothing());
  }, [dispatch]);

  return (
    <>
      {clothing.length > 0 && !notFound && (
        <section className="section has-background-light is-clipped">
          <div className="container">
            <div>
              <h2 className="title mb-16 mb-24-tablet">
                Discover our products
              </h2>
              <Filter />
              <Order />
            </div>
            <div className="mb-20 columns is-multiline">
              {clothing.map((product) => {
                return (
                  <Product
                    key={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                  />
                );
              })}
            </div>
            <div className="has-text-centered">
              <a className="button is-primary" href="#">
                Show More
              </a>
            </div>
          </div>
        </section>
      )}
      {notFound && (
        <div className="">
          <h1>No recipes found</h1>
        </div>
      )}
      {!notFound && clothing.length === 0 && <Loading />}
    </>
  );
};
