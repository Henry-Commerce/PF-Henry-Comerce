/** @format */
import { useEffect, useState } from "react";
import "./ProductsDetails.scss";
import { MdRemove, MdAdd } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClothingDetail } from "../../redux/actions/actions";

export const ProductsDetails = () => {

  const dispatch = useDispatch()
  const detail = useSelector((state) => state.detail);
  const { name } = useParams();
  
  useEffect(() => {
    dispatch(getClothingDetail(name));
  }, []); 

  const arr = {
    name: "Remera henry basica",
    category: "Casual",
    colors: ["Red", "Black", "White", "Yellow"],
    rating: 4.91,
    price: 15,
    image: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dweb0954ea/5_detail_750/00463559-03.jpg?sw=1000&sh=1500",
    user: [{name: "santiago",comment:`afsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasg
    gafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafs{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}asggaf
    sasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasgga{e.comment}{e.comment}{e.comment}{e.comment}{e.comm{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}ent}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}fsasggafsasggafsasggafsasggafsasgg
    afsasggafsasggafsasggafsasggafsasggafsgg`},{name: "Martin",comment:`afsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasg
    gafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafs{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}asggaf
    sasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasggafsasgga{e.comment}{e.comment}{e.comment}{e.comment}{e.comm{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}ent}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}{e.comment}fsasggafsasggafsasggafsasggafsasgg
    afsasggafsasggafsasggafsasggafsasggafsgg`}],
    stocki:{
      XS: 1,
      S: 5,
      M: 7,
      L: 6,
      XL: 5,
      XXL: 4
    }
  };
 
  

  const [count, setCount] = useState(1);

  const [stock, setStock] = useState(1);

  const [size, setSize] = useState("");

  const [color, setColor] = useState("");

  const [price, setPrice] = useState(arr.price);
  
  /* const [rating, setRating] = useState(""); */

  useEffect(() => {}, []);

  let printStock = [arr.stocki]

  let printComments = [arr.comments]
  

  const selectSize = (e) => {
    setSize(e.target.value);
    setStock(printStock[0][e.target.value])
    setCount(1)
    setPrice(arr.price)
    console.log(console.log(printComments[0]));
  };

  const selectColor = (e) => {
    setColor(e.target.value);
  };

  const onClickMas = (e) => {
    if (count >= stock) {
      return;
    } else {
      setCount(count + 1);
      setPrice(price+arr.price) 
    }
  };

  const onClickMenos = () => {
    if (count === 1) {
      return;
    } else {
      setCount(count - 1);
      setPrice(price-arr.price) 
    }
  };

  const selectedSize = (e) => {
    if (size === e) {
      return false;
    } else {
      return true;
    }
  };

  const selectedColor = (e) => {
    if (color === e) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <section class="pt-6"></section>
      <div class="container has-text-left">
        <div class="columns ">
          <div class="column">
            <img
              class="image pb-2 "
              height="1rem"
              src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb8336388/1_front_750/00463559-03.jpg?sw=1000&sh=1500"
              alt=""
            />
            <img
              class="image  pb-2"
              src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw1f853781/2_side_750/00463559-03.jpg?sw=1000&sh=1500"
              alt=""
            />
            <img
              class="image pb-2"
              src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwd6adb6ca/7_additional_750/00463559-03.jpg?sw=1000&sh=1500"
              alt=""
            />
          </div>

          <div class="column is-half">
            <img src={arr.image} alt="" />
          </div>

          <div class="column is-two-fifths">
            <div className="filee">
              <p class="pt-6 pl-6 has-text-weight-bold mb-6">Rating:</p>
              <p class="pt-6 pl-6 has-text-weight-bold mb-6">{arr.rating}</p>
            </div>
            <h1 class="pt-1 pl-6 title has-text-weight-bold mb-5 has-text-left">
              {detail.name}
            </h1>
            <h1 class=" pl-6 has-text-weight-bold mb-6">{arr.category}</h1>
            <section class="pt-5"></section>

            <div class="pl-6 pr-6">
              
              {Object.keys(printStock[0]).map((e) => (
                <button
                  onClick={selectSize}
                  value={e}
                  key={e}
                  class={
                    selectedSize(e)
                      ? "button  mr-4 has-text-weight-bold "
                      : "button  is-dark mr-4 has-text-weight-bold "
                  }
                >
                  {e}
                </button>
              ))}
            </div>
            <div class="pt-6 pl-6  has-text-weight-bold  has-text-left  mb-6">
              {arr.colors.map((e) => (
                
                <button
                  onClick={selectColor}
                  value={e}
                  key={e}
                  class={
                    selectedColor(e)
                      ? "button  mr-1 has-text-weight-bold"
                      : "button  is-dark mr-1 has-text-weight-bold"
                  }
                >
                  {e}
                </button>
                
              ))}
            </div>

            <h3 class="pt-1 pl-6 title has-text-weight-bold mb-4 has-text-left">
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
                  onClick={onClickMenos}
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
                  onClick={onClickMas}
                  className="button has-text-black is-ghost"
                >
                  <MdAdd />
                </button>
              </div>
            </div>
            <div className="pt-6 pl-6 pb-6 border-bottom"></div>
            <section class="pt-6"></section>
            <div class="pl-6 pr-6 card-header-title ">
              <p class="pr-6 title has-text-weight-bold mb-0 is-inline-block">
                ${price}
              </p>
              <p className="control">
                <Link className="button is-primary" to="">
                  <span className="icon">
                    <FaShoppingCart className="fas" />
                  </span>
                  <span>Add to cart</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <section class="pt-6"></section>
      <section class="pt-6"></section>
      <div className="container">
        <div className="column is-full">
          <div className="filee is-centered border-bottom">
            <h3 class="pt-1 pl-6 p title  mb-4 has-text-left">
            RECOMMENDED PRODUCTS
            </h3>
          </div>
          <div className="filee is-justify-content-space-around pt-6 has-text-centered has-text-weight-bold ">
            <div className="">  
              <img
                class=" image "
                width="200"
                height="120"
                src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw0c221234/1_front_750/00464362-01.jpg?sw=276&sh=414"
                alt=""
              />
              <p>Name of product</p>
              <p className="pt-3">{arr.price}</p>
            </div>

            <div>
              <img
                class="image "
                width="200"
                height="120"
                src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb21f3df3/1_front_750/00463564-02.jpg?sw=276&sh=414"
                alt=""
              />
              <p>Name of product</p>
              <p className="pt-3">{arr.price}</p>
            </div>

            <div>
              <img
                class="image"
                width="200"
                height="120"
                src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw24c02e7a/1_front_750/00464839-13.jpg?sw=276&sh=414"
                alt=""
              />
             <p>Name of product</p>
              <p className="pt-3">{arr.price}</p>
            </div>

            <div>
              <img
                class="image"
                width="200"
                height="120"
                src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwaa67b43b/1_front_750/00468678-03.jpg?sw=276&sh=414"
                alt=""
              />
             <p>Name of product</p>
              <p className="pt-3">{arr.price}</p>
            </div>
          </div>
        </div>
      </div>
      <section class="pt-6"></section>
      <div className="container">
        <div className="column is-full">
          <div className="filee is-centered border-bottom is-justify-content-flex-start">
            <h3 class="pt-1 pl-6 title is-size-4  mb-2 has-text-left">
              REVIEWS
            </h3>
          </div>
          <div className="is-flex-direction-row pt-4 has-text-left">
            <div className="container">
              <div class="columns has-text-centered ">
                <div class="column is-half">
                  <div className="filee ">
                    <h1 class="pt-4 pl-6 title is-size-1  mb-0 has-text-left">
                      {arr.rating}
                    </h1>
                    <h1 className="pt-6 title is-size-6 pl-3">out 5 stars</h1>
                  </div>
                </div>
                <div class="column is-half">
                  <h1 class="pt-4 pl-6 title is-size-3  mb-0 has-text-center">
                    Count rating
                  </h1>
                </div>
              </div>
              <div className="columns pt-6 ">
                <div className="column is-one-quarter has-text-left">
                  <h1 className="pt-4 pl-6 title is-size-5">rating acc</h1>
                  <h1 className="pt-6 pt-4 pl-6 title is-size-5">name acc</h1>
                  
                </div>
                <div class="column is-three-quarters   ">
                <h1 className="pt-0 title is-size-4 has-text-centered ">name review of acc</h1>
                  <p className="is-size-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi neque dolores, laboriosam cupiditate incidunt
                    maiores doloremque illum facere odit fuga voluptatem in
                    praesentium, aperiam beatae! At dicta dolor ipsam magni.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla accusamus accusantium veritatis, impedit, nisi quod
                    voluptate eius provident consequuntur asperiores adipisci
                    perferendis minima, id illo dolorem? Provident voluptatem
                    distinctio nam.
                  </p>
                </div>
              </div>
              <div className="columns pt-6 ">
                <div className="column is-one-quarter has-text-left">
                  <h1 className="pt-4 pl-6 title is-size-5">rating acc</h1>
                  <h1 className="pt-6 pt-4 pl-6 title is-size-5">name acc</h1>
                  
                </div>
                <div class="column is-three-quarters   ">
                <h1 className="pt-0 title is-size-4 has-text-centered ">name review of acc</h1>
                  <p className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi neque dolores, laboriosam cupiditate incidunt
                    maiores doloremque illum facere odit fuga voluptatem in
                    praesentium, aperiam beatae! At dicta dolor ipsam magni.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla accusamus accusantium veritatis, impedit, nisi quod
                    voluptate eius provident consequuntur asperiores adipisci
                    perferendis minima, id illo dolorem? Provident voluptatem
                    distinctio nam.
                  </p>
                </div>
              </div>
              <div className="has-text-centered pt-3 pb-6">
                <button className="button is-warning">Write review</button>
              </div>
            </div>
          </div>
          <div className="filee is-centered border-bottom is-justify-content-flex-end">
            <h3 class="pt-1 pl-6 title is-size-4  mb-2 has-text-rigth ">
              QUESTIONS
            </h3>
          </div>
          <div className="is-flex-direction-column pt-4 has-text-left">
            <div className="container is-flex-direction-column">
              
              <div className="columns my-0 is-flex-direction-column">
                {arr.user.map((e) => (
                <div key={e.name} class="column my-0">
                <h1 className="pt-0 title is-size-4 has-text-left">{e.name}</h1>
                  <p>
                  {e.comment}
                  </p>
              </div>
                 ))}
                </div>
              </div>
              <div className="has-text-centered pt-3 pb-6">
                <button className="button is-warning">Write question</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

/* {arr.user.map((e) => (
  <div key={e.name}>
    <h1 className="title is-size-5 ">{e.name}</h1>
  <p className="is-size-6">
  {e.comment}
  </p>
  </div>
  ))}
 */

/* {Object.values(arr.comments).map((e) => (
                <div>
                <h1 className="title is-size-5 ">{e}</h1>
                  <p className="is-size-6">
                    {e.comment}
                  </p>
                  </div>
                  ))}
                </div> */