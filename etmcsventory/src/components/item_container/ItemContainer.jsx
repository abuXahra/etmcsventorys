

import React from 'react'
import { ItemButtonWrapper, ItemContainerS, ItemContent, ItemTitleWrapper } from './itemContainer.style'
import Button from '../clicks/button/Button'


export default function ItemContainer({
    title,
    children,
}) {
  return (
    <ItemContainerS> 
        <ItemContent>
            <ItemTitleWrapper>{title}</ItemTitleWrapper>
            {children}
        </ItemContent>
    </ItemContainerS>
  )
}
