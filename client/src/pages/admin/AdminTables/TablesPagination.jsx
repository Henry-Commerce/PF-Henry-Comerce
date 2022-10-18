/** @format */

export const TablesPagination = ({
  productsPage,
  clothing,
  paginado,
  currentPage,
  setCurrentPage,
  dark,
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
    <div className={`${dark ? 'has-background-black' : ''} notification`}>
      <div className='level'>
        <div className='level-left '>
          <div className='level-item '>
            <div className='buttons has-addons '>
              {pageNumbers.map((e) => (
                <button
                  className={`${
                    dark ? 'has-background-black text-for-black dark' : ''
                  } ${selectPage(e) ? 'button is-active' : 'button'}`}
                  onClick={() => paginado(e)}
                  key={e}>
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
