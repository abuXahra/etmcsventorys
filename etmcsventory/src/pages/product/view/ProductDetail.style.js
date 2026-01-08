import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const ProductDetailContent = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #cccccc;
  gap: 5px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const ProductDetailPicture = styled.div`
  width: 22%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 5px;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProductDetailData = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
