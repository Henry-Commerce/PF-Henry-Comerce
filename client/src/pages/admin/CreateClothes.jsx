import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addClothing } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const validateInput = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (/[@=$%&|<>#]/.test(input.name)) {
    errors.name = "Name not accept simbols";
  } else if (input.name.length >= 20) {
    errors.name = "Name is too long (Max = 20 characters)";
  }
  if (!input.description) {
    errors.description = "Description is required";
  } else if (/[@=$%&|<>#]/.test(input.description)) {
    errors.description = "Description not accept simbols";
  } else if (input.description.length >= 100) {
    errors.description = "Description is too long. (Max = 100 characters)";
  }
  if (!input.price) {
    errors.price = "Price is required";
  } else if (input.price < 0 || input.price === "-0") {
    errors.price = "Price cannot be less than 0";
  }
  if (!input.image) {
    errors.image = "Image URL is required";
  } else if (!isValidUrl(input.image)) {
    errors.image = "Not validated as URL";
  }
  if (!input.category[0]) {
    errors.category = "Category is required";
  }

  return errors;
};

const CreateClothes = () => {
  const clothing = useSelector((state) => state.allClothing);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    category: "",
    price: 0,
    stock: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
    image: "",
    discount: 0,
    description: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    if (e.target.select) {
      setInput({
        ...input,
        [e.target.category]: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    if (
      input.name === "" ||
      errors.name ||
      input.category === "" ||
      errors.category ||
      input.price === 0 ||
      errors.price ||
      input.stock === {} ||
      errors.stock ||
      input.image === "" ||
      errors.image ||
      input.description === "" ||
      errors.description ||
      errors.rating
    ) {
      setErrors(validateInput({ ...input, [e.target.name]: e.target.value }));
      e.preventDefault();
    } else if (clothing.includes(input.name)) {
      alert("Producto existente, intente con otro nombre");
    } else {
      e.preventDefault();
      dispatch(addClothing(input));
      alert("Producto creado con exito");
      history.push("/");
      setInput({
        name: "",
        category: "",
        price: 0,
        stock: {
          XS: 0,
          S: 0,
          M: 0,
          L: 0,
          XL: 0,
          XXL: 0,
        },
        image: "",
        discount: 0,
        description: "",
        rating: 0,
      });
    }
  }

  return (
    <section className="altura">
      <div className="container pt 6 form">
        <div className="columns is-centered">
        <div className="column is-10 form">
          <form 
            className="box"
            id="altura"
            onSubmit={(e) => handleSubmit(e)}
            autoComplete="off"
          >
            <div className=" has-text-centered pt-3 pb-3">
              <h1 class="  has-text-weight-bold has-text-centered">Name</h1>
              <input 
                className="input "
                type="text"
                name="name"
                value={input.name}
                placeholder="Name of product"
                onChange={(e) => handleChange(e)}
              />
              <div className="">{errors.name && <p>{errors.name}</p>}</div>
            </div>
            <section className="mt-6"></section>
            <div className="columns is-centered">
              <div className="is-centered has-text-centered pt-3 pb-3">
                <h1 class="  has-text-weight-bold has-text-centered">Price</h1>

                <input
                  onChange={(e) => handleChange(e)}
                  name="price"
                  value={input.price}
                  className="input "
                  type="number"
                  placeholder="Price of product"
                />
              <div>{errors.price && <p>{errors.price}</p>}</div>
              </div>
              <section className="mt-6"></section>
            </div>
            <div className="columns is-centered pb-3 pt-3">
              <div className="column is-2 has-text-centered">
                <h1 class="  has-text-weight-bold has-text-centered">
                  Categories
                </h1>

                <div class="select">
                  <select name="category" onChange={(e) => handleChange(e)}>
                  <option value="" >Select option</option>
                    <option value="Camisas">Camisas</option>
                    <option value="Buzos">Buzos</option>
                    <option value="Gorras">Gorras</option>
                    <option value="Sudaderas">Sudaderas</option>
                  </select>
                </div>
              <div>{errors.category && <p>{errors.category}</p>}</div>
              </div>
              <section className="mt-6"></section>
            </div>
            <div className="is-centered has-text-centered pt-3 pb-3">
              <h1 class="  has-text-weight-bold has-text-centered">
                Image URL
              </h1>
              <input 
              onChange={(e) => handleChange(e)}
              name="image"
              value={input.image}
              class="input" 
              type="text"
               placeholder="Text input" />
             <div>{errors.image && <p>{errors.image}</p>}</div> 
             <section className="mt-6"></section>
            </div>
            <div className="is-centered has-text-centered pt-3 pb-3">
              <h1 class="  has-text-weight-bold has-text-centered">
                Description
              </h1>
              <textarea
                name="description"
                value={input.description}
                onChange={(e) => handleChange(e)}
                class="textarea"
                placeholder="Description of product"
              ></textarea>
              <div>{errors.description && <p>{errors.description}</p>}</div>
              <section className="mt-6"></section>
            </div>
            <div className="is-centered has-text-centered pt-3 pb-3">
            <button
              className="button is-warning"
              /* disabled={
              input.name === "" ||
              errors.name ||
              input.description === "" ||
              errors.description ||
              input.price === "" ||
              errors.price ||
              input.image === "" ||
              errors.image ||
              input.category[0] === "" ||
              errors.category
            } */
              type="submit"
            >
              Add Product
            </button>
            </div>
          </form>
            <section className="pt-6"></section>
            <section className="pt-6"></section>
            <section className="pt-6"></section>
            <section className="pt-6"></section>
            <section className="pt-6"></section>
            <section className="pt-6"></section>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CreateClothes;
