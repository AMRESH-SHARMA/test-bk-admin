import React from 'react';
const Pagination = (props) => {

  const { setCURRENT_PAGE, CURRENT_PAGE, TOTAL_DOCS } = props;

  let totalPages = TOTAL_DOCS % 5
  if (totalPages) {
    totalPages = parseInt(TOTAL_DOCS / 5) + 1
  } else { totalPages = parseInt(TOTAL_DOCS / 5) }

  const handleNext = () => {
    if (CURRENT_PAGE === totalPages) return
    setCURRENT_PAGE(CURRENT_PAGE + 1)
  }
  const handlePrev = () => {
    if (CURRENT_PAGE === 1) return
    setCURRENT_PAGE(CURRENT_PAGE - 1)
  }

  // const activePage = { color: 'red' }

  // const handleClick = (param) => {
  //   setCURRENT_PAGE(param)
  // }

  return (
    <div className='gpagination'>

      <span onClick={handlePrev}>◀</span>&nbsp;
      {/* 
      {Array.from(Array(totalPages).keys()).map((i, index) => (
        <span
          key={index}
          className='gpagination-entries'
          onClick={() => handleClick(i + 1)}
          style={CURRENT_PAGE === i + 1 ? activePage : null}>
          {i + 1}
        </span>))} */}

      <span onClick={handleNext}>▶</span>&nbsp;

      <span>Showing {CURRENT_PAGE} of {totalPages} </span>


    </div>
  )
}
export default Pagination;