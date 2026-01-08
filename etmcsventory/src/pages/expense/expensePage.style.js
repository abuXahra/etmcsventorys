import styled from "styled-components";

export const ExpensePageWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const ExpensePageContent = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  color: white;
  flex-direction: column;

  @media (max-768px) {
    width: 80%;
  }
`;
