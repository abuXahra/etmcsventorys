import styled from "styled-components";

// Styled Components
export const Container = styled.div`
  max-width: ${({ tbWidth }) => tbWidth || "100%"};
  /* margin: 0 auto; */
  /* padding: 20px; */
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  padding: ${({ tbWrPad }) => tbWrPad || "20px"};
  overflow-x: auto; /* Enable horizontal scrolling if necessary */
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 5px;
`;

export const ActionButton = styled.button`
  /* padding: 4px 8px; */
  border: none;
  color: ${({ clr }) => clr || "green"};
  cursor: pointer;
  background-color: transparent;
  font-size: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export const TopSellingWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const TopSellingContent = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  color: white;
  flex-direction: column;
  /* gap: 20px; */

  @media (max-768px) {
    width: 80%;
  }
`;
