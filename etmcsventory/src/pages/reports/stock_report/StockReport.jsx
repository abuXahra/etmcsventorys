




import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/page_title/PageTitle';
import ListHeader from '../../../components/page_title/list_header/ListHeader';
import { FaPrint } from 'react-icons/fa';
import CompanyLogo from '../../../images/product_placeholder.jpg'
import { AddressWrapper, DateWrapper, Logo, LogoWrapper, ReportHeaderContent, ReportHeaderWrapper, StockReportContent, StockReportWrapper } from './stockReports.style';
import StockReportTable from '../../../components/table/report_table/stock_report/StockReportTable';
// import ProductImage from '../../../images/necklace.jpeg'
import axios from 'axios';
import { List } from 'react-content-loader';


export default function StockReport() {
const token = localStorage.getItem('token');
    
  
  const [company, setCompany] = useState('')   
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
     // fetch handler 
            useEffect(() => {

               const fetchCompany = async () =>{
                          try {
                              const res =await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                                  headers: {
                                                                    Authorization: `Bearer ${token}`
                                                                  }
                                                            })
                              setCompany(res.data[0]);
                              console.log('company:\ln', res.data)
                          } catch (error) {
                              console.log(error)
                          }
                      }
                    fetchCompany()

               const getProducts = async () => { 
               setIsLoading(true)  
               try {
                   const res = await axios.get(process.env.REACT_APP_URL + "/api/products/report", {
                                                       headers: {
                                                         Authorization: `Bearer ${token}`
                                                       }
                                                 })
                   console.log(res.data)
                   setProducts(res.data)
                   setIsLoading(false)
                   console.log(res.data)
               } catch (err) {
                   console.log(err)
                   setIsLoading(false)
                   }
                 }
                 
               getProducts();
               
             }, [])
         

  return (
    <StockReportWrapper>
      <PageTitle title={'Stock Report'} />



      {/* content */}
      {isLoading? <List/> :
      <StockReportContent>
        <ListHeader
          title={'print'}
          btnOnClick={() => { }}
          type={'text'}
          icon={<FaPrint />}
          inputDisplay={'none'}
          entries={'of  Stock'}
        />

        <ReportHeaderWrapper>
           
          <ReportHeaderContent>
            {/* Logo */}
     <LogoWrapper>
                                <Logo>
                                    <div>
                                        <img src={company ? 
                                        process.env.REACT_APP_URL+'/images/'+ company.companyLogo:
                                        CompanyLogo} alt="" srcset="" />
                                    </div>
                                </Logo>

        
           {  company &&  <AddressWrapper>
                                <h3>{company?.companyName?.toUpperCase()}</h3>
                                <span><b>Address:</b> {company?.address}</span>
                                <span><b>Phone:</b> {company?.phoneNumber}</span>
                                <span><b>Email:</b> {company?.companyEmail}</span>
                            </AddressWrapper>
                        }
                            </LogoWrapper>
            {/* date */}
            <DateWrapper>
              <h3>Stock REPORT</h3>
              <span>{new Date().toDateString()}</span>
            </DateWrapper>
          </ReportHeaderContent>
        </ReportHeaderWrapper>

        {/* Stock Report Table Result */}
        <StockReportTable 
          data={products}
          currencySymbol={company?.currencySymbol} 
        />
      </StockReportContent>
      } 
    </StockReportWrapper>
  )
}






