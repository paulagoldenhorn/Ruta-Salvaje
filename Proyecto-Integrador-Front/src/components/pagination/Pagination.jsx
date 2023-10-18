import './pagination.css'

export const Pagination = ({ onPageChange, currentPage }) => {
    const totalPages = 4
    const handlePageChange = (page) => {
        onPageChange(page)}

    return (
        <div className='orderPagination'>
            <button className='btnPagPrev' onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
            <div className='btnNumPag'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={`page ${currentPage === index + 1 ? 'actual-page' : ''}`}
                        onClick={() => handlePageChange(index + 1)}>{index + 1}
                    </button>
                ))}
            </div>
            <button className='btnPagNext' onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
        </div>
    )
}
