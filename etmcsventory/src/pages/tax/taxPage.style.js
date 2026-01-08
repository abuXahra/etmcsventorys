import styled from "styled-components";

export const TaxPageWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const TaxPageContent = styled.div`
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
