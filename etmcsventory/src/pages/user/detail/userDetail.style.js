import styled from "styled-components";

export const UserDetailWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const UserDetailContent = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #cccccc;
  gap: 20px;
  background-color: white;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const UserDetailPicture = styled.div`
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

export const PictureWrapper = styled.div`
  width: 100%;
  height: ${({ heights }) => heights || "200px"};
  background-image: url(${({ imgUrl }) => imgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 10px;
`;

export const UserDetailData = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
