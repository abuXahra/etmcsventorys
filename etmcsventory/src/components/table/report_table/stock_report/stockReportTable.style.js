import styled from "styled-components";

// Styled Components
export const Container = styled.div`
  max-width: ${({ tbWidth }) => tbWidth || "100%"};
  /* margin: 0 auto; */
  /* padding: 20px; */
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  padding: 20px;
  overflow-x: auto; /* Enable horizontal scrolling if necessary */
`;
