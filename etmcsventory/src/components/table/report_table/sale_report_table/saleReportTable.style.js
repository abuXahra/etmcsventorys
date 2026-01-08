import styled from "styled-components";

// Styled Components
export const Container = styled.div`
  max-width: ${({ tbWidth }) => tbWidth || "100%"};
  /* margin: 0 auto; */
  /* padding: 20px; */
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling if necessary */
  padding: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
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
