import { IconButton } from '../Button/Button'
import './selectBar.scss'

const SelectBar = ({currentPage, totalPages, handlePrevPage, handleNextPage}) => {
    return (
        <div className="pagination-buttons">
            <IconButton iconName={'left-arrow'} width='50' height='50' onClick={handlePrevPage} disabled={currentPage === 1} />
            <span className="small-text">
                {currentPage}/{totalPages}
            </span>
            <IconButton iconName={'right-arrow'} width='50' height='50' onClick={handleNextPage} disabled={currentPage > totalPages} />
        </div>
    )
}

export {
    SelectBar,
}