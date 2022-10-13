import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../redux/actions/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Notify } from "../../components/Notify/Notify";
import { toast } from "react-toastify";
import "./User.scss";

export const UserConfig = () => {
  const [isActive, setisActive] = useState(false);
  const [isActive1, setisActive1] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { email } = useParams();

  console.log(user);

  useEffect(() => {
    dispatch(getUser(email));
  }, [dispatch, email]);

  const success = () =>
    toast.success("Los cambios se han realizado con exito", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const formik = useFormik({
    initialValues: {
      username: "",
      country: "",
      email: "",
      phone: "",
      oldPassword: "",
      newPassword: "",
      confirm: false,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(2, "El nombre es muy corto")
        .max(50, "El nombre es muy largo"),
      oldPassword: Yup.string()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .max(15, "La contraseña debe tener al menos 15 caracteres"),
      newPassword: Yup.string()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .max(15, "La contraseña debe tener al menos 15 caracteres"),
      confirm: Yup.boolean().oneOf([true], "acepta gato"),
    }),
    onSubmit: (formData) => {
      console.log("formdata", formData);
      /* dispatch(editUser(formData)); */
      handleReset();
      success();
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    errors,
    touched,
  } = formik;

  return (
    <article className="panel">
      <p className="panel-heading title is-3">Mi cuenta</p>
      <p className="panel-tabs">
        <Link
          to={`/user/${email}`}
          onClick={() => {
            setisActive(!isActive);
            setisActive1(false);
          }}
          className={`${isActive ? "is-active" : ""}`}
        >
          MIS DATOS
        </Link>
        <Link
          to={`/user/config/${email}`}
          onClick={() => {
            setisActive(false);
            setisActive1(!isActive1);
          }}
          className={`${isActive1 ? "is-active" : ""}`}
        >
          EDITAR DATOS
        </Link>
      </p>
      <span className="subtitle put is-3">
        Los campos que no sean completados no sufriran cambios
      </span>
      <form action="" onSubmit={handleSubmit}>
        <div className="field m-3">
          <label className="label">Nombre de usuario</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Nuevo nombre de usuario"
              name="username"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && (
              <div className="has-text-danger pt-2">{errors.username}</div>
            )}
          </div>
        </div>

        <div className="field m-3">
          <label className="label">Pais</label>
          <div className="select">
            <select
              name="country"
              value={values.country}
              onChange={handleChange}
            >
              <option hidden>Elegir un pais</option>
              <option>Argentina</option>
            </select>
          </div>
        </div>

        <div className="field m-3">
          <label className="label">Mail</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Nuevo mail"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>
        </div>

        <div className="field m-3">
          <label className="label">Telefono</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Nuevo telefono"
              name="phone"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
          </div>
        </div>

        <div className="field m-3">
          <label className="label">Contraseña actual</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Contraseña actual"
              name="oldPassword"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.oldPassword}
            />
            {errors.oldPassword && touched.oldPassword && (
              <div className="has-text-danger pt-2">{errors.oldPassword}</div>
            )}
          </div>
        </div>

        <div className="field m-3">
          <label className="label">Nueva contraseña</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Nueva contraseña"
              name="newPassword"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
            />
            {errors.newPassword && touched.newPassword && (
              <div className="has-text-danger pt-2">{errors.newPassword}</div>
            )}
          </div>
        </div>

        <div className="field m-3">
          <div className="control">
            <label className="checkbox">
              <input
                className="m-1"
                type="checkbox"
                name="confirm"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              ¿Estas seguro que quieres realizar los cambios?
            </label>
            {errors.confirm && touched.confirm && (
              <div className="has-text-danger pt-2">{errors.confirm}</div>
            )}
          </div>
        </div>

        <div className="field is-grouped m-3">
          <div className="control">
            <button className="button is-primary m-3" type="submit">
              Aceptar
            </button>
          </div>

          <div className="control">
            <Link to={`/user/${email}`}>
              <button className="button is-link is-light m-3">Cancelar</button>
            </Link>
          </div>
        </div>
      </form>
    </article>
  );
};
