import React, { useState } from "react";
import Popup from "reactjs-popup";
import {FaStar} from "react-icons/fa"
import { postReview } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../../redux/actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function validateInput(form) {
    let error =  {}
    if(!form.title){
     error.title = "Asignarle un titulo a su reseña"
    }else if (form.title.length > 20){
     error.title = "El titulo es demasiado largo, intentelo denuevo"
    }
    if(!form.rating){
      error.rating = "Tiene que seleccionar una dificultad"
   }
   if(!form.description){
     error.description = "Se debe asignar una descripcion de prenda"
   }else if(form.description.length > 400){
     error.description = "Ha soprepasado el limite de caracteres permitidos"
   }else if(form.description.length < 10){
     error.description = "La descripcion es muy corta"
   }
   return error
   }

export const PostReview = () => {
const dispatch = useDispatch()
const {id} = useParams()
const colors ={
    orange: "#FFBA5A",
    grey:"#a9a9a9"
}
const [star, setStar] = useState(null)
const stars = Array(5).fill(0)
const [currentValue, setCurrentValue] = useState(0)
const [hoverValue,setHoverValue] = useState(undefined)

const authentication = localStorage.getItem("authenticated")

/* MARTIN */
const navigate = useNavigate();
  let session = null;
  const [data, setData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      const { authenticated, isAdmin } = JSON.parse(
        localStorage.getItem("authenticated")
      );
      if (authenticated) {
        if (isAdmin === false) {
          navigate("/user");
        }
      } else {
        navigate("/user");
      }
    } else {
      navigate("/user");
    }

    if (localStorage.getItem("authenticated")) {
      session = JSON.parse(localStorage.getItem("authenticated"));
      dispatch(checkAuth(session));
    }

    const profile = async () => {
      const { email, token } = session;
      const user = await axios.get(
        `http://localhost:3001/api/user/info/${email}`,
        {
          headers: { "x-access-token": `${token}` },
        }
      );

      setData(user.data);
      console.log("data", data);
    };
    profile();
  }, []);

  useEffect(() => {}, [data]);

/*  */


const userPerson = useSelector((e) => e.user);

console.log(data);

const [error, setError] = useState({});


const [form,setForm] = useState({
    isEditing: false,
    user: data.username,
    title:"",
    description:"",
    rating: 0
})


function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    }); 
}

const handleSubmit =(e) => {
    if(form.title === "" ||
    error.title ||
    form.description === "" ||
    error.description ||
    form.rating === 0 ||
    error.rating
    ){
      setError(validateInput({...form,[e.target.name]: e.target.value}))
         e.preventDefault();
    } else {
    dispatch(postReview(id, form));
    e.preventDefault();
    }
}



    return (
        <Popup
      className=""
      trigger={
        <section>
          <button
            className="button is-warning"
            
          >
            Dar reseña
          </button>
        </section>
      }
      modal
      nested
    >
       {(close) => (
        <div className="box widtht is-align-content-stretch">
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <div className="columns is-centered">
                <div className="column has-text-centered is-4 pt-5">
                <h1>Titulo de la reseña</h1>
                <input name="title" value={form.title}  onChange={(e) => handleChange(e)}className="input" type="text" placeholder="Text input"/>
                {error.title && <p className="red">{error.title}</p>}
                </div>
            </div>
            <div className="columns is-centered">
                <div className="column has-text-centered is-12 pt-5">
                    <h1>Rating</h1>
                    {stars.map((_, index) => {
                        const ratingValue = index + 1
                        const handleClick = value => {
                            setCurrentValue(value)
                            setStar(ratingValue)
                            form.rating = star
                        }
                        return (
                            <FaStar
                            key={index}
                            value={form.rating}
                            size={24}
                            style={{
                                marginRight: 10, 
                                cursor: "pointer"
                            }}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey} 
                            onClick={() => handleClick(index + 1)}
                               
                            />
                        )
                    })}
                    {error.rating && <p className="red">{error.rating}</p>}
                </div>
            </div>
            <div className="columns is-centered">
                <div className="column has-text-centered is-9 pt-5">
                    <h1>Descripcion sobre el producto</h1>
                <textarea value={form.description || ""} name="description" onChange={(e) => handleChange(e)} className="textarea" placeholder="Describe tu experiencia de nuestro producto"></textarea>
                {error.description && <p className="red">{error.description}</p>}
                </div>
            </div>
            
            <div className="columns is-centered">
            <div className="column has-text-centered is-12 pt-5">
                <button type="submit" className="button is-warning">Añadir reseña</button>
                </div>
            </div>
            </form>
        </div>
       )}
    </Popup>
      )}