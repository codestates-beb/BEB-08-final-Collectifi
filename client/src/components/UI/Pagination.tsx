import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
// import ReactPaginate from "react-paginate";
import styled from 'styled-components';

interface DataProps {
  dataPerPage: number;
  dataLength: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const Container = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PaginationContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  /* cursor: cu; */
  border-radius: 6px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

const PageNumbersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
interface PageNumberButtonProps {
  active: boolean;
}
const PageNumberButton = styled.button<PageNumberButtonProps>`
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  background-color: ${props => (props.active ? '#bb57ae' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
`;
function Pagination({dataPerPage, dataLength, paginate, currentPage, setCurrentPage}: DataProps) {
  const pageNumbers = [];
  const [currentPageRange, setCurrentPageRange] = useState(1);
  const pageSize = 10;
  const totalPagesCount = Math.ceil(dataLength / dataPerPage);

  for (let i = 0; i < totalPagesCount; i++) {
    pageNumbers.push(i + 1);
  }
  const indexOfLastPageRange = currentPageRange * pageSize; //      3 6 9 12
  const indexOfFirstPageRange = indexOfLastPageRange - pageSize; // 0 3 6 9
  const slicedPageNumbers = pageNumbers.slice(indexOfFirstPageRange, indexOfLastPageRange);

  function handleNextButtonClick() {
    if (currentPageRange < Math.ceil(pageNumbers.length / pageSize)) {
      setCurrentPageRange(currentPageRange + 1);
      setCurrentPage((currentPageRange + 1) * pageSize - (pageSize - 1));
    }
  }

  function handlePrevButtonClick() {
    if (currentPageRange > 1) {
      setCurrentPageRange(currentPageRange - 1);
      setCurrentPage((currentPageRange - 1) * pageSize);
    }
  }
  const startIndex = (currentPageRange - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageNumbers = pageNumbers.slice(startIndex, endIndex);
  // const {id} = useParams<{id: string}>();
  useEffect(() => {
    setCurrentPageRange(Math.ceil(currentPage / pageSize));
  }, [currentPage]);
  return (
    <Container>
      <PaginationContainer>
        <PaginationButton onClick={handlePrevButtonClick} disabled={currentPageRange === 1}>
          Prev
        </PaginationButton>
        {slicedPageNumbers.map(number => (
          <PageNumbersContainer key={number} className="page-item">
            <PageNumberButton
              onClick={() => {
                paginate(number);
              }}
              className="page-link"
              active={currentPage === number}
            >
              {number}
            </PageNumberButton>
          </PageNumbersContainer>
        ))}
        <PaginationButton
          onClick={handleNextButtonClick}
          disabled={
            currentPageRange === Math.ceil(pageNumbers.length / pageSize) || dataLength === 0
          }
        >
          Next{currentPageRange}
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
}

export default Pagination;
