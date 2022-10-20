import Popup from "reactjs-popup";
import {
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import "./Orders.scss";

export const Orders = ({ items, status, paymentid }) => {
  
  return (
    <Popup
      trigger={
        <div className="container">
          {status && status === "in_process" ? (
            <button
              className="orders button"
              style={{ backgroundColor: "lightblue" }}
            >
              <AiOutlineClockCircle />
              &ensp;
              {paymentid === 0 ? <p>Fallo el pago</p> : paymentid}
            </button>
          ) : status === "approved" ? (
            <button
              className="orders button"
              style={{ backgroundColor: "lightgreen" }}
            >
              <AiOutlineCheckCircle />
              &ensp;
              {paymentid === 0 ? <p>Fallo el pago</p> : paymentid}
            </button>
          ) : (
            <button
              className="orders button"
              style={{ backgroundColor: "tomato" }}
            >
              <AiOutlineCloseCircle />
              &ensp;
              {paymentid === 0 ? <p>Fallo el pago</p> : paymentid}
            </button>
          )}
        </div>
      }
      modal
      nested
    >
      {() => (
        <div className="box width">
          <div className="columns fileee is-centered bt">
            <div className="column is-3 fileeee">
              <h1 className="has-text-weight-bold mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Nombre
              </h1>
            </div>
            <div className="column is-2 fileeee">
              <h1 className="has-text-weight-bold  mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Cantidad
              </h1>
            </div>
            <div className="column is-2 fileeee">
              <h1 className="has-text-weight-bold mt-4 mb-4 ml-6 mr-6 has-text-centered">
                Talla
              </h1>
            </div>
          </div>

          {items?.map((items, index) => (
            <div className="columns fileee is-centered bt" key={index}>
              <div className="column is-2 fileeee">
                <h1>{items.name}</h1>
              </div>
              <div className="column is-2 fileeee">
                <h1 className="has-text-weight-bold  ml-6 mr-6 has-text-centered">
                  {items.count}
                </h1>
              </div>
              <div className="column is-2 fileeee">
                <h1 className="has-text-weight-bold  ml-6 mr-6 has-text-centered">
                  {items.size}
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </Popup>
  );
};
