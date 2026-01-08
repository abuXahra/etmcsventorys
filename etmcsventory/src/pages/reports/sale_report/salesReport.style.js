import styled from "styled-components";

export const SalesReportWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const SalesReportContent = styled.div`
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

export const SearchReportWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReportHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: -10px;
  color: black;
`;

export const ReportHeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => gap || "20px"};
  font-size: 10px;
  padding: 20px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 60%;
`;

export const Logo = styled.div`
  justify-content: start;
  display: flex;
  /* gap: 20px; */
  div {
    width: 150px;
    height: auto;
    padding: 20px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    img {
      width: 100%;
      border-radius: 5px;
    }
  }
`;

export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 5px;
  width: 35%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 45%;
  }
`;
