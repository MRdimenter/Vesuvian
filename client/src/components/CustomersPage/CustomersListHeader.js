import { SelectBar } from "./SelectBar";

const CustomersListHeader = ({ totalPages, setCurrentPage, currentPage, setPerPage, perPage }) => {

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePerPageChange = (event) => {
        setPerPage(event.target.value)
    }

    return (
        <div className="post-list-header mb-3">
            <div className='page-selection'>
                <label htmlFor="perPageSelect" className="form-label">
                    Количество постов на странице:
                </label>
                <select id="perPageSelect" className="form-select" value={perPage} onChange={handlePerPageChange} >
                    <option value={2}>2</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <SelectBar currentPage={currentPage} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
        </div>
    )
}

export {
    CustomersListHeader,
}