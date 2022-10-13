import React, { useState } from "react";
import Popup from "reactjs-popup";
import {FaStar} from "react-icons/fa"

3;

export const PostReview = () => {

const colors ={
    orange: "#FFBA5A",
    grey:"#a9a9a9"
}
const [star, setStar] = useState(null)
const stars = Array(5).fill(0)
const [currentValue, setCurrentValue] = useState(0)
const [hoverValue,setHoverValue] = useState(undefined)





const handleMouseOver = (value) => {
    setHoverValue(value)
    
}

const handleMouseLeave = (value) => {
    setHoverValue(undefined)
}

const [form,setForm] = useState({
    user:"",
    title:"",
    description:"",
    rating: 1
})



function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    }); 
}

function HandleSubmit(){
    
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
            <div className="columns is-centered">
                <div className="column has-text-centered is-4 pt-5">
                <h1>Titulo de la reseña</h1>
                <input value={form.title || ""} name="title" onChange={(e) => handleChange(e)}className="input" type="text" placeholder="Text input"/>

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
                                onChange={(e) => handleChange(e)}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="columns is-centered">
                <div className="column has-text-centered is-9 pt-5">
                    <h1>Descripcion sobre el producto</h1>
                <textarea value={form.description || ""} name="description" onChange={(e) => handleChange(e)} className="textarea" placeholder="Describe tu experiencia de nuestro producto"></textarea>
                </div>
            </div>
            
            <div className="columns is-centered">
            <div className="column has-text-centered is-12 pt-5">
                <button onClick={HandleSubmit()} className="button is-warning">Añadir reseña</button>
                </div>
            </div>
        </div>
       )}
    </Popup>
      )}