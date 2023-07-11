import { CustomersList } from './CustomersList';
import { CustomersListHeader } from './CustomersListHeader';

const Customers = ({ customersList, currentPage, pages, perPage, setPage, setPerPage, setCurrentPage }) => {
  return (
    <div className="posts">
      <CustomersListHeader
        totalPages={pages}
        currentPage={currentPage}
        perPage={perPage}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage} />

      <CustomersList customersList={customersList} />
    </div>
  );
};

export {
  Customers,
}
