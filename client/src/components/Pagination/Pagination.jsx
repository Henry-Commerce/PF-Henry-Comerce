/** @format */

export const Pagination = ({
  productsPage,
  clothing,
  paginado,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(clothing / productsPage); i++) {
    pageNumbers.push(i);
  }

  const sumar = () => {
    if (currentPage === pageNumbers.length) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const restar = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const selectPage = (e) => {
    if (currentPage === pageNumbers[e - 1]) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div>
        <div>
          <nav className="pagination is-centered is-shadowless">
            <ul className="pagination-list ">
              <button className="pagination-link " onClick={(e) => restar(e)}>
                🡸
              </button>
              {pageNumbers.map((e) => (
                <button
                  className={
                    selectPage(e)
                      ? "button  is-dark mx-4 has-text-weight-bold"
                      : "button  mx-4 has-text-weight-bold "
                  }
                  onClick={() => paginado(e)}
                  key={e}
                >
                  {e}
                </button>
              ))}
              <button className="pagination-link " onClick={(e) => sumar(e)}>
                🡺
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
