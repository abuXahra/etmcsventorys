import React, { useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import { FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa'
import { ArrowWrapper, ItemDetails, ItemIcon, ItemTitleStyle, ItemWrapper, ReportsPageContent, ReportsPageWrapper } from './reportsPage.style'
import { PiInvoiceBold } from 'react-icons/pi'
import { ReportItemList } from '../../data/ReportItems'
import { useNavigate } from 'react-router-dom'
import { Container } from '../home/Home.style'
import PurchaseSale from '../../components/chart/purchase_sale/PurchaseSale'
import SaleChart from '../../components/chart/sale-chart/SaleChart'


export default function ReportsPage() {
const navigate =  useNavigate();
  return (
    <ReportsPageWrapper>
    {/* Page title */}
        <PageTitle title={'Reports'}/>

        <ReportsPageContent>

        { ReportItemList.map((data, i)=>(
            <ItemWrapper bg={data.bg}>
            <ItemTitleStyle><h3>{data.title}</h3></ItemTitleStyle> 
                <ItemIcon>{data.icon}</ItemIcon>
                <ItemDetails onClick={()=> navigate(`${data.url}`)}>
                    <span>Details Here</span>
                    <ArrowWrapper>
                        <FaLongArrowAltRight/>
                    </ArrowWrapper>
                </ItemDetails>
            </ItemWrapper>
        ))
        }
        </ReportsPageContent>
    
     {/* Charts */}
      <Container>
          <PurchaseSale/>
          <SaleChart/>
      </Container>

    </ReportsPageWrapper>
  )
}


