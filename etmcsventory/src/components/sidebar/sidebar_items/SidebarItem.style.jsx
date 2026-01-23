import { FaArrowRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

export const SidebarItemContainer = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({bg}) => bg || ''};
    display: flex;
    gap: 15px;
    align-items: flex-start;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    
    span:nth-child(1){
        font-size: 12px;
    }

    &:hover{
        background-color: #6161f9c9;
    }
`



export const ArrowDropdownStyled = styled.div`
    color: white;
    position: absolute;
    right: 5px;
    padding: 5px;
    background-color: #ffffff3b;
    border-radius: 100%;
    height: 30px;
    width: 30px;
    top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SidebarDropdown = styled.div`
    width: 150px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    padding: 10px;
    position: absolute;
    right: -170px;
    color: black;
    display: flex;
    flex-direction: column;
    margin-top: -20px;

    @media (max-width: 768px) {
        right: -170px;
    }
`

export const SidebarDropdownItem = styled.div`
    width: 100%;
    border-radius: 10px;
    background-color: ${({bg}) => bg || ''};
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 10px;
    color: black;
    padding: 5px;
    gap: 10px;



    &:hover{
        background-color: #6161f9c9;
        color: white
    }
      
`