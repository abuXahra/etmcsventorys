import React from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 20px 0;
`;

const PageButton = styled.button`
    width: 40px;
    height: 40px;
    background-color: #00032a;
    color: white;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #00032a;
    }
`;

const Pagination2 = ({ currentPage, onPageChange, totalPages }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
        }
    };

    return (
        <PaginationContainer>
            {/* Previous Button */}
            <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <GrFormPrevious />
            </PageButton>

            {/* Current Page */}
            <PageButton disabled>{currentPage}</PageButton>

            {/* Next Button */}
            <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <MdOutlineNavigateNext />
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination2;
