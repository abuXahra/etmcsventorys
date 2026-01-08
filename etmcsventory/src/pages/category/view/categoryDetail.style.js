import styled from "styled-components";

export const CategoryDetailWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const CategoryDetailContent = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  border: 1px solid #cccccc;
  gap: 5px;
  background-color: white;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const CategoryDetailPicture = styled.div`
  width: 22%;
  display: flex;
  background-color: white;
  gap: 20px;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CategoryDetailData = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
