import { useEffect } from "react";
import { useState } from "react";
import { HiIdentification, HiMail, HiHome, HiPhone } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../redux/actions/actions";

export const UserDashboard = () => {
  const [isActive, setisActive] = useState(false);
  const [isActive1, setisActive1] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { email } = useParams();

  console.log(user);

  useEffect(() => {
    dispatch(getUser(email));
  }, [dispatch, email]);

  return (
    <article className="panel">
      <p className="panel-heading title is-3">Mi cuenta</p>
      <p className="panel-tabs ">
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
      <span className="panel-block">
        <HiIdentification className="title is-2 m-1" />
        <p className="is-size-4">Nombre de usuario: {user.username}</p>
      </span>
      <span className="panel-block">
        <HiHome className="title is-2 m-1" />
        <p className="is-size-4">Pais: {user.country}</p>
      </span>
      <span className="panel-block">
        <HiMail className="title is-2 m-1" />
        <p className="is-size-4">Mail: {user.email}</p>
      </span>
      <span className="panel-block">
        <HiPhone className="title is-2 m-1" />
        <p className="is-size-4">Telefono: 12345678</p>
      </span>
    </article>
  );
};
