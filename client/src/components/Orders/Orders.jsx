export const Orders = ({ id, status, paymentid }) => {
  return (
    <div className="box">
      <div className={s.description}>
        <h2>{id}</h2>

        <h2>{status}</h2>

        <h2>{paymentid}</h2>
      </div>
    </div>
  );
};
