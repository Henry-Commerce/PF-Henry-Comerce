import Popup from "reactjs-popup";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth, postReview } from "../../redux/actions/actions";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function validateInput(form) {
  let error = {};
  if (!form.title) {
    error.title = "Asignarle un titulo a su reseña";
  } else if (form.title.length > 20) {
    error.title = "El titulo es demasiado largo, intentelo denuevo";
  }
  if (!form.rating) {
    error.rating = "Tiene que seleccionar una dificultad";
  }
  if (!form.description) {
    error.description = "Se debe asignar una descripcion de prenda";
  } else if (form.description.length > 400) {
    error.description = "Ha soprepasado el limite de caracteres permitidos";
  } else if (form.description.length < 10) {
    error.description = "La descripcion es muy corta";
  }
  return error;
}

export const PostReview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const stars = Array(5).fill(0);
  const [star, setStar] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const authentication = localStorage.getItem("authenticated");
  const detail = useSelector((state) => state.detail);

  const navigate = useNavigate();
  let auth;
  const [data, setData] = useState("");

  const [form, setForm] = useState({
    email:"",
    product: "",
    isEditing: false,
    user: "",
    title: "",
    description: "",
    rating: 0,
  });


const username = data.username
const limitUsers = detail.comments && detail.comments.find((e) => e.user === username) 





  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      const { authenticated, isAdmin } = JSON.parse(
        localStorage.getItem("authenticated")
      );
      auth = JSON.parse(localStorage.getItem("authenticated"));
      dispatch(checkAuth(auth));
    }

    const profile = async () => {
      const { email, token } = auth;
      const user = await axios.get(
        `https://pfapi.vercel.app/api/user/info/${email}`,
        {
          headers: { "x-access-token": `${token}` },
        }
      );

      setData(user.data);
    };
    profile();
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      user: data.username,
      product: detail.name,
      email: data.email,
    });
  }, [data, detail]);

  ///////////////////////////////////////////////
  const [session, setSession] = useState(false);

  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem("authenticated")));
    
  }, [localStorage.getItem("authenticated")]);

  const status = useSelector((state) => state.status);
  useEffect(() => {}, [status]);

  const [error, setError] = useState({});

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  

  /* const handleSubmit = (e) => {
    if (
      form.title === "" ||
      error.title ||
      form.description === "" ||
      error.description ||
      form.rating === 0 ||
      error.rating
    ) {
      setError(validateInput({ ...form, [e.target.name]: e.target.value }));
      e.preventDefault();
    } else {
      dispatch(postReview(id, form));
      e.preventDefault();
      data.reviews.push(form);
    }
  }; */
  

  

  return (
    <Popup
      className="vue"
      trigger={
        <section>
           { limitUsers && limitUsers.user === data.username ? null : (               
          <button className="button is-warning">Dar reseña</button>
          )} 
        </section>
      }
      modal
      nested
    >
      {(close) => (
        <div className="box widtht">
          {session?.authenticated === true  ?  (
            <form
              onSubmit={(e) => {
                if (
                  form.title === "" ||
                  error.title ||
                  form.description === "" ||
                  error.description ||
                  form.rating === 0 ||
                  error.rating
                ) {
                  setError(
                    validateInput({ ...form, [e.target.name]: e.target.value })
                  );
                  e.preventDefault();
                } else {
                  dispatch(postReview(id, form));
                  e.preventDefault();
                  navigate(0);
                }
              }}
              autoComplete="off"
            >
              <div className="columns is-centered">
                <div className="column has-text-centered is-4 pt-5">
                  <h1>Titulo de la reseña</h1>
                  <input
                    name="title"
                    value={form.title}
                    onChange={(e) => handleChange(e)}
                    className="input"
                    type="text"
                    placeholder="Text input"
                  />
                  {error.title && <p className="red">{error.title}</p>}
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column has-text-centered is-12 pt-5">
                  <h1>Rating</h1>
                  {stars.map((_, index) => {
                    const ratingValue = index + 1;
                    const handleClick = (value) => {
                      setCurrentValue(value);
                      setStar(ratingValue);
                      form.rating = ratingValue;
                    };

                    return (
                      <FaStar
                        key={index}
                        value={form.rating}
                        size={24}
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        onClick={() => handleClick(index + 1)}
                      />
                    );
                  })}
                  {error.rating && <p className="red">{error.rating}</p>}
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column has-text-centered is-9 pt-5">
                  <h1>Descripcion sobre el producto</h1>
                  <textarea
                    value={form.description || ""}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    className="textarea"
                    placeholder="Describe tu experiencia de nuestro producto"
                  ></textarea>
                  {error.description && (
                    <p className="red">{error.description}</p>
                  )}
                </div>
              </div>

              <div className="columns is-centered">
                <div className="column has-text-centered is-12 pt-5">
                  <button type="submit" className="button is-warning">
                    Añadir reseña
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="columns.is-vcentered">
              <h1 className="has-text-vcentered pt-1 pl-6 is-size-3 has-text-weight-bold mb-5 has-text-left">
                Para poder dejar una review debes mantener una sesion activa :(
              </h1>
            </div>
          )}
        </div>
      )}
    </Popup>
  );
};
