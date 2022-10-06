/** @format */
import { useEffect, useState } from "react";
import "./ProductsDetails.scss";
import { MdRemove, MdAdd } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClothingDetail } from "../../redux/actions/actions";
import { Loading } from "../Loading/Loading";
import { getClothing, clearState } from "../../redux/actions/actions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/* const ls = JSON.parse(ls.getItem("cart") || "[]"); */

export const ProductsDetails = () => {
  const detail = useSelector((state) => state.detail);
  const allProducts = useSelector(state => state.allClothing)
  const dispatch = useDispatch();
  const { id,name } = useParams();

  const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

  useEffect(() => {
    dispatch(getClothingDetail(id));
    dispatch(getClothing(name));
    dispatch(clearState());
  }, [dispatch]);

  const [count, setCount] = useState(0);

  const [stockk, setStock] = useState(1);

  const [size, setSize] = useState();

  const [pricee, setPrice] = useState(detail.price);

   
  const [product,setProduct] = useState([])
  
  const recomended = Object.values(allProducts).filter((e) => e.category === detail.category);
  /* const [carting, setCarting] = useState({
    name: detail.name,
    size: size,
    stock: count,
    price: pricee,
  }); */
  const onClick = () => {
    json.push(santi)
  }
  /* const santi = {
    nombre: detail.name,
    talle: size,
    cantidad: count,
    precio :detail.price,
    imagen: detail.image
   }
  
  const json = []
 useEffect(() => {
 localStorage.setItem("cart",JSON.stringify(santi))
 }, [json]) */
 

 const [cart, setCart] = useState(false);

 let ls = JSON.parse(localStorage.getItem("lsFavorites")) || [];

 let lsCart = JSON.parse(localStorage.getItem("lsCartProducts")) || [];

 let handleAddToCart = (e) => {
  if(count > 0 && size){
    let prodToCart = {
      cartId:`${detail.name}-${size}` ,
      id: detail._id,
      name:detail.name,
      image: detail.image,
      price: detail.price,
      pricee,
      size,
      count,
      categoria: detail.category
    }
    e.preventDefault();
    console.log(lsCart);
    lsCart.push(prodToCart);
    localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart));
  }
 }

 console.log(detail);
  


  /* const json = [santi()] */

  /* localStorage.setItem("cart",json) */
