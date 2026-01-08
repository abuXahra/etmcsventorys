import React from 'react'
import { FaDesktop } from 'react-icons/fa'
import { PageTitleWrapper } from './pageTitle.style'

function PageTitle({title, subTitle}) {
  return (
    <PageTitleWrapper>
        <h3>{title}</h3>
        <span>
            <FaDesktop/>
           <p>/</p> 
            {title}
            {subTitle}
        </span>
    </PageTitleWrapper>
  )
}

export default PageTitle