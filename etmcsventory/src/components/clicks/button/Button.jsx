import React from 'react';
import { ButtonWrapper } from './Button.style';
import { Link } from 'react-router-dom';

const Button = ({btnBdRd, btnFontSize, btnColor, btnText, btnTxtClr, btnBorder, btnMobileBorder, btnPd, btnLeftIcon, btnRightIcon, type, btnOnClick, btnDisplay }) => {

    return (
        <ButtonWrapper 
            btnDisplay={btnDisplay} 
            type={type} 
            onClick={btnOnClick} 
            btnColor={btnColor} 
            btnTxtClr={btnTxtClr} 
            btnBorder={btnBorder} 
            btnPd={btnPd}
            btnFontSize={btnFontSize}
            btnBdRd={btnBdRd}
            btnMobileBorder={btnMobileBorder}
        >
            {btnLeftIcon}
            {btnText}
            {btnRightIcon}
        </ButtonWrapper>
    )
}

export default Button;
