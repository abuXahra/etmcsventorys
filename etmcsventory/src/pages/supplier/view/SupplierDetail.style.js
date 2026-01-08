import styled from "styled-components";

export const SupplierDetailWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const SupplierDetailContent = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #cccccc;
  gap: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const SupplierDetailPicture = styled.div`
  width: 22%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 20px;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SupplierDetailData = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
