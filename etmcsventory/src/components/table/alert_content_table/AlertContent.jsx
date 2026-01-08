import React, {useState, useEffect} from 'react'

import TableReusabComp from '../TableReusabComp/TableReusabComp'
import { ProductItemList } from '../../../data/productItems'
import { AlertContentTableWrapper } from './alertContent.style'
import axios from 'axios'
import { TableReusableHeader, TableReusableWrapper } from '../TableReusabComp/tableReusabComp.style'
import { useNavigate } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa'

export default function AlertContent() {
   const token = localStorage.getItem('token');
 const [productData, setProductData] = useState([])
 const [isLoading, setIsLoading] = useState(false)

  // const getProducts = async () => {
  //   setIsLoading(true);
  //    try {
  //     // Fetch only products with stockQuantity <= quantityAlert
  //     const res = await axios.get(process.env.REACT_APP_URL + "/api/products/low-stock", {
  //                                                                           headers: {
  //                                                                             Authorization: `Bearer ${token}`
  //                                                                           }
  //                                                                     }) 
  //     console.log('low stocks: \n', res.dataslice(0, 5))
  //     setProductData(res.data);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false);
  //   }
  // };

  const getProducts = async () => { 
             setIsLoading(true)  
             try {
                 const res = await axios.get(process.env.REACT_APP_URL + "/api/products/low-stock", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                 console.log(res.data)
                 setProductData(res.data.slice(0, 5))
  
                 setIsLoading(false)
                 
                 console.log(res.data)
             } catch (err) {
                 console.log(err)
                 setIsLoading(false)
                 }
         }
               
       
        

  // Call getProducts once component mounts
  useEffect(() => {
   
    getProducts();
  }, []);

  const navigate = useNavigate();
              
  return (
     <TableReusableWrapper>

                    <TableReusableHeader>
                                  {'Low Stock Items'}
                                  <span onClick={()=>navigate('/low-stock')}>View All <FaLongArrowAltRight /></span>
              </TableReusableHeader>
         {isLoading ? (
          <div style={{height: "250px", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <p>Loading</p>
          </div>
        ) : (
    <AlertContentTableWrapper>
            {/* <TopSellingProduct  
                data={products}
                currencySymbol={company?.currencySymbol}
            /> */}
             <TableReusabComp 
              data={productData} 
              header={'Low Stock Items'}/>
      
    </AlertContentTableWrapper>
   )}
  </TableReusableWrapper>
  )
}


