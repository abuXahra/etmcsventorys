import React from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious, GrPrevious } from 'react-icons/gr';
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 20px 0;
`;

const PageButton = styled.button`
    /* margin: 0 5px;
    padding: 10px 15px; */
    width: 40px;
    height: 40px;
    background-color: #00032a;
    display: flex;
    gap: 3px;
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

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        if (totalPages <= 5) {
            // If there are 5 or fewer pages, show all buttons
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <PageButton
                        key={i}
                        onClick={() => handlePageChange(i)}
                        disabled={currentPage === i}
                    >
                        {i}
                    </PageButton>
                );
            }
        } else {
            // Show first page button
            buttons.push(
                <PageButton
                    key={1}
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    1
                </PageButton>
            );

            if (currentPage > 3) {
                buttons.push(<span key="ellipsis-start">...</span>);
            }

            // Show current page and neighboring pages
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <PageButton
                        key={i}
                        onClick={() => handlePageChange(i)}
                        disabled={currentPage === i}
                    >
                        {i}
                    </PageButton>
                );
            }

            if (currentPage < totalPages - 2) {
                buttons.push(<span key="ellipsis-end">...</span>);
            }

            // Show last page button
            buttons.push(
                <PageButton
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {totalPages}
                </PageButton>
            );
        }

        return buttons;
    };

    return (
        <PaginationContainer>
            <PageButton 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                <span style={{display: "flex", rotate:"180deg"}}>     
                    <MdOutlineNavigateNext style={{marginRight: "-8px"}} />
                <MdOutlineNavigateNext /> </span>
            </PageButton>
                    {renderPaginationButtons()}
            <PageButton 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                           <MdOutlineNavigateNext style={{marginRight: "-10px"}} />
                           <MdOutlineNavigateNext />      
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;
