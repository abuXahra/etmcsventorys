
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ListHeader from '../../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { List } from 'react-content-loader'
import {TopSellingWrapper } from './topSellingProduct.style'
import { TableReusableHeader, TableReusableWrapper} from '../../TableReusabComp/tableReusabComp.style'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TopSellingProduct from './TopSellingProduct'


// home page components
export default function TopSelling({header}) {

   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   
   const [company, setCompany] = useState('') 
   const token = localStorage.getItem('token');

   // fetch handler 
          useEffect(() => {

                   const fetchCompany = async () =>{
                          try {
                              const res =await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
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
                 const res = await axios.get(process.env.REACT_APP_URL + "/api/products", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                 const sortedData = res.data.sort((a, b) => b.saleQuantity - a.saleQuantity);
                 setProducts(sortedData.slice(0, 5))
                 setIsLoading(false)
                 
                 console.log(res.data)
             } catch (err) {
                 console.log(err)
                 setIsLoading(false)
                 }
               }
               
             getProducts();
             
           }, [])
       
   

           
            
  
  const navigate = useNavigate();
  return (
     <TableReusableWrapper>

                    <TableReusableHeader>
                                  {header}
                                  <span onClick={()=>navigate('/top-selling')}>View All <FaLongArrowAltRight /></span>
              </TableReusableHeader>
         {isLoading ? (
          <div style={{height: "250px", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <p>Loading</p>
          </div>
        ) : (
    <TopSellingWrapper>
            <TopSellingProduct  
                data={products}
                currencySymbol={company?.currencySymbol}
            />
     
    </TopSellingWrapper>
   )}
  </TableReusableWrapper>
  )
}