/* const json = []
json.push(santi)

  const mujer = [(localStorage.getItem("cart",))]
  mujer.push(json)
  */

 /* json.push(localStorage.setItem("cart",santi)) */

  


  

  

  /* const stockAvaible = Object.values(detail.stock[0]).filter((e) => e > 0) */

  /* console.log(Object.values(detail[5])) */

 const arr = [{
  comments: [{
    user : "Santiago",
    comment : "Buenas, queria saber si tenian para la semana que viene talle XL? muchas gracias",
    respuesta: "Hola Santiago! la semana que viene tendriamos la recarga de stock, te esperamos!"
  },{
    user : "Martin",
    comment : "Buenas, queria saber si tenian para la semana que viene talle S? muchas gracias",
    respuesta: "Hola Santiago! la semana que viene tendriamos la recarga de stock, te esperamos!"
  },
  {
    user : "martin",
    comment : "asfasfasfaskfkasf",
    respuesta: ""
  }],
  reviews: [{
    user : "Santiago",
    rating : 4,
    review: "La tela excelente calidad, sobrepaso totalmente mis expectativas",
    nameReview: "Me encanto"
    
  },
  {
    user : "Juan Martin",
    rating : 4,
    review: "La tela excelente calidad, sobrepaso totalmente mis expectativas",
    nameReview: "Me encanto"
    
  }]
  
 }]


  let printStock = [detail.stock];

  /* let xd = Object.values(printStock[0]) */
  
 /* console.log(xd); */

  const selectSize = (e) => {
    if(printStock[0][e.target.value] === 0){
      setCount(0)
      setPrice(0, "No contamos con stock :(")
    } else {
      setStock(printStock[0][e.target.value])
      setCount(1);
      setPrice(detail.price);
     
      
    }
    setSize(e.target.value);
  };

  const sumStock = (e) => {
    if(count === 0){
      return 
    }
    if (count >= stockk) {
      return;
    } else {
      setCount(count + 1);
      setPrice(pricee + detail.price);
    }
  };

  const downStock = () => {
    if (count < 1){
      return
    }
    if (count === 1) {
      return;
    } else {
      setCount(count - 1);
      setPrice(pricee - detail.price);
    }
  };

  const selectedSize = (e) => {
    if (size === e) {
      return false;
    } else {
      return true;
    }
  };


  return (
    <div>
      <section className="pt-6"></section>
      <div className="container has-text-left pt-6">
        <div className="columns">
          <div className="column is-half border-rigth filee">
            <section className="pl-6"></section>
            <img className="" src={detail.image} alt="" />
          </div>

          <div class="column is-two-fifths pl-6">
            <h1 class="pt-1 pl-6 title has-text-weight-bold mb-5 has-text-left">
              {detail.name}
            </h1>
            <h1 class=" pl-6 has-text-weight-bold mb-6">{detail.category}</h1>
            <section className="pt-5"></section>

            <div className="pl-6 pr-6">
              {detail.stock
                ? Object.keys(detail.stock).map((e, index) => {
                    return (
                      <button
                        onClick={selectSize}
                        value={e}
                        key={index}
                        class={
                          selectedSize(e)
                            ? "button  mr-4 has-text-weight-bold "
                            : "button  is-dark mr-4 has-text-weight-bold "
                        }
                      >
                        {e}
                      </button>
                    );
                  })
                : null}
            </div>
            <div className="pt-1 pl-6  has-text-weight-bold  has-text-left  mb-6"></div>

            <h3 className="pt-1 pl-6 title has-text-weight-bold mb-4 has-text-left">
              Quantity products
            </h3>
            <div className="column is-2-desktop is-3-tablet pl-6 ">
              <div
                className="is-inline-flex is-align-items-center has-text-weight-bold pl-1 mb-4"
                style={{
                  border: "1px solid #DBDDE1",
                  borderRadius: "8px",
                }}
              >
                <button
                  onClick={downStock}
                  className="button has-text-black is-ghost "
                >
                  <MdRemove />
                </button>
                <button
                  className="button px-2 py-4 has-text-centered"
                  style={{
                    width: "48px",
                    border: "none",
                    boxShadow: "none",
                    cursor: "pointer",
                  }}
                  type="number"
                  placeholder="1"
                  value={count}
                >
                  {count}
                </button>
                <button
                  onClick={sumStock}
                  className="button has-text-black is-ghost"
                >
                  <MdAdd />
                </button>
              </div>
            </div>
            <div className="pl-6 pt-4">
                <p>{detail.description}</p>
              </div>
            <div className="pt-2 pl-6 pb-6 border-bottom"></div>
            <section className="pt-6"></section>
            <div className="pl-6 pr-6 card-header-title ">
              <p className="pr-6 title has-text-weight-bold mb-0 is-inline-block">
                ${pricee}
              </p>
              <p className="control">
                <Link className="button is-primary" to="">
                  <span className="icon">
                    <FaShoppingCart className="fas" />
                  </span>
                  <span onClick={(e) => handleAddToCart(e) } >Add to cart</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="pt-6"></section>
      <section className="pt-6"></section>
      
      <div className="columns is-centered">
        <div className="column is-11 background-a is-centered">
      <div className="columns is-centered">
        <div className="column is-11 border-bottom background-c">
          <div className="filee is-centered border-bottom">
            <h3 className="pt-1 pl-6 p title  mb-4 has-text-left">
              RECOMMENDED PRODUCTS
            </h3>
          </div>
          <div className="">
            <Carousel responsive={responsive}>
            {recomended.map((e) => (
              <div className="fileee pt-6 has-text-centered has-text-weight-bold is-flex-direction-column">
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
        </div>
        
      
      <section className="pt-6"></section>
      <section className="pt-6"></section>
      <section className="pt-6"></section>
      
         <div className="columns is-centered">
        <div className="column is-9">
          <div className="filee is-centered  is-justify-content-flex-start">
            
          </div>
          <div className="is-flex-direction-row pt-6 has-text-centered background-e">
            
              <div className="columns is-centered">
                <div className="column fileee">
                <h1 className="title is-size-1 mb-4">
                      {detail.rating}
                    </h1>
                    <h1 className="title is-size-6 pl-3" >out 5 stars</h1>
                </div>
                <div className="column has-text-left ">
                  
                  <div className="fileee has-text-left pl-6 ">
                    <section className="pl-6 ">
                  <h3 className="title is-size-3  border-bottom has-text-left"> REVIEWS</h3>
                  </section>
                  </div>
                </div>
              </div>
                {Object.values(arr[0].reviews) ? Object.values(arr[0].reviews).slice(0,2).map((e) => (
                  <div className=" pt-2 pb-2 border-bottom">
              <div className="columns pt-3 pb-4">
                <div className="column is-one-quarter ">
                  <h1 className="title is-size-5">{e.user}</h1>
                </div>
                <div className="column ">
                  <h1 className="pt-0 title is-size-4 ">
                    {e.nameReview}
                  </h1>
                  
                </div>
               </div>
               <div className="columns pt- pb-0">
               <div className="column is-one-quarter ">
                <h1 className="title is-size-5">{e.rating}</h1>
                </div>
                <div className="column">
                <p className="is-size-6 has-text-centered">
                    {e.review}
                  </p>
                </div>
               </div>
              
               </div>
               )) : <h1>No hay reviews disponibles</h1>}
 
              <div className="has-text-centered pt-6 pb-6">
              <button className="button is-warning ">Write review</button>
              </div>
            
          </div>
          <section className="pt-6"></section>
          <section className="pt-6"></section>
          <div className="background-e">
          <div className="fileee is-centered border-bottom pb-4">
            <h3 className="pt-6 filee pl-6 title is-size-3  mb-2 has-text-centered ">
              QUESTIONS
            </h3>
          </div>
              <div className="columns pt-3 is-centered has-text-left">
                <div className="column">
                {Object.values(arr[0].comments) && Object.values(arr[0].comments).slice(0,2).map((e) => (
                  <div>
              <div key={e.user}  className="columns my-0 pl-6 pt-2">
                <div  class="column">
                <h1 className="is-size-4 ">{e.user}</h1>
                  <p className="pt-2 is-size-5 ">
                  {e.comment}
                  </p>
                  {<h1 className="pt-5 pl-5 is-size-6 ">{e.respuesta}</h1>}
              </div>
                </div>
                <div className="columns is-centered">
               <div className="column is-11 border-bottom">

               </div>
               </div>
                </div>
                 ))}
                </div>
                
              </div>
              <div className="has-text-centered pt-6 pb-6">
                <div className="columns is-centered">
                  <div className="column is-6 filee">
              <input class="input" type="text" placeholder="Text input"></input>
              <button className="button is-warning">Write question</button>
                  </div>
                </div>
            </div>
            </div>
            
          </div>
          </div>
        </div>
        </div>
        </div>
        
  );
};

/* {Object.values(arr[0].comments) && Object.values(arr[0].comments).slice(0,2).map((e) => (
              <div className="columns my-0 ">
                <div key={e.respuesta} class="column my-0 has-text-centered is-align-items-center">
                <h1 className="pt-0  is-size-5 ">{e.respuesta}</h1>
                  
              </div>
                </div>
                 ))}*/
