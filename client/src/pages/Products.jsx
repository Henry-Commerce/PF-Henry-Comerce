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
  
  console.log(allProducts);
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
      items: 4
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
        <div className="">
        <h1 className="title has-text-weight-bold is-size-1 has-text-centered pt-6">Henry E-Commerce</h1>
        </div>
        <div className="pt-6">
          <h1 className="title has-text-weight-bold is-size-4 pt-6">Productos recomendados</h1>
          <div className="">
            <Carousel responsive={responsivee}>
          {allProducts.map((e) => (
              <div className="fileee pt-6 has-text-centered has-text-weight-bold is-flex-direction-row">
              <a href={"http://127.0.0.1:5173/products/" + e.name}>
              <img
                className=" image "
                width="200"
                height="120"
                src={e.image}
                alt=""
              />
              <p>{e.name}</p>
              <p className="pt-3">{e.price}</p>
            </a>
            </div>
))}
</Carousel>

          </div>
        </div>
        <div>

        </div>
      <div className="has-text-centered pt-6">
      <Carousel responsive={responsive}>
            <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/BRK4URUWDBGY3DNCVOLJNQ5FIY.jpg"width="1300" alt="" />
            <img src="https://assets.soyhenry.com/henry-landing/assets/henryTeam/2.jpg"width="1300" alt="" />
            
</Carousel>
            </div>
            <h1 className="title has-text-weight-bold is-size-1 has-text-centered">Vestite con henry!</h1>
      </div>
    </div>
      

  </div>
  )
}
