import styled from "styled-components";

export const AddPermissionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const AddPermissionContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ItemsWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SelectItemContent = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 2px;
  border-top: 2px solid grey;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
