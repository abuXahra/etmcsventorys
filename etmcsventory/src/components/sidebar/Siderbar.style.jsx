import styled from "styled-components";

export const SidebarWrapper  = styled.div`
   
        height: 100vh;
        width: 200px; //240
        /* background-color: #00032a; */
        background-color: #002300ff;
        color: white;
        position: fixed;
        top: 0;
        left: ${({ isOpen }) => (isOpen ? "0" : "-200px")};
        transition: left 0.3s ease;
        z-index: 2000;


        @media (max-width: 768px) {
        width: 200px;
        }
`


export const SidebarHeader = styled.div`

     display: flex;
        // justify-content: space-between;
        gap: 10px;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const HamburgerWrapperi = styled.span`
    cursor: pointer;
    font-size: 1.5rem;
    display: none;  //changes

     @media (max-width: 768px) {
        display: flex;
    } 
`


export const HamburgerWrapper = styled.span`
    position: absolute;
    font-size: 25px;
    right: 20px;
    top: 20px;
    cursor: pointer;
    display: none;
    
    @media (max-width: 768px) {
        display: ${({mobileIcon})=> mobileIcon || "flex" };
    }
`


export const SidebarBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`


export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
`


export const SidebarItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 5px; */
`


export const SignOutWrapper = styled.div`
        display: flex;
        gap: 10px;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        background-color: ${({bg}) => bg || ''};
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: small;
        position: absolute;
        bottom: 5px;
        span img{
        height: 18px;
        width: 18px;
        
    }

    `