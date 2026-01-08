
import React from "react";
import {
  ButtonLoaderWrapper,
  HrStyled,
  LoaderContent,
  LoaderIconWrapper,
  LoaderWrapper,
  LoadingContainer,
  LoadingPicture,
  Overlay,
  RotatingContainer,
  RotatingContainerB,
  RotatingIcon,

} from "./pagePreloader.style";

import icon from "../../../images/icons/icon.png";


export default function PagePreloader({ text }) {
  return (
    <LoaderWrapper>
   
        <img src={icon} alt="" srcset="" />
        <LoaderIconWrapper>
                <RotatingContainer/>
        </LoaderIconWrapper>
      
    </LoaderWrapper>
  );
}
