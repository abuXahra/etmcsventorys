import styled from "styled-components";

export const CategoryPageWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const CategoryPageContent = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  color: white;
  flex-direction: column;
  gap: 20px;

  @media (max-768px) {
    width: 80%;
  }
`;
