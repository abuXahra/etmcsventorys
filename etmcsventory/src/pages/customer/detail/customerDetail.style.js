import styled from "styled-components";

export const CustomerDetailWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const CustomerDetailContent = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #cccccc;
  gap: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const CustomerDetailPicture = styled.div`
  width: 22%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CustomerDetailData = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const OutStandingWrapper = styled.div`
  font-size: 15px;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px;
  /* background-color: #00032a; */
  background-color: #002300ff;
  color: white;
`;
