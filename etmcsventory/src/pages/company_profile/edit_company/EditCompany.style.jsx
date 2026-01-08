import styled from "styled-components";

export const EditCompanyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const EditCompanyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 2px solid green;
  border-radius: 2px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NameAndFileInput = styled.div`
  /* width: 10%; */
  display: flex;
  justify-content: space-between;
  gap: 20px;
  input {
    border-radius: 2px;
    cursor: pointer;
    border: none;
    background-color: rgba(128, 128, 128, 0.06);

    &:focus {
      outline: none;
    }
  }
  label {
    /* background-color: rgba(128, 128, 128, 0.06); */
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: start;
    /* padding: 0 20px; */
    gap: 5px;
    color: #cccccc;
    font-size: 50px;
    cursor: pointer;

    span {
      font-size: 10px;
      color: black;
      font-weight: bold;
    }
  }
`;

export const InputPicture = styled.input`
  display: none;
  background-color: #80808036;
`;

export const ImageWrapper = styled.div`
  width: 100px;
  height: 60px;
  background-color: #1c1c1c22;
  padding: 10px;
  display: flex;
  background-image: url(${({ bg }) => bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  border: 1px solid red;
`;
