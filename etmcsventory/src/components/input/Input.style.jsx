
import styled from "styled-components";


export const InputWrapper = styled.div`
    display: ${({inputDisplay}) => inputDisplay || 'flex'};
    flex-direction: column;
    width: ${({InputWidth})=> InputWidth || "100%"};
    gap: 5px;
    position: relative;
    align-items: flex-start;
    justify-content: flex-start;
`

export const InputLabel = styled.label`
    color: ${({labelColor}) => labelColor || "#171717"};
    font-size: 10px;
    display: flex;
    align-items: center; 
    display: flex;
    flex-direction: row;
    gap: 3px;
    font-weight: bold;

    span{
        /* padding-top: 5px; */
        font-size: 8px;
        color:red;
    }


@media (max-width: 768px) {
    font-size: 12px;

        span{
        /* padding-top: 5px; */
        font-size: 12px;
   
    }
  }
`

export const InputStyle = styled.input`
    border: 1.5px solid ${({bdColor})=> bdColor || '#0d398420'}; 
    border-radius: 10px;
    padding: ${({inputPadding})=>inputPadding || '12px'};
    background-color: ${({inputBg}) => inputBg || 'transparent'};
    color: ${({txtColor})=> txtColor || "grey"};
    font-size: 10px;
    width: 100%;

    &:focus {
    outline: none;

  }

@media (max-width: 768px) {
        font-size: 12px;
  }

`

export const InputError = styled.span`
    color: red;
    font-size: 10px;
`


export const InputIcon = styled.div`
    position: absolute;
    color: ${({iconColor})=> iconColor || "white"};
    top: 35%;
    right: 8px;

    &:hover{
        scale: 1.2;
    }
`