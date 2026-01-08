
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { CloseIcon, OverlayCard, OverlayWrapper } from './productPixOverlay.style'

export default function ProductPixOverlay({children, contentHight, contentWidth, overlayButtonClick, closeOverlayOnClick, btnText1, btnText2, btnDisplayNo, alternatFunc, contentAlignment}) {
  return (
    <OverlayWrapper>
      <OverlayCard contentHight={contentHight} contentWidth={contentWidth} contentAlignment={contentAlignment}>
     {/* close icon */}
      <CloseIcon ><span onClick={closeOverlayOnClick}><FaTimes/></span></CloseIcon>
                    {/* Overlay content */}
          {children}
      </OverlayCard>
    </OverlayWrapper>
  )
}
