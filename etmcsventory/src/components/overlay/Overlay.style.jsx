



import styled, {keyframes} from 'styled-components'

// Slide-down animation
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const OverlayWrapper = styled.div`
display: flex;
justify-content: center;
align-items: start;  
position: fixed; 
height: 100vh; 
width:100%; 
top: 0px; 
left: 0px;
background-color: #00000076;
overflow: auto;
padding-bottom: 40px;
padding-top: 40px;
`


export const OverlayCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: ${({contentWidth})=> contentWidth || "35%"};
    height: ${({contentHight})=> contentHight || 'auto'};
    background-color: white;
    color: black;
    border-radius: 10px;
    justify-content: center;
    align-items: ${({contentAlignment}) => contentAlignment || "center"};
    position: relative;
    padding: 20px;
    font-size: 18px;
    text-align: center;
    /* animation: ${slideDown} 0.3s ease-out; 👈 Slide down effect */
    animation: ${slideDown} 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    img{
        border-radius: 10px;
        border: 1px solid red;
    }

    @media (max-width: 768px) {
        width: 80%;
 }
`

export const CloseIcon = styled.div`
    /* width: 100%; */
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 5px;
    right: 5px;

    span{
        cursor: pointer;
    }
`


export const OverlayButton = styled.div`
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
`