/** @format */
import "./Products.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getClothing } from "../redux/actions/actions";


export const Products = () => {
  
   const dispatch = useDispatch()
  const allProducts = useSelector(state => state.allClothing)
  
  useEffect(() => {
    dispatch(getClothing(name));
  }, [dispatch]);
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const responsivee = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
  <div>
    <div className="columns is-centered">
      <div className="column is-11">
        <div className="column">
        <h1 className="title has-text-weight-bold is-size-1 has-text-centered  pt-6">Bienvenidos a Henry E-Commerce</h1>
        </div>
        <div className="">
          <div className="columns is-centered"> 
          <div className="column is-5 bt">
          </div>
          </div>
          <section className="section is-small ">
            <div className="column is-3">
          <h1 className="title has-text-weight-bold is-size-4 has-text-centered pt-5 ">Nuestas categorias <img src="https://assets.soyhenry.com/henry-landing/assets/emojis/rocket.png"  alt="" width="15" /></h1>
          </div>
          <div className="columns is-centered pt-6">
          <div className="column has-text-centered pt-6">
            <img className="max" src="http://res.cloudinary.com/dg50vvzpm/image/upload/v1664769993/a3e257f0-119f-4d47-8395-1098923c3fce.png" alt="" />
            <h1 className=" has-text-weight-bold has-text-centered pb-5 pt-4">Remeras</h1>
          </div>
          <div className="column has-text-centered pt-6">
            <img className="max" src="http://res.cloudinary.com/dg50vvzpm/image/upload/v1664768690/89765671-9064-4eab-b8f9-45f0409b4544.png" alt="" />
            <h1 className=" has-text-weight-bold has-text-centered pb-5 pt-4">Buzos</h1>
          </div>
          <div className="column has-text-centered pt-6">
            <img className="max" src="https://res.cloudinary.com/dg50vvzpm/image/upload/v1664772057/b63185c4-6a72-4366-be86-75e59a18723c.png" alt=""  />
            <h1 className=" has-text-weight-bold has-text-centered pb-5 pt-4">Pantalones</h1>
          </div>
          <div className="column has-text-centered pt-6">
            <img className="max" src="https://res.cloudinary.com/dg50vvzpm/image/upload/v1664772089/4d7c9834-202a-4ad9-af7b-5924013a0282.png" alt=""  />
            <h1 className=" has-text-weight-bold has-text-centered pb-5 pt-4">Otros accesorios</h1>
          </div>
          </div>
          <h1 className=" has-text-weight-bold is-size-4 has-text-centered pb-5">Conoce todos nuestros productos</h1>
          <a href="http://127.0.0.1:5173/">
            <p className="has-text-centered has-text-link is-size-5">Click aqui!</p>
          </a>
          </section>
          <div className="bt pt-6">
          </div>
        </div>
        <section className="section is-medium ">
        <div className="columns is-vcentered">
        <div className="column is-4  is-align-content-center">
        <h1 className=" has-text-weight-bold is-size-1 has-text-centered pb-5">Idea del proyecto</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem! Ad quasi nemo, minus, repellat quam odio at minima illum, ducimus eligendi sint deleniti! Ad sunt expedita fugit quasi laborum!</p>
        </div>
        <div className="column">
<img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/BRK4URUWDBGY3DNCVOLJNQ5FIY.jpg" alt="" />
        </div>
        </div>
        </section>
        
      <div className="has-text-centered  pt-6">
            <h1 className="title has-text-weight-bold is-size-3 has-text-centered">Vestite henry</h1>
            <img className="maxx" src="https://assets.soyhenry.com/henry-landing/assets/henryTeam/2.jpg"width="" alt="" />
            </div>
      </div>
    </div>
      

  </div>
  )
}
