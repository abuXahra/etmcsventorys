import { BiLoaderCircle } from "react-icons/bi";
import styled, {keyframes} from "styled-components";


export const ButtonLoaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`


const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Create a styled component with the animation
export const RotatingIcon = styled(BiLoaderCircle)`
  animation: ${rotate} 2s linear infinite;
  font-size: 20px; // Customize size as needed
  color: #fff;  // Customize color as needed
`;