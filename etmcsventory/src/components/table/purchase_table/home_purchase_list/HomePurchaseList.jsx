
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { HomeSaleListWrapper } from './homeSale.style';
import TabeReusabComp from '../../TableReusabComp/TableReusabComp';
import { HomePurchaseListWrapper } from './homePurchaseList.style';
import { ProductItemList } from '../../../../data/productItems';
import axios from 'axios';
import HomePurchaseTable from './home_purchase_table/HomePurchaseTable';
import { TableReusableHeader, TableReusableWrapper } from '../../TableReusabComp/tableReusabComp.style';
import { FaLongArrowAltRight } from 'react-icons/fa';



const HomePurchaseList = () => {

   const token = localStorage.getItem('token');
  const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState([])
   const navigate = useNavigate();
  
     useEffect(() => {
                       const getPurchase = async () => { 
                       setIsLoading(true)  
                       try {
                        const res = await axios.get(process.env.REACT_APP_URL + "/api/sale/", {
                                                                                    headers: {
                                                                                      Authorization: `Bearer ${token}`
                                                                                    }
                                                                              }) 
                        // Sort by saleAmount descending
                        const sortedData = res.data.sort((a, b) => b.saleAmount - a.saleAmount);
                                
                                        setData(sortedData.slice(0, 5))
                                        setIsLoading(false)
                      
                                        console.log(res.data)
                                    } catch (err) {
                                        console.log(err)
                                        setIsLoading(false)
                                    }
                                }
                                getPurchase();
                            }, [])
  
  return (
     <TableReusableWrapper>
    
                        <TableReusableHeader>
                                      {"Highest Sale Items"}
                                      <span onClick={()=>navigate('/sales')}>View All <FaLongArrowAltRight /></span>
                  </TableReusableHeader>
             {isLoading ? (
              <div style={{height: "250px", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <p>Loading</p>
              </div>
            ) : (
         <HomePurchaseListWrapper>
            <HomePurchaseTable data={data} header={'Sale Items'} isLoading={isLoading}/>
        </HomePurchaseListWrapper>
       )}
      </TableReusableWrapper>

  );
};

export default HomePurchaseList;



