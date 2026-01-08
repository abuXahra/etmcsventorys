import { BiLoaderCircle } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled.div`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  height: 100vh;
  display: flex;

  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  color: #0d3984cf;
  z-index: 9999;
  /* margin-top: -120px; */
  gap: 10px;
  img {
    width: 50px;
  }

  @media (max-width: 768px) {
    img {
      width: 100px;
    }
  }
`;

export const LoaderIconWrapper = styled.div`
  display: flex;
  /* flex-direction: row; */
  gap: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 400px;
  width: 400px;
  /* bottom: 41.3%;
  right: 50;
  left: 50; */

  @media (max-width: 768px) {
    /* bottom: 45%;
    right: 30%; */
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotate2 = keyframes`
  100% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(360deg);
  }
`;

// Create a styled component with the animation
export const RotatingIcon = styled(BiLoaderCircle)`
  animation: ${rotate2} 4s linear infinite;
  font-size: 400px; // Customize size as needed
  color: #ff6805; // Customize color as needed
  position: absolute;
  display: none;

  @media (max-width: 768px) {
    font-size: 300px;
  }
`;

export const RotatingIcon2 = styled(BiLoaderCircle)`
  animation: ${rotate} 3s linear infinite;
  font-size: 400px; // Customize size as needed
  color: #0d3984cf; // Customize color as needed
  position: absolute;

  @media (max-width: 768px) {
    font-size: 400px;
  }
`;

export const HrStyled = styled.hr`
  width: 100%;
  /* height: 2px; */
  border: 1px solid ${({ bg }) => bg || "orange"};
`;

// Create a styled component with the animation
export const RotatingContainer = styled.div`
  animation: ${rotate} 10s linear infinite;
  width: 130px; // Customize size as needed
  height: 130px;
  border-radius: 100%;
  border: 5px dashed #00032a;
  position: absolute;

  @media (max-width: 768px) {
    font-size: 400px;
  }
`;
